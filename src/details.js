import './styles.css';

// Función para obtener el ID del lanzamiento desde la URL
function getLaunchIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Función para obtener los detalles del lanzamiento
async function fetchLaunchDetails(id) {
  try {
    const response = await fetch(`https://api.spacexdata.com/v5/launches/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching launch details:', error);
    return null;
  }
}

// Función para mostrar los detalles del lanzamiento
async function displayLaunchDetails() {
  const launchId = getLaunchIdFromURL();
  if (!launchId) {
    console.error('No launch ID found in URL');
    return;
  }

  const launchDetails = await fetchLaunchDetails(launchId);
  if (!launchDetails) {
    console.error('No details found for launch ID:', launchId);
    return;
  }

  // Obtener los elementos del DOM
  const rocketImage = document.getElementById('rocket-image');
  const failures = document.getElementById('failures');
  const details = document.getElementById('details');
  const flightNumber = document.getElementById('flight-number');
  const launchDate = document.getElementById('launch-date');
  const webcastLink = document.getElementById('webcast-link');

  // Rellenar los elementos con la información del lanzamiento
  rocketImage.src = launchDetails.links.patch.small || ''; // Usa una imagen grande
  rocketImage.alt = launchDetails.name || 'Imagen del cohete';

  failures.textContent = launchDetails.failures.map(failure => `Falla: ${failure.reason}`).join(', ') || 'No hubo fallas';
  details.textContent = launchDetails.details || 'No hay detalles disponibles';
  flightNumber.textContent = `Número de vuelo: ${launchDetails.flight_number || 'Desconocido'}`;
  launchDate.textContent = `Fecha y hora: ${new Date(launchDetails.date_utc).toLocaleString() || 'Desconocida'}`;
  webcastLink.href = launchDetails.links.webcast || '#';
  webcastLink.textContent = 'Ver Webcast';
}

// Llamar a la función para mostrar los detalles cuando se cargue el script
displayLaunchDetails();
