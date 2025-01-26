// Variables y elementos
const filtersToggle = document.getElementById('filters-toggle');
const filtersMenu = document.getElementById('filters');
const closeFilters = document.getElementById('close-filters');
const productGrid = document.getElementById('product-grid');
const priceMin = document.getElementById('price-min');
const priceMax = document.getElementById('price-max');
const priceMinValue = document.getElementById('price-min-value');
const priceMaxValue = document.getElementById('price-max-value');
const categoryFilters = document.querySelectorAll('.category-filter');
const cartCount = document.getElementById('cart-count');

// Variables para el menú hamburguesa
const menuIcon = document.getElementById("menu-icon");
const mainMenu = document.getElementById("main-menu");

// Productos simulados
const products = [
    { id: 1, name: "Colchón Premium", price: 499, category: "colchones" },
    { id: 2, name: "Almohada Viscoelástica", price: 120, category: "almohadas" },
    { id: 3, name: "Colchón Compacto", price: 350, category: "colchones" },
    { id: 4, name: "Almohada Ergo XL", price: 150, category: "almohadas" },
    { id: 5, name: "Colchón King Size", price: 999, category: "colchones" },
    { id: 6, name: "Cubre Colchón", price: 45, category: "colchones" },
    { id: 7, name: "Colchón Premium", price: 499, category: "colchones" },
    { id: 8, name: "Almohada Viscoelástica", price: 120, category: "almohadas" },
    { id: 9, name: "Colchón Compacto", price: 350, category: "colchones" },
    { id: 10, name: "Almohada Ergo XL", price: 150, category: "almohadas" },
    { id: 11, name: "Colchón King Size", price: 999, category: "colchones" },
    { id: 12, name: "Cubre Colchón", price: 45, category: "colchones" }
];

// Mostrar productos
function renderProducts(filteredProducts) {
    productGrid.innerHTML = "";
    filteredProducts.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="/img/producto.png" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button class="btn-secondary add-to-cart" data-id="${product.id}">Añadir</button>
            </div>
        `;
    });
}

// Filtros
function applyFilters() {
    const minPrice = parseInt(priceMin.value, 10);
    const maxPrice = parseInt(priceMax.value, 10);
    const selectedCategories = Array.from(categoryFilters)
        .filter(filter => filter.checked)
        .map(filter => filter.value);

    const filteredProducts = products.filter(product => {
        return (
            product.price >= minPrice &&
            product.price <= maxPrice &&
            (selectedCategories.length === 0 || selectedCategories.includes(product.category))
        );
    });

    renderProducts(filteredProducts);
}

// Actualizar valores del rango de precios
priceMin.addEventListener('input', () => {
    priceMinValue.textContent = `$${priceMin.value}`;
    applyFilters();
});

priceMax.addEventListener('input', () => {
    priceMaxValue.textContent = `$${priceMax.value}`;
    applyFilters();
});

// Filtrar por categoría
categoryFilters.forEach(filter => {
    filter.addEventListener('change', applyFilters);
});

// Abrir y cerrar filtros
filtersToggle.addEventListener('click', () => {
    filtersMenu.classList.add('active');
    filtersToggle.style.display = 'none';
});

closeFilters.addEventListener('click', () => {
    filtersMenu.classList.remove('active');
    filtersToggle.style.display = 'block';
});

// Función para añadir al carrito y almacenar en localStorage
function addToCart(event) {
    event.preventDefault();

    const button = event.target;
    if (!button.classList.contains('add-to-cart')) return;

    const productCard = button.closest('.product-card');
    const productId = parseInt(button.dataset.id, 10);
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
    const productImage = productCard.querySelector('img').src;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(cart);
}

// Actualizar contador del carrito
function updateCartCount(cart) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Lógica del menú hamburguesa
menuIcon.addEventListener("click", () => {
    mainMenu.classList.toggle("active");
    menuIcon.classList.toggle("active");

    // Ocultar o mostrar el botón de filtros
    if (mainMenu.classList.contains("active")) {
        filtersToggle.style.display = "none"; // Ocultar botón filtros
    } else {
        filtersToggle.style.display = "block"; // Mostrar botón filtros
    }
});

// Inicialización
productGrid.addEventListener('click', addToCart);
renderProducts(products);
updateCartCount(JSON.parse(localStorage.getItem('cart')) || []);
