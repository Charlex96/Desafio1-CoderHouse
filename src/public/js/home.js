const createCart = () => {
    console.log("🛒 Creando tu carrito...");
    if (!localStorage.getItem("funcionEjecutadaSoloUnaVez")) {
      fetch("/carts", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          let myCart = data.payload;
          localStorage.setItem("myCart", JSON.stringify(myCart));
          localStorage.setItem("myCartId", JSON.stringify(myCart._id));
          localStorage.setItem("funcionEjecutadaSoloUnaVez", true);
        })
        .catch((err) => console.log(err));
    }
  };
  
  const getAllProducts = (limit, page, sort, query) => {
    const myCartId = JSON.parse(localStorage.getItem("myCartId"));
    let urlBase = `/products`;
    if (limit) {
      urlBase += `?limit=${limit}`;
    }
    if (page) {
      urlBase += `&page=${page}`;
    }
    if (sort) {
      urlBase += `&sort=${sort}`;
    }
    if (query) {
      urlBase += `&query[title]=${query}`;
    }
    console.log("urlBase", urlBase);
    fetch(`${urlBase}`)
      .then((res) => res.json())
      .then((data) => {
        const products = data.payload.docs;
        renderProducts(products);
        renderPagination(data.payload);
      })
      .catch((err) => console.log(err));
  };
  
  function renderProducts(products) {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";
    products.forEach((product) => {
      productsContainer.innerHTML += `
        <div class="card" style="width: 250px; margin: 20px">
          <div class="card-image" style="padding: 15px">
            <figure class="image is-4by3">
              <img src="${product.thumbnail}" alt="Placeholder image" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-6">${product.title}</p>
                <p class="title is-4">${product.description}</p>
                <p class="subtitle is-6">${product.price}</p>
              </div>
            </div>
            <button
              class="button is-small"
              type="button"
              onclick="addToCart('${product._id}')"
            ><ion-icon name="cart"></ion-icon>
            </button>
            <button
              class="button is-small"
              type="button"
              onclick="deleteProduct('${product._id}')"
            ><ion-icon name="trash"></ion-icon></button>
  
          </div>
        </div>
      `;
    });
  }
  function renderPagination(payload) {
    let hasNextPage = payload.hasNextPage;
    let hasPrevPage = payload.hasPrevPage;
    let limit = payload.limit;
    let nextPage = payload.nextPage;
    let page = payload.page;
    let prevPage = payload.prevPage;
    let totalPages = payload.totalPages;
  
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";
    paginationContainer.innerHTML += `
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a class="pagination-previous" ${
          hasPrevPage ? `onclick="getAllProducts(${limit}, ${prevPage})"` : ""
        }>Previous</a>
        <a class="pagination-next" ${
          hasNextPage ? `onclick="getAllProducts(${limit}, ${nextPage})"` : ""
        }>Next page</a>
        <ul class="pagination-list">
          <li><a class="pagination-link" ${
            page === 1 ? `onclick="getAllProducts(${limit}, 1)"` : ""
          }>1</a></li> 
          <li><span class="pagination-ellipsis">&hellip;</span></li>
          <li><a class="pagination-link" ${
            page === totalPages
              ? `onclick="getAllProducts(${limit}, ${totalPages})"`
              : ""
          }>${totalPages}</a></li>
        </ul>
      </nav>
    `;
  }
  
  const addToCart = (id) => {
    const myCartId = JSON.parse(localStorage.getItem("myCartId"));
    console.log(`Agregando producto id=${id} al carrito id=${myCartId}`);
    fetch(`/carts/${myCartId}/products/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        //reload page
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  
  const deleteProduct = (id) => {
    fetch(`/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        //reload page
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  
  const goToCart = () => {
    const myCartId = JSON.parse(localStorage.getItem("myCartId"));
    window.location.href = "/carts/" + myCartId;
  };
  const goToLogin = () => {
    window.location.href = "/auth/login";
  };
  const goToRegister = () => {
    window.location.href = "/auth/register";
  };
  const goToLogout = () => {
    window.location.href = "/auth/logout";
  };
  
  const init = () => {
    createCart();
    getAllProducts(5, 1, null, null);
  };
  init();
  