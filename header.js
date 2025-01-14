document.write(`
<header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

      <a href="index.html" class="logo d-flex align-items-center">
		    <img src="assets/img/logo.png" class="img-fluid" alt="">
      </a>

      <nav id="navmenu" class="navmenu">
        <ul>
          <li><a href="#hero" class="active">Home</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="calendar.html" class="menubtn">TB Calendar</a></li>
          <li><a href="/helper/index.html" class="menubtn">TB Helper</a></li>
          <li><a href="tbgifts.html" class="menubtn">TB Gifts</a></li>
          <li class="dropdown"><a href="#"><span>Rules</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
              <li><a href="roek139.html">ROE K139</a></li>
	      <li><a href="therules.html">Clan Rules</a></li>
	      <li><a href="cprules.html">CP Run / Rules</a></li>
            </ul>
          </li>
	  <li><a href="#about">About Us</a></li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>

    </div>
  </header>
`);
