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
    const newslist = document.getElementById("news-list");
    const news = await getNews();

    if (news.length === 0) {
        newslist.innerHTML = `
            <p class="text-center fs-4 text-muted">Não há novidades no momento.</p>
        `;
        return;
    }

    newslist.innerHTML = news.map((item, index) => `
        <!-- Destaque ${index + 1} -->
        <article class="d-flex gap-3 text-uppercase mb-5 row ${index % 2 !== 0 ? 'flex-row-reverse' : ''}">
            <!-- Imagem da notícia -->
            <div class="col-sm-12 col-lg-5">
                <img src="${item.image}" alt="${item.name}" class="img-fluid" />
            </div>
            <!-- Manchete da notícia -->
            <div class="col d-flex flex-column justify-content-between p-2 fs-3">
                <div>
                    <p class="fw-medium m-0">${item.date}</p>
                    <p class="fw-bold m-0">${item.description}</p>
                </div>
                <div class="mt-auto ${index % 2 === 0 ? 'ms-auto' : ''}">
                    <button class="btn btn-danger">Ver mais</button>
                </div>
            </div>
        </article>
    `).join('');
}

renderNews();
