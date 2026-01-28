// ============================================
// LOA FRANCE - Main JavaScript
// ============================================

// DOM Elements
const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');
const vehiclesGrid = document.getElementById('vehiclesGrid');

// ============================================
// Navigation
// ============================================

// Sticky navbar on scroll
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
navbarToggle?.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
  
  // Animate hamburger
  const spans = navbarToggle.querySelectorAll('span');
  navbarMenu.classList.contains('active') 
    ? animateHamburger(spans, true)
    : animateHamburger(spans, false);
});

function animateHamburger(spans, isOpen) {
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translateY(10px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
}

// Close mobile menu on link click
document.querySelectorAll('.navbar-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navbarMenu.classList.remove('active');
    const spans = navbarToggle.querySelectorAll('span');
    animateHamburger(spans, false);
  });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.navbar-menu a[href*="' + sectionId + '"]')?.classList.add('active');
    } else {
      document.querySelector('.navbar-menu a[href*="' + sectionId + '"]')?.classList.remove('active');
    }
  });
});

// ============================================
// Search Tabs
// ============================================
const searchTabs = document.querySelectorAll('.search-tab');

searchTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    searchTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ============================================
// Vehicle Data
// ============================================
const vehicles = [
  {
    id: 1,
    brand: 'Peugeot',
    name: '3008 GT',
    type: 'SUV',
    image: 'images/peugeot_3008_1769598046508.png',
    price: 32990,
    loaPrice: 299,
    year: 2024,
    fuel: 'Diesel',
    transmission: 'Automatique',
    km: 0,
    badge: 'Neuf',
    badgeType: 'new'
  },
  {
    id: 2,
    brand: 'Renault',
    name: 'Mégane E-Tech',
    type: 'Électrique',
    image: 'images/renault_megane_1769598075128.png',
    price: 35400,
    loaPrice: 349,
    year: 2024,
    fuel: 'Électrique',
    transmission: 'Automatique',
    km: 0,
    badge: 'Électrique',
    badgeType: 'electric'
  },
  {
    id: 3,
    brand: 'Citroën',
    name: 'C5 Aircross',
    type: 'SUV',
    image: 'images/citroen_c5_1769598098947.png',
    price: 28990,
    loaPrice: 269,
    year: 2024,
    fuel: 'Essence',
    transmission: 'Manuelle',
    km: 0,
    badge: 'LOA Dispo',
    badgeType: 'loa'
  },
  {
    id: 4,
    brand: 'DS',
    name: 'DS 7 Crossback',
    type: 'SUV Premium',
    image: 'images/ds7_crossback_1769598121405.png',
    price: 45990,
    loaPrice: 449,
    year: 2024,
    fuel: 'Hybride',
    transmission: 'Automatique',
    km: 0,
    badge: 'Premium',
    badgeType: 'new'
  },
  {
    id: 5,
    brand: 'Peugeot',
    name: '208 GT Line',
    type: 'Citadine',
    image: 'images/peugeot_208_1769598143373.png',
    price: 22490,
    loaPrice: 199,
    year: 2024,
    fuel: 'Essence',
    transmission: 'Automatique',
    km: 0,
    badge: 'LOA Dispo',
    badgeType: 'loa'
  },
  {
    id: 6,
    brand: 'Renault',
    name: 'Clio Intens',
    type: 'Citadine',
    image: 'images/renault_clio_1769598162756.png',
    price: 19990,
    loaPrice: 179,
    year: 2024,
    fuel: 'Essence',
    transmission: 'Manuelle',
    km: 0,
    badge: 'Best Seller',
    badgeType: 'new'
  }
];

// ============================================
// Render Vehicles
// ============================================
function renderVehicles(vehiclesToRender = vehicles) {
  if (!vehiclesGrid) return;
  
  vehiclesGrid.innerHTML = vehiclesToRender.map(vehicle => `
    <div class="vehicle-card reveal">
      <div class="vehicle-badge ${vehicle.badgeType}">${vehicle.badge}</div>
      <div class="vehicle-image">
        <img src="${vehicle.image}" alt="${vehicle.brand} ${vehicle.name}" loading="lazy">
        <button class="vehicle-favorite" onclick="toggleFavorite(${vehicle.id})">
          <i class="far fa-heart"></i>
        </button>
      </div>
      <div class="vehicle-info">
        <div class="vehicle-brand">${vehicle.brand}</div>
        <h3 class="vehicle-name">${vehicle.name}</h3>
        
        <div class="vehicle-specs">
          <div class="spec-item">
            <i class="fas fa-calendar"></i>
            <span>${vehicle.year}</span>
          </div>
          <div class="spec-item">
            <i class="fas fa-gas-pump"></i>
            <span>${vehicle.fuel}</span>
          </div>
          <div class="spec-item">
            <i class="fas fa-cog"></i>
            <span>${vehicle.transmission}</span>
          </div>
        </div>
        
        <div class="vehicle-footer">
          <div class="vehicle-price">
            <span class="price-label">À partir de</span>
            <div>
              <span class="price-amount">${vehicle.loaPrice}€</span>
              <span class="price-period">/mois</span>
            </div>
          </div>
          <button class="btn btn-primary" onclick="viewDetails(${vehicle.id})">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
  
  // Trigger reveal animation
  observeElements();
}

// ============================================
// Vehicle Actions
// ============================================
const favorites = new Set();

function toggleFavorite(vehicleId) {
  const btn = event.currentTarget;
  const icon = btn.querySelector('i');
  
  if (favorites.has(vehicleId)) {
    favorites.delete(vehicleId);
    icon.classList.remove('fas');
    icon.classList.add('far');
    btn.classList.remove('active');
  } else {
    favorites.add(vehicleId);
    icon.classList.remove('far');
    icon.classList.add('fas');
    btn.classList.add('active');
  }
}

function viewDetails(vehicleId) {
  const vehicle = vehicles.find(v => v.id === vehicleId);
  if (vehicle) {
    // For now, just log - in production, navigate to details page
    console.log('View details for:', vehicle);
    alert(`Détails du véhicule: ${vehicle.brand} ${vehicle.name}\nPrix LOA: ${vehicle.loaPrice}€/mois`);
  }
}

// ============================================
// Scroll Reveal Animation
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

function observeElements() {
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
}

// ============================================
// Search Functionality
// ============================================
const searchBtn = document.querySelector('.btn-search');

searchBtn?.addEventListener('click', () => {
  const brand = document.getElementById('brandSelect').value;
  const type = document.getElementById('typeSelect').value;
  const budget = document.getElementById('budgetSelect').value;
  
  let filteredVehicles = vehicles;
  
  if (brand) {
    filteredVehicles = filteredVehicles.filter(v => 
      v.brand.toLowerCase() === brand.toLowerCase()
    );
  }
  
  if (type) {
    filteredVehicles = filteredVehicles.filter(v => 
      v.type.toLowerCase().includes(type.toLowerCase()) ||
      v.fuel.toLowerCase().includes(type.toLowerCase())
    );
  }
  
  if (budget) {
    const [min, max] = budget.split('-').map(b => parseInt(b.replace('+', '999999')));
    filteredVehicles = filteredVehicles.filter(v => 
      v.price >= min && v.price <= (max || 999999)
    );
  }
  
  renderVehicles(filteredVehicles);
  
  // Scroll to vehicles section
  document.getElementById('vehicules')?.scrollIntoView({ behavior: 'smooth' });
});

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  renderVehicles();
  observeElements();
  
  // Add loading animation
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});

// ============================================
// Performance: Lazy load images
// ============================================
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}
