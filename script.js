document.addEventListener("DOMContentLoaded", () => {
  // Dynamic Greeting
  const greeting = document.getElementById("greeting");
  const hour = new Date().getHours();
  greeting.textContent = hour < 12 ? "Good Morning!" :
                         hour < 18 ? "Good Afternoon!" :
                         "Good Evening!";

  // Theme Toggle
  const toggle = document.getElementById("theme-toggle");
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");

  toggle.onclick = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  loadProjects();
  loadBlogPosts();
  setupFormValidation();
  animateSkills();
});

// Skills Progress Bar
function animateSkills() {
  window.addEventListener("scroll", () => {
    document.querySelectorAll('.progress').forEach(bar => {
      if (bar.getBoundingClientRect().top < window.innerHeight) {
        bar.style.width = bar.getAttribute('data-value');
      }
    });
  });
}

// Project List + Modal
function loadProjects() {
  const projects = [
    { title: "WebApp 1", category: "Web", desc: "A responsive website using HTML/CSS/JS." },
    { title: "AI Bot", category: "AI", desc: "A conversational AI built in JavaScript." },
    { title: "Data Cruncher", category: "Data", desc: "Tool for analyzing large datasets." }
  ];
  const list = document.getElementById("project-list");
  list.innerHTML = projects.map((p, i) =>
    `<div class="project" data-id="${i}" data-category="${p.category}">${p.title}</div>`
  ).join("");

  // Filter
  document.querySelectorAll('[data-category]').forEach(btn => {
    btn.onclick = () => {
      const cat = btn.getAttribute('data-category');
      document.querySelectorAll('.project').forEach(proj => {
        proj.style.display = (cat === 'all' || proj.dataset.category === cat) ? 'block' : 'none';
      });
    };
  });

  // Modal
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalClose = document.getElementById("modal-close");

  document.querySelectorAll('.project').forEach(proj => {
    proj.onclick = () => {
      const p = projects[proj.dataset.id];
      modalTitle.textContent = p.title;
      modalDesc.textContent = p.desc;
      modal.classList.remove("hidden");
    };
  });

  modalClose.onclick = () => modal.classList.add("hidden");
  window.onclick = (e) => { if (e.target === modal) modal.classList.add("hidden"); };
}

// Blog Posts + Search
function loadBlogPosts() {
  const posts = [
    { title: "Getting Started", content: "Welcome to my dev blog!" },
    { title: "Why JavaScript Rocks", content: "JS can do everything on the web." }
  ];
  const container = document.getElementById("blog-posts");
  const search = document.getElementById("search");

  function render(query = "") {
    container.innerHTML = posts
      .filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      .map(p => `<article><h3>${p.title}</h3><p>${p.content}</p></article>`).join("");
  }

  search.oninput = () => render(search.value);
  render();
}

// Form Validation
function setupFormValidation() {
  const form = document.getElementById("contact-form");
  form.onsubmit = (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) return alert("All fields required.");
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) return alert("Invalid email.");
    alert("Message sent!");
    form.reset();
  };
}

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

{
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = 
      document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.textContent = document.body.dataset.theme === 'dark' ? '🌙' : '🌞';
  });

  // Animate skill bars
  document.querySelectorAll('.progress').forEach(bar => {
    bar.style.width = bar.dataset.value;
  });

  // Modal functionality
  const modal = document.getElementById('project-modal');
  document.getElementById('modal-close').addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Tab functionality
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
});
