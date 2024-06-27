// http://localhost:3000/Items
const searchInput = document.querySelector("#search");
const productsContainer = document.querySelector(".product-container");
let allProductsData = [];
const btns = document.querySelectorAll(".btn");
const filters = {
  searchItems: "",
};
document.addEventListener("DOMContentLoaded", () => {
  getProductsFromServer();
});
function getProductsFromServer() {
  axios
    .get("http://localhost:3000/Items")
    .then((res) => {
      allProductsData = res.data;
      renderProducts(res.data, filters);
    })
    .catch((err) => console.log(err));
}
function renderProducts(products, filters) {
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filters.searchItems.toLowerCase())
  );
  productsContainer.innerHTML = "";
  filteredProducts.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `<div class="img-container">
            <img src="${item.imgSrc}" alt="${item.id}">
          </div>
          <div class="product-desc">
            <p class="product-title">${item.title}</p>
            <p class="price">$${item.price}</p>
          </div>`;
    productsContainer.appendChild(productDiv);
  });
}
searchInput.addEventListener("input", (event) => {
  filters.searchItems = event.target.value;
  renderProducts(allProductsData, filters);
});
btns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const filter = event.target.dataset.filter;
    filters.searchItems = filter;
    renderProducts(allProductsData, filters);
  });
});
