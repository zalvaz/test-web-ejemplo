// Selección de elementos
const cartContainer = document.getElementById("cart-container");
const totalAmount = document.getElementById("total-amount");
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Recuperar del localStorage

// Renderizar productos en la cesta
function renderCartItems() {
    cartContainer.innerHTML = ""; // Limpiar contenedor
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <span class="price">$${item.price.toFixed(2)}</span>
                <div class="quantity">
                    <button class="decrease" data-index="${index}">-</button>
                    <input type="number" value="${item.quantity}" readonly>
                    <button class="increase" data-index="${index}">+</button>
                </div>
                <button class="remove" data-index="${index}">Eliminar</button>
            </div>
        `;
    });

    totalAmount.textContent = total.toFixed(2);
}

// Actualizar cantidad de producto
function updateQuantity(index, action) {
    if (action === "increase") {
        cart[index].quantity++;
    } else if (action === "decrease" && cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
}

// Eliminar producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Elimina el producto
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
}

// Escuchar eventos de botones en la cesta
cartContainer.addEventListener("click", (e) => {
    const index = parseInt(e.target.dataset.index, 10);

    if (e.target.classList.contains("increase")) {
        updateQuantity(index, "increase");
    } else if (e.target.classList.contains("decrease")) {
        updateQuantity(index, "decrease");
    } else if (e.target.classList.contains("remove")) {
        removeFromCart(index);
    }
});

// Inicializar renderizado
renderCartItems();
