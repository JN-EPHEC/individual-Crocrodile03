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
            <div class="user-row">
                <span>${user.nom} ${user.prenom}</span>
            </div>
            <div class="actions">
              <button class="btn-small blue edit-btn"
              data-id="${user.id}"
              data-nom="${user.nom}"
              data-prenom="${user.prenom}">M</button>
              <button class="btn-small red delete-btn" data-id="${user.id}">X</button>
            </div>            
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

    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();

    // Regex lettres uniquement (accents inclus)
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/;

    if (!nom || !prenom) {
      M.toast({ html: 'Nom et prénom requis', classes: 'red' });
      return;
    }

    if (!nameRegex.test(nom) || !nameRegex.test(prenom)) {
      M.toast({ html: 'Seulement des lettres autorisées', classes: 'red' });
      form.reset();
      return;
    }

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
    if (e.target.classList.contains('edit-btn')) {
      const id = e.target.dataset.id;
      const oldNom = e.target.dataset.nom;
      const oldPrenom = e.target.dataset.prenom;

      const newNom = prompt('Nouveau nom :', oldNom)?.trim();
      const newPrenom = prompt('Nouveau prénom :', oldPrenom)?.trim();

      if (!newNom || !newPrenom) return;

      const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/;

      if (!nameRegex.test(newNom) || !nameRegex.test(newPrenom)) {
        M.toast({ html: 'Seulement des lettres autorisées', classes: 'red' });
        return;
      }

      try {
        const response = await fetch(`/api/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom: newNom,
            prenom: newPrenom,
          }),
        });

        if (response.ok) {
          await loadUsers();
          M.toast({ html: 'Utilisateur modifié', classes: 'green' });
        }
      } catch (error) {
        console.error('Erreur modification :', error);
      }
    }
  });

});
