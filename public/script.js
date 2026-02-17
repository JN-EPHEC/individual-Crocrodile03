// Waiting for DOM
document.addEventListener('DOMContentLoaded', () => {
  const ul = document.querySelector('ul');
  const form = document.querySelector('form');

  // Loading user
  async function loadUsers() {
    try {
      const response = await fetch('/api/users');
      const users = await response.json();

      ul.innerHTML = '';

      users.forEach((user) => {
        const li = document.createElement('li');
        li.textContent = `${user.nom} ${user.prenom}`;
        ul.appendChild(li);
      });
    } catch (error) {
      console.error('Erreur lors du chargement :', error);
    }
  }

  // Charger les utilisateurs au démarrage
  loadUsers().then(r => {});

  // Getting form
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom, prenom }),
      });

      if (response.ok) {
        form.reset();
        await loadUsers();
      } else {
        console.error("Erreur lors de l'ajout");
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  });
});
