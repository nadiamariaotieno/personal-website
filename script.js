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
      category: "HTML, CSS, JavaScript", 
      desc: "An online library platform using HTML, CSS and javascript.",
      image: "library-system.jpg"
    },
    { 
      title: "Premier League Table", 
      category: "HTML, CSS", 
      desc: "A depiction of the Premier league table built using HTML and CSS.",
      image: "premier.jpg"
    },
    { 
      title: "Food Ordering System", 
      category: "HTML, CSS, JavaScript", 
      desc: "A Food Ordering System.",
      image: "gourmet.jpg"
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
  title: "Why I Chose to Study Applied Computer Technology",
  content: "From a young age, I've always been curious about how technology works — not just using it, but understanding the logic behind it. I chose Applied Computer Technology because it blends practical skills with real-world problem-solving. The hands-on nature of the course allows me to build applications, experiment with networks, explore AI, and dive into data analysis. My ultimate dream is to work at the intersection of technology and health — especially in biomedical engineering — where I can create meaningful solutions that improve lives. Studying Applied Computer Technology gives me the foundation I need to turn that vision into reality.",
  date: "2025-04-09"
},
    {
  title: "My Future in Biomedical Technology",
  content: "As I continue to grow in the tech field, my vision is to specialize in biomedical technology — a space where innovation truly saves lives. I'm deeply inspired by how computer systems, artificial intelligence, and data science are being used to solve real health problems. Whether it's building smart diagnostic tools, improving patient data systems, or designing wearable health devices, I want to contribute to the future of healthcare. After completing my Bachelor's in Applied Computer Technology, I plan to pursue a Master’s in Biomedical Engineering. Combining technology with medicine feels like the most impactful path I can take, and I'm excited for what lies ahead.",
  date: "2025-04-09"
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
