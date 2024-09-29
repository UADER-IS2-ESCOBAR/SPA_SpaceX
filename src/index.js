import './styles.css';

async function fetchRocketData() {
  try {
    const response = await fetch('https://api.spacexdata.com/v5/launches');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function createRocketCard(rocket) {
  const card = document.createElement('div');
  card.classList.add('rocket-card');

  const img = document.createElement('img');
  img.src = rocket.links.patch.small; // Asegúrate de que esta propiedad sea la correcta
  img.alt = rocket.name;

  const name = document.createElement('h2');
  name.textContent = rocket.name;

  card.appendChild(img);
  card.appendChild(name);

  card.addEventListener('click', () => {
    window.location.href = `details.html?id=${rocket.id}`; // Ajusta el enlace según sea necesario
  });

  return card;
}

async function displayRockets() {
  const rockets = await fetchRocketData();
  const container = document.getElementById('rocket-container');

  rockets.forEach(rocket => {
    const card = createRocketCard(rocket);
    container.appendChild(card);
  });
}

displayRockets();
