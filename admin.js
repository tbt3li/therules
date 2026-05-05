const WORKER_URL = 'https://contact.t3li.workers.dev';

// Simple check on page load
window.onload = () => {
    if (localStorage.getItem('isAdmin') === 'true') {
        showAdmin();
    }
};

function login() {
    const pass = document.getElementById('admin-password').value;
    // Replace 'your_secure_password' with your actual desired password
    if (pass === 'admin123') { 
        localStorage.setItem('isAdmin', 'true');
        showAdmin();
    } else {
        alert('Invalid Credentials');
    }
}

function logout() {
    localStorage.removeItem('isAdmin');
    location.reload();
}

function showAdmin() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('admin-section').classList.remove('hidden');
    fetchMessages();
}

async function fetchMessages() {
    try {
        const response = await fetch(WORKER_URL, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        const data = await response.json();
        renderMessages(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('messages-container').innerHTML = 
            `<div class="alert alert-danger">Failed to load messages. Ensure CORS is allowed for this domain.</div>`;
    }
}

function renderMessages(messages) {
    const container = document.getElementById('messages-container');
    if (!messages || messages.length === 0) {
        container.innerHTML = '<p class="text-center">No messages found.</p>';
        return;
    }

    container.innerHTML = messages.map(msg => `
        <div class="card card-message shadow-sm" id="msg-${msg.id}">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="card-title">${msg.name || 'Anonymous'}</h5>
                    <small class="text-muted">${msg.date || ''}</small>
                </div>
                <h6 class="card-subtitle mb-2 text-muted">${msg.email}</h6>
                <p class="card-text">${msg.message}</p>
                <button onclick="deleteMessage('${msg.id}')" class="btn btn-sm btn-danger">Delete</button>
            </div>
        </div>
    `).join('');
}

async function deleteMessage(id) {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
        const response = await fetch(`${WORKER_URL}?id=${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.getElementById(`msg-${id}`).remove();
        } else {
            alert('Failed to delete message.');
        }
    } catch (error) {
        alert('Error connecting to worker.');
    }
}
