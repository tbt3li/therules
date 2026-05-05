const API_BASE = "https://contact.t3li.workers.dev/contacts";
const SECRET_KEY = "X9mK2vQpL7nR4wZ8jF"; // Your provided key

// Check session on load
if (sessionStorage.getItem("authenticated")) {
    showDashboard();
}

function attemptLogin() {
    const input = document.getElementById("admin-pass").value;
    // Hardcoded simple login for the UI layer
    if (input === "admin123") { 
        sessionStorage.setItem("authenticated", "true");
        showDashboard();
    } else {
        alert("Access Denied");
    }
}

function logout() {
    sessionStorage.clear();
    location.reload();
}

function showDashboard() {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("admin-section").classList.remove("hidden");
    loadMessages();
}

async function loadMessages() {
    const container = document.getElementById("messages-list");
    const loader = document.getElementById("loader");

    try {
        // Fetching data using your specific secret key
        const response = await fetch(`${API_BASE}?secret=${SECRET_KEY}`);
        const data = await response.json();

        loader.classList.add("hidden");
        container.innerHTML = "";

        if (data.length === 0) {
            container.innerHTML = '<div class="text-center p-5"><h5>No messages yet!</h5></div>';
            return;
        }

        data.forEach(msg => {
            const card = `
                <div class="col-12 mb-3" id="msg-row-${msg.id || msg.timestamp}">
                    <div class="card msg-card shadow-sm">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <h5 class="card-title mb-1">${msg.name || 'New Inquiry'}</h5>
                                    <span class="badge badge-date mb-3">${new Date(msg.timestamp).toLocaleString()}</span>
                                </div>
                                <button onclick="deleteMsg('${msg.id || msg.timestamp}')" class="btn btn-sm btn-outline-danger">Delete</button>
                            </div>
                            <p class="mb-1"><strong>Email:</strong> ${msg.email}</p>
                            <p class="card-text text-secondary mt-2">${msg.message}</p>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    } catch (err) {
        loader.innerHTML = `<div class="alert alert-danger">Error: ${err.message}. Check CORS settings on Worker.</div>`;
    }
}

async function deleteMsg(id) {
    if (!confirm("Remove this message permanently?")) return;

    try {
        // Note: Your worker must be set up to handle DELETE requests at this endpoint
        const response = await fetch(`${API_BASE}/${id}?secret=${SECRET_KEY}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.getElementById(`msg-row-${id}`).fadeOut(300, function() { $(this).remove(); });
            // Simple removal if not using jQuery:
            document.getElementById(`msg-row-${id}`).style.display = 'none';
        } else {
            alert("Delete failed. Ensure your Worker supports DELETE methods.");
        }
    } catch (err) {
        console.error("Delete Error:", err);
    }
}
