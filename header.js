const headerPlaceholder = document.getElementById('header-placeholder');

if (headerPlaceholder) {
  headerPlaceholder.innerHTML = `
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

      <a href="index.html" class="logo d-flex align-items-center">
        <img src="assets/img/logo.png" class="img-fluid" alt="">
      </a>

      <nav id="navmenu" class="navmenu">
        <ul>
          <li><a href="index.html" class="home">Home</a></li>
          <li><a href="#team" class="team">Team</a></li>
          <li><a href="calendar.html" class="menubtn calendar">TB Calendar</a></li>
          <li><a href="helper/index.html" class="menubtn helper">TB Helper</a></li>
          <li><a href="tbgifts.html" class="menubtn gifts">TB Gifts</a></li>
          <li class="dropdown"><a href="#"><span>Rules</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
              <li><a href="roek139.html" class="rules-roe">ROE K139</a></li>
              <li><a href="therules.html" class="rules-clan">Clan Rules</a></li>
              <li><a href="cprun.html" class="rules-cp">CP Run / Rules</a></li>
            </ul>
          </li>
          <li><a href="#about" class="about">About Us</a></li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>

    </div>
  </header>
  `;

  // Add active class to the current navigation link
  const currentPath = window.location.pathname; // Full path like /index.html or /helper/index.html
  const navLinks = document.querySelectorAll('#navmenu a');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href'); // Get href as-is (like index.html or helper/index.html)

    // Check if the current path ends with the link's href (full matching for folder index issue)
    if (currentPath.endsWith(linkPath)) {
      link.classList.add('active'); // Add active class
    } else {
      link.classList.remove('active'); // Remove active class
    }
  });
} else {
  console.error("Header placeholder not found. Make sure you have a div with id='header-placeholder'.");
}
