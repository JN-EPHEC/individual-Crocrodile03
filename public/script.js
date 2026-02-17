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
        li.classList.add('collection-item');

        li.innerHTML = `
                <span>${user.nom} ${user.prenom}</span>
                <button class="btn-small red right delete-btn" data-id="${user.id}">
                    X
                </button>
            `;

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
  ul.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.dataset.id;

      try {
        const response = await fetch(`/api/users/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await loadUsers(); // rafraîchir la liste
        }
      } catch (error) {
        console.error('Erreur suppression :', error);
      }
    }
  });

});
