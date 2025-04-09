document.addEventListener("DOMContentLoaded", () => {
  // Dynamic Greeting
  const greeting = document.getElementById("greeting");
  const hour = new Date().getHours();
  greeting.textContent = hour < 12 ? "Good Morning!" : 
                       hour < 18 ? "Good Afternoon!" : 
                       "Good Evening!";

  // Theme Toggle with LocalStorage
  const toggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  toggle.textContent = savedTheme === "dark" ? "🌙" : "🌞";

  toggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    toggle.textContent = newTheme === "dark" ? "🌙" : "🌞";
  });

  // Initial Setup
  loadProjects();
  loadBlogPosts();
  setupFormValidation();
  animateSkills();
  setupTabs();
  setupModal();
});

// ✅ FIXED SKILL BAR ANIMATION
function animateSkills() {
  const animateBars = () => {
    document.querySelectorAll('.progress').forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      const isAlreadyFilled = bar.style.width && bar.style.width !== "0px";

      if (isVisible && !isAlreadyFilled) {
        bar.style.width = bar.dataset.value;

        // Optional fade/slide effect
        bar.closest(".skill").classList.add("visible");
      }
    });
  };

  animateBars(); // run immediately
  window.addEventListener("scroll", animateBars); // run on scroll
}

function loadProjects() {
  const projects = [
    { 
      title: "Library ManagementSystem", 
      category: "Web", 
      desc: "An online library platform using HTML, CSS and javascript.",
      image: "Lib mngmt system.JPG"
    },
    { 
      title: "Premier League Table", 
      category: "AI", 
      desc: "A depiction of the Premier league table built using THTM and CSS.",
      image: "capture.jpg"
    },
    { 
      title: "Data Mining Dashboard", 
      category: "Data", 
      desc: "A dashboard that displays insights from web-mined data.",
      image: "assets/data-dashboard.jpg"
    }
  ];

  const list = document.getElementById("project-list");
  list.innerHTML = projects.map((project, index) => `
    <div class="project-card" data-id="${index}" data-category="${project.category}">
      <img src="${project.image}" alt="${project.title}" onerror="this.src='assets/default.jpg'">
      <h3>${project.title}</h3>
      <p>${project.category}</p>
    </div>
  `).join("");

  // Filtering logic (if buttons exist)
  document.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      document.querySelectorAll('.project-card').forEach(card => {
        card.style.display = (category === 'all' || card.dataset.category === category) ? 
          'block' : 'none';
      });
    });
  });
}

function setupModal() {
  const modal = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.id;
      const project = {
        title: card.querySelector('h3').textContent,
        desc: card.querySelector('p').textContent
      };
      modalTitle.textContent = project.title;
      modalDesc.textContent = project.desc;
      modal.classList.remove('hidden');
    });
  });

  modalClose.addEventListener('click', () => modal.classList.add('hidden'));
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

function loadBlogPosts() {
  const posts = [
    { 
      title: "Web Development Basics", 
      content: "Getting started with modern web development...",
      date: "2024-03-01"
    },
    { 
      title: "JavaScript Best Practices", 
      content: "Clean code techniques for JS developers...",
      date: "2024-03-15"
    }
  ];

  const container = document.getElementById("blog-posts");
  const searchInput = document.getElementById("search");

  function renderPosts(searchTerm = "") {
    container.innerHTML = posts
      .filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(post => `
        <article class="blog-post">
          <h3>${post.title}</h3>
          <small>${new Date(post.date).toLocaleDateString()}</small>
          <p>${post.content}</p>
        </article>
      `).join("");
  }

  searchInput.addEventListener('input', (e) => renderPosts(e.target.value));
  renderPosts();
}

function setupFormValidation() {
  const form = document.getElementById("contact-form");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Simulate form submission
    form.reset();
    alert("Thank you for your message! We'll respond shortly.");
  });
}

function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and content
      document.querySelectorAll('.tab-btn, .tab-content').forEach(el => {
        el.classList.remove('active');
      });

      // Add active class to clicked button and corresponding content
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
}
