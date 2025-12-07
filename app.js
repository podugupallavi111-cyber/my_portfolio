// Base API - change if your backend uses another host/port
const API_BASE = 'http://localhost:3000';

async function fetchJSON(path){
  const res = await fetch(API_BASE + path);
  if(!res.ok) return [];
  return res.json();
}

async function renderSkills(){
  const list = await fetchJSON('/skills');
  const container = document.getElementById('skills-list');
  container.innerHTML = '';
  if(!list || list.length === 0){
    container.innerHTML = '<div class="col-12">No skills yet. Edit backend to add skills.</div>';
    return;
  }
  list.forEach(s => {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6';
    col.innerHTML = `<div class="card-project"><h5 class="mb-1">${s.name}</h5><small class="text-muted">${s.level || ''}</small></div>`;
    container.appendChild(col);
  });
}

async function renderProjects(){
  const list = await fetchJSON('/projects');
  const container = document.getElementById('projects-list');
  container.innerHTML = '';
  if(!list || list.length === 0){
    container.innerHTML = '<div class="col-12">No projects yet. Edit backend to add projects.</div>';
    return;
  }
  list.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-md-6';
    col.innerHTML = `
      <div class="card-project d-flex gap-3">
        <div style="min-width:140px">
          <div style="width:140px;height:90px;background:#f1f3f5;border-radius:6px"></div>
        </div>
        <div>
          <h5 class="mb-1">${p.title}</h5>
          <p class="mb-1 small text-muted">${p.description}</p>
          <a href="${p.link || '#'}" target="_blank" rel="noopener noreferrer">View</a>
        </div>
      </div>`;
    container.appendChild(col);
  });
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let alertBox = document.getElementById("successAlert");

    if (name === "" || email === "" || message === "") {
        alert("Please fill all fields!");
        return;
    }

    // Show the green success alert
    alertBox.classList.remove("d-none");

    // Clear form fields
    document.getElementById("contactForm").reset();

    // Hide alert after 3 seconds (optional)
    setTimeout(() => {
        alertBox.classList.add("d-none");
    }, 3000);
});


// helpers
document.getElementById('year').textContent = new Date().getFullYear();
renderSkills();
renderProjects();
// Animate skill bars on scroll
document.addEventListener("DOMContentLoaded", () => {

  const skillBars = document.querySelectorAll(".progress-bar");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const value = entry.target.getAttribute("data-value");
          entry.target.style.width = value + "%";
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach(bar => observer.observe(bar));

});
// Optional fade-in animation when project section appears
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = ".6s ease";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.3 });

  projectCards.forEach(card => observer.observe(card));
});
// Simple fade-in animation for education cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.education-card');
  cards.forEach(c => {
    c.style.opacity = 0;
    c.style.transform = 'translateY(20px)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  cards.forEach(c => observer.observe(c));
});
// Fade-in animation for experience card
document.addEventListener('DOMContentLoaded', () => {
  const expCard = document.querySelector('.experience-card');
  
  expCard.style.opacity = 0;
  expCard.style.transform = 'translateY(20px)';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity .6s ease, transform .6s ease';
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.3 });

  observer.observe(expCard);
});
