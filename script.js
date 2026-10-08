const state = {
    product: [],
    wishlist: [],
    search: ""
};
const productsEl = document.getElementById("products");
const wishlistEl = document.getElementById("wish-list");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const message = document.getElementById("message");

async function getProducts() {
    message.textContent = "Loading...";

    try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        state.product = data.products;

        message.textContent = "";

        renderProducts();
    } catch (error) {
        message.textContent = "Error loading products";
    }
}

function renderProducts() {
    const filteredProducts = state.product.filter((product) =>
        product.title.toLowerCase().includes(state.search.toLowerCase())
    );

    productsEl.innerHTML = filteredProducts
        .map((product) => createCard(product))
        .join("");

    if (filteredProducts.length === 0) {
        productsEl.innerHTML = "<p>No products found.</p>";
    }
}

function createCard(product) {
    return `
        <div class="card">

            <img src="${product.thumbnail}" alt="${product.title}">

            <div class="card-content">

                <h3>${product.title}</h3>

                <p>${product.category}</p>

                <p>$${product.price}</p>

                <p>${product.rating}</p>

                <button onclick="addToWishlist(${product.id})">
                    ♡ Wishlist
                </button>

            </div>

        </div>
    `;
}

function addToWishlist(id) {
    const product = state.product.find(
        (item) => item.id === id
    );

    state.wishlist.push(product);

    renderWishlist();
}

function renderWishlist() {
    wishlistEl.innerHTML = state.wishlist
        .map((product) => createCard(product))
        .join("");
}

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    state.search = searchInput.value;

    renderProducts();
});

getProducts();