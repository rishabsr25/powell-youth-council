// ---- Team roster data ----
  const team = [
    { name: "William Wang", role: "President & Founder", lead:true },
    { name: "Tarun Batchu", role: "Vice President", lead:true },
    { name: "Arya Badri", role: "Officer" },
    { name: "Nandini Uppala", role: "Officer" },
    { name: "Pranav Rajakarthikeyan", role: "Officer" },
    { name: "Andrew Mulyadi", role: "Officer" },
    { name: "Ishaan Chandakkar", role: "Officer" },
    { name: "Mihika Narayan", role: "Member" },
    { name: "Nate Kirkpatrick", role: "Member" },
    { name: "Razi Mirza", role: "Member" },
    { name: "Lucas Colegrove", role: "Member" },
    { name: "Varun Nandakumar", role: "Member" },
    { name: "Bennett Williams", role: "Member" },
    { name: "Shivam Vora", role: "Member" },
    { name: "Aditya Dyta", role: "Member" },
    { name: "Emily Lee", role: "Member" },
    { name: "Rishab Sriram", role: "Member" },
    { name: "Srivarsha Banumukkala", role: "Member" },
    { name: "Nivi Kadiam", role: "Member" },
    { name: "Aneesh Jonnala", role: "Member" },
  ];

  const palette = ["#1D5C8A", "#5B7A99", "#4FA8D8", "#0E2E4D"];

  function initials(name){
    return name.split(" ").map(p => p[0]).slice(0,2).join("").toUpperCase();
  }

  const grid = document.getElementById("teamGrid");
  team.forEach((m, i) => {
    const el = document.createElement("div");
    el.className = "member reveal" + (m.lead ? " lead" : "");
    const color = palette[i % palette.length];
    el.innerHTML = `
      <div class="avatar" style="background:${color};">${initials(m.name)}</div>
      <h4>${m.name}</h4>
      <div class="role">${m.role}</div>
    `;
    grid.appendChild(el);
  });

  // ---- Scroll reveal ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // ---- Scrollspy: highlight nav link for section in view ----
  const navLinkEls = document.querySelectorAll("#navLinks a[data-section]");
  const sections = Array.from(navLinkEls)
    .map(a => document.getElementById(a.dataset.section))
    .filter(Boolean);

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`#navLinks a[data-section="${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting){
        navLinkEls.forEach(a => a.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

  sections.forEach(sec => spy.observe(sec));

  // ---- Scroll progress bar ----
  const progressBar = document.getElementById("progressBar");
  function updateProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
