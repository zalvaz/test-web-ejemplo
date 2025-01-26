// Selección de elementos del DOM
const menuIcon = document.getElementById("menu-icon");
const mainMenu = document.getElementById("main-menu");
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");

// Variable global para almacenar el número de productos en el carrito
let cartItems = JSON.parse(localStorage.getItem("cart"))?.reduce((sum, item) => sum + item.quantity, 0) || 0;

// Función para actualizar el contador del carrito
function updateCartCount() {
    if (cartItems > 0) {
        cartCount.textContent = cartItems;
        cartIcon.parentElement.classList.add("show"); // Muestra el contador
    } else {
        cartIcon.parentElement.classList.remove("show"); // Oculta el contador
    }
}

// Función para añadir productos al carrito
function addToCart(event) {
    event.preventDefault();

    // Obtener el contenedor del producto
    const productCard = event.target.closest(".product-card");
    if (!productCard) return; // Verifica que se seleccionó correctamente

    // Extraer datos del producto
    const productName = productCard.querySelector("h3")?.textContent || "Producto desconocido";
    const productPrice = parseFloat(productCard.querySelector(".price")?.textContent.replace("$", "") || 0);
    const productImage = productCard.querySelector("img")?.src || "";
    const productId = productCard.querySelector(".btn-secondary")?.dataset.id || `product-${Date.now()}`;

    // Obtener el carrito actual desde Local Storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Buscar si el producto ya existe en el carrito
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        // Incrementar la cantidad si el producto ya existe
        existingProduct.quantity += 1;
    } else {
        // Agregar un nuevo producto al carrito
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    // Guardar el carrito actualizado en Local Storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Actualizar el contador del carrito
    cartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    updateCartCount();
}

// Escuchar clicks en botones "Añadir al carrito"
document.addEventListener("click", (e) => {
    if (e.target.matches(".add-to-cart")) {
        addToCart(e); // Añade el producto al carrito
    }
});

// Función para manejar el menú hamburguesa
function toggleMenu() {
    mainMenu.classList.toggle("active"); // Alterna la clase activa para mostrar/ocultar el menú
    menuIcon.classList.toggle("active"); // Alterna la clase activa del ícono
}

// Escuchar clic en el ícono del menú hamburguesa
menuIcon.addEventListener("click", toggleMenu);

// Cerrar el menú al hacer clic fuera de él
document.addEventListener("click", (e) => {
    if (!menuIcon.contains(e.target) && !mainMenu.contains(e.target) && mainMenu.classList.contains("active")) {
        mainMenu.classList.remove("active");
        menuIcon.classList.remove("active");
    }
});

// Inicializar contador del carrito al cargar la página
updateCartCount();
