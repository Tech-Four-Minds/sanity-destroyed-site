async function getEvents() {
  try {
    const response = await fetch("http://localhost:3333/api/events");
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function renderEvents() {
  const eventList = document.getElementById("event-list");
  const events = await getEvents();

  if (events.length === 0) {
    eventList.innerHTML = `
      <li class="w-100 fs-6 py-3 px-5 d-flex flex-column text-center align-items-center bg-dark bg-opacity-50 border border-primary rounded-3 text-light fw-bold text-shadow">
        <p class="text-danger">Nenhum evento disponível no momento.</p>
        <p class="text-white">Fique ligado para futuras atualizações!</p>
      </li>
    `;
    return;
  }

  eventList.innerHTML = events
    .map(
      (
        event
      ) => `<li class="w-100 fs-5 py-3 px-5 d-flex flex-column flex-sm-row text-center align-items-center justify-content-between bg-dark bg-opacity-50 rounded-3 text-light fw-bold text-shadow">
          <!-- Primeira div -->
          <div>
            <p>${new Date(event.date).toLocaleDateString()}</p>
          </div>
          <!-- Segunda div -->
          <div>
            <p class="text-primary">${event.name}</p>
            <p>${event.location}</p>
          </div>
          <!-- Terceira div com botão -->
          <div class="d-flex align-items-center justify-content-center">
            <button class="btn btn-primary">Ver mais</button>
          </div>
        </li>`
    )
    .join("");
}

renderEvents();
