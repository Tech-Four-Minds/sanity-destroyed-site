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
      <div class="carousel-item active">
        <div class="text-center p-5 fw-bold">
          <h3 class="text-light">Nenhum evento disponível no momento.</h3>
          <p class="text-secondary">Fique ligado para futuras atualizações!</p>
        </div>
      </div>
    `;
    return;
  }


  eventList.innerHTML = events
    .map((event, index) => {
      const isActive = index === events.length - 1 ? "active" : "";
      return `
          <div class="carousel-item ${isActive}">
              <div class="card bg-dark text-light border-light mx-auto card-post">
                  <img src="${event.image}" class="rounded-top img-fluid" alt="${event.name}">
                  <div class="card-body">
                  <h5 class="card-title text-primary fw-bold">
                      ${event.name}
                  </h5>
                  <p class="card-text">
                      <strong>Data:</strong> ${event.date}<br>
                      <strong>Local:</strong> ${event.location}<br>
                      <strong>Bilheteria: ${event.ticket}</strong>
                      <a href="#" class="text-light" target="_blank">Sympla</a>
                  </p>
                  </div>
              </div>
          </div>
        `;
    })
    .join("");
}

async function getNews() {
  try {
    const response = await fetch("http://localhost:3333/api/news");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function renderNews() {
  const newList = document.getElementById("new-list");
  const news = await getNews();

  if (news.length === 0) {
    newList.innerHTML = `
      <div class="col-12 text-center fw-bold">
        <h3 class="text-dark">Nenhuma novidade no momento.</h3>
        <p class="text-secondary">Volte em breve para ficar por dentro das atualizações!</p>
      </div>
    `;
    return;
  }

  const latestNews = news.slice(-3);

  newList.innerHTML = latestNews
    .map(
      (n) => `
           <article class="col-md-4 mb-4">
            <img class="img-fluid rounded" src="${n.image}" alt="${n.name}">
            <p>${n.date}</p>
            <h2 class="fs-5">${n.name}</h2>
          </article> 
        `
    )
    .join("");
}

async function getProducts() {
  try {
    const response = await fetch("http://localhost:3333/api/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function renderStore() {
  const productList = document.getElementById("product-list");
  const products = await getProducts();

  if (products.length === 0) {
    productList.innerHTML = `
      <div class="col-12 text-center fw-bold">
        <h3 class="text-dark">Nenhum produto disponível no momento.</h3>
        <p class="text-secondary">Volte em breve para conferir nossas novidades!</p>
      </div>
    `;
    return;
  }

  const getColumns = () => {
    const width = window.innerWidth;

    if (width >= 1200) {
      // Tela grande (3 cards por linha)
      return 3;
    } else if (width >= 768) {
      // Tela média (2 cards por linha)
      return 2;
    } else {
      // Tela pequena (1 card por linha)
      return 1;
    }
  };

  // Número de colunas a ser renderizado
  const columns = getColumns();

  const groupedProducts = [];
  for (let i = 0; i < products.length; i += columns) {
    groupedProducts.push(products.slice(i, i + columns));
  }

  productList.innerHTML = groupedProducts
    .map((group, groupIndex) => {
      const isActive = groupIndex === 0 ? "active" : "";
      return `
        <div class="carousel-item ${isActive}">
          <div class="row justify-content-center">
            ${group
              .map((product) => {
                return `
                  <div class="col-12 col-md-6 col-lg-4 mb-2">
                   <div class="position-relative">
                      <!-- Imagem de fundo -->
                      <img src="../dist/assets/images/fundoItens.png" alt="Fundo" class="img-fluid w-100">
              
                      <!-- Retângulo branco com a imagem do produto -->
                      <div class="position-absolute top-0 start-50 translate-middle-x white-background">
                        <div class="bg-white rounded-3 p-3 shadow-sm">
                          <img src="${product.image}" alt="${product.id}" class="img-fluid mx-auto d-block">
                        </div>
                      </div>
              
                      <!-- Informações do produto -->
                      <div class="position-absolute start-50 translate-middle-x info-product">
                        <h5 class="fw-bold text-light font-name-product mb-sm-2">${product.name}</h5>
                        <div class="d-flex gap-1 font-discount">
                          <p class="card-text fw-semibold text-light bg-primary px-1 px-sm-3 rounded-1 ">DESCONTO 50% OFF</p>
                          <p class="text-light">DE <span class="text-decoration-line-through"><span class="fw-bold text-primary">R$</span> 100,00</span></p>
                        </div>
                        <p class="fw-bold fs-4 text-light"><span class="fs-6 text-primary">R$</span> ${product.price}</p>
                      </div>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
      `;
    })
    .join("");
}

renderEvents();
renderNews();
renderStore(); 

window.addEventListener("resize", () => {
  renderStore(); 
});
