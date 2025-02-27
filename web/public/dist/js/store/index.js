async function getProducts() {
  try {
    const response = await fetch("http://localhost:3333/api//products");
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function renderProducts() {
  const productList = document.getElementById("product-list");
  const products = await getProducts();

  console.log(products);

  productList.innerHTML = products.map(
    (product) => `
        
        <div class="col-6 col-md-4 col-lg-3 mb-2">
              <div class="position-relative">
                <!-- Imagem de fundo -->
                <img src="../dist/assets/images/fundoItens.png" alt="Fundo" class="img-fluid w-100">
        
                <!-- Retângulo branco com a imagem do produto -->
                <div class="position-absolute top-0 start-50 translate-middle-x white-background">
                  <div class="bg-white rounded-3 p-3 shadow-sm">
                    <img src="${product.image}" alt="Produto" class="img-fluid mx-auto d-block">
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
        
    `
  );
}

renderProducts();
