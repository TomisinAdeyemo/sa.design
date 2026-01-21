const PROJECTS = [
  // Work page list seen on /work :contentReference[oaicite:1]{index=1}
  {
    slug: "1789",
    client: "1789",
    title: "1789 Identity",
    year: "—",
    cover: "assets/covers/1789.jpg",
  },
  { slug: "partna", client: "Payourse", title: "Partna(YCW22)", year: "—", cover: "assets/covers/partna.jpg" },
  { slug: "ultima", client: "Ultima Studios", title: "NAS'24", year: "—", cover: "assets/covers/ultima.jpg" },
  { slug: "fastr", client: "FTL", title: "FASTR", year: "—", cover: "assets/covers/fastr.jpg" },
  { slug: "gruve", client: "Gruve Ticketing", title: "Gruve Identity", year: "2022", cover: "assets/covers/gruve.jpg" }, // :contentReference[oaicite:2]{index=2}
  { slug: "uwana", client: "Uwana Energy", title: "Uwana Refresh", year: "—", cover: "assets/covers/uwana.jpg" },
  { slug: "wabi", client: "Wabi Latam", title: "Wabi", year: "—", cover: "assets/covers/wabi.jpg" },
  { slug: "mindcontrol", client: "Better Help", title: "Mind Control", year: "—", cover: "assets/covers/mindcontrol.jpg" },
  { slug: "startup-fest", client: "Get Equity", title: "Startup Fest", year: "—", cover: "assets/covers/startup-fest.jpg" },
  { slug: "kaza", client: "Kaza Pay", title: "Kaza Identity", year: "—", cover: "assets/covers/kaza.jpg" },
  { slug: "coinprofile", client: "Payourse", title: "Coinprofile 2.0", year: "—", cover: "assets/covers/coinprofile.jpg" },
  { slug: "violet", client: "Violet Id Tech", title: "Violet Visual Identity", year: "—", cover: "assets/covers/violet.jpg" },
  { slug: "mellicell", client: "Mellicell", title: "Mellicell Identity", year: "—", cover: "assets/covers/mellicell.jpg" },
  { slug: "cartel", client: "Personal", title: "Creative Cartel", year: "—", cover: "assets/covers/cartel.jpg" },
  { slug: "planet3r", client: "Planet 3R", title: "Planet 3R", year: "—", cover: "assets/covers/planet3r.jpg" },
];

function $(sel, parent = document){ return parent.querySelector(sel); }
function $all(sel, parent = document){ return [...parent.querySelectorAll(sel)]; }

function setActiveNav(pathname){
  $all("[data-nav]").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === pathname);
  });
}

function setupMobileMenu(){
  const drawer = $("#mobileDrawer");
  if (!drawer) return;
  const openBtn = $("#burgerBtn");
  const closeBtn = $("#closeDrawer");

  const open = () => { drawer.style.display = "block"; document.body.style.overflow = "hidden"; };
  const close = () => { drawer.style.display = "none"; document.body.style.overflow = ""; };

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) close();
  });

  $all(".mobile-links a").forEach(a => a.addEventListener("click", close));
}

function renderWorkGrid(){
  const grid = $("#workGrid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(p => `
    <a class="card" href="project.html?slug=${encodeURIComponent(p.slug)}" aria-label="${p.client} ${p.title}">
      <img class="thumb" src="${p.cover}" alt="${p.client} ${p.title}" loading="lazy"
           onerror="this.style.display='none'; this.parentElement.querySelector('.fallback').style.display='block';" />
      <div class="fallback" style="display:none; aspect-ratio:4/3; background:rgba(255,255,255,.06)"></div>
      <div class="card-body">
        <p class="card-title">${p.client} <span style="opacity:.8; font-weight:800">${p.title}</span></p>
        <div class="card-meta">
          <span class="pill">${p.title}</span>
          <span class="pill">${p.year}</span>
        </div>
      </div>
    </a>
  `).join("");
}

function renderProject(){
  const root = $("#projectRoot");
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  const project = PROJECTS.find(p => p.slug === slug) || PROJECTS.find(p => p.slug === "gruve");

  // Default “Gruve Identity” copy is pulled from the site’s Gruve page structure. :contentReference[oaicite:3]{index=3}
  const isGruve = project.slug === "gruve";

  const heroImg =
    isGruve
      ? "https://framerusercontent.com/images/yfal2A41yg6vrYmAPJ00jeUbU.jpg" // sample image on that page :contentReference[oaicite:4]{index=4}
      : project.cover;

  root.innerHTML = `
    <div class="kicker"><a href="work.html" style="color:var(--muted); font-weight:900;">← Back to Work</a></div>

    <div class="hero-media">
      <img src="${heroImg}" alt="${project.client} ${project.title}" loading="lazy">
    </div>

    <div class="proj-head">
      <div>
        <div class="kicker">${project.client}</div>
        <h1 class="proj-title">${project.title}</h1>
        <div class="proj-sub">${project.year}</div>
      </div>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <span class="pill">Role: ${isGruve ? "Brand Designer" : "Brand Designer & Creative Director"}</span>
        <span class="pill">Deliverables: ${isGruve ? "Visual Identity Rebrand" : "Brand Identity Design"}</span>
      </div>
    </div>

    <div class="rich">
      <p style="color:var(--muted); font-weight:800; margin-top:8px;">
        ${isGruve ? "Taking a web3 based event ticketing platform out of it's shell." : "Project overview and case study."}
      </p>

      ${isGruve ? `
        <p>
          Working on Gruve's brand redesign was a journey of transformation — building a bolder identity that stands out,
          resonates with a fun-loving audience, and communicates transparency, excitement, and adventure. :contentReference[oaicite:5]{index=5}
        </p>

        <h3>Project Team</h3>
        <ul>
          <li>Creative Direction — Ameji</li>
          <li>Illustration — Sash</li>
        </ul>

        <h3>Bold Choices: Colors, Typefaces, and Patterns</h3>
        <p style="color:var(--muted); font-weight:700;">
          The approach focused on pushing boundaries with bold colors, strong type pairing, and patterns/textures to keep the
          system energetic without losing usability. :contentReference[oaicite:6]{index=6}
        </p>
      ` : `
        <p style="color:var(--muted); font-weight:700;">
          Replace this text with the exact case study copy for “${project.title}”.
        </p>
      `}
    </div>

    <div class="gallery">
      <img src="https://framerusercontent.com/images/JF3kvvAHM7bfvMq18aTDJ7lbVXA.jpg" alt="Project image" loading="lazy"> 
      <img src="https://framerusercontent.com/images/yfal2A41yg6vrYmAPJ00jeUbU.jpg" alt="Project image" loading="lazy">
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav(location.pathname.split("/").pop() || "work.html");
  setupMobileMenu();
  renderWorkGrid();
  renderProject();
});
