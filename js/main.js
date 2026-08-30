(function () {
  var progressBar = document.getElementById("progressBar");
  var navLinks = document.getElementById("navLinks");
  var menuBtn = document.querySelector(".menu-btn");
  var sectionLinks = document.querySelectorAll(".navlinks a[data-section]");
  var teamGrid = document.getElementById("teamGrid");

  var team = [
    { name: "William Wang", role: "Founder" },
    { name: "Tarun Batchu", role: "Co-Founder" },
    { name: "Pranav Raja", role: "Co-President" },
    { name: "Aditya Dyta", role: "Officer" }
  ];

  function renderTeam() {
    if (!teamGrid) return;
    teamGrid.innerHTML = "";
    team.forEach(function (member) {
      var card = document.createElement("article");
      card.className = "member reveal";
      var role = document.createElement("p");
      role.className = "role";
      role.textContent = member.role;
      var name = document.createElement("h3");
      name.textContent = member.name;
      card.appendChild(role);
      card.appendChild(name);
      teamGrid.appendChild(card);
    });
  }

  function updateProgress() {
    if (!progressBar) return;
    var doc = document.documentElement;
    var top = doc.scrollTop || document.body.scrollTop;
    var height = doc.scrollHeight - doc.clientHeight;
    progressBar.style.width = (height > 0 ? (top / height) * 100 : 0) + "%";
  }

  function updateScrollspy() {
    var current = "";
    var sections = document.querySelectorAll("section[id]");
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 120) current = section.id;
    });
    sectionLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("data-section") === current);
    });
  }

  function onScroll() {
    updateProgress();
    updateScrollspy();
  }

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  renderTeam();
  initReveal();
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
