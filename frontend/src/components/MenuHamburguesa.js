// Obtener el botón y el sidenav
const sidenav = document.getElementById('sidenav-1');
const sidenavToggle = document.getElementById('sidenav-toggle');

// Añadir un event listener para alternar la clase 'active'
sidenavToggle.addEventListener('click', () => {
  sidenav.classList.toggle('active');
});

// Añadir event listener para manejar los enlaces y cerrar el sidenav
const sidenavLinks = document.querySelectorAll('.sidenav-link');

sidenavLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidenav.classList.remove('active');
  });
});