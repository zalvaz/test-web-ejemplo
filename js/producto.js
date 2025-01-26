// Clase Producto
class Producto {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre; // Nombre del producto
        this.precio = precio; // Precio del producto
        this.imagen = imagen; // URL de la imagen del producto
    }

    // Método para renderizar el producto como HTML
    render() {
        return `
            <div class="product-card">
                <img src="${this.imagen}" alt="${this.nombre}">
                <h3>${this.nombre}</h3>
                <p class="price">$${this.precio}</p>
                <a href="#" class="btn-secondary">Añadir al carrito</a>
            </div>
        `;
    }
}

// Crear productos de ejemplo
const productos = [
    new Producto("Colchón Premium", 499, "img/product1.jpg"),
    new Producto("Almohada Ergonómica", 99, "img/product2.jpg"),
    new Producto("Base de Cama", 299, "img/product3.jpg"),
];

// Exportamos los productos para que puedan usarse en otros archivos
export { productos };

// Variables globales
let cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Productos existentes en el carrito

// Función para añadir productos al carrito
function addToCart(event) {
    event.preventDefault(); // Prevenir comportamiento predeterminado

    // Obtener la información del producto
    const button = event.target;
    const productCard = button.closest('.product-card');
    const product = {
        id: button.getAttribute('data-id'),
        name: productCard.querySelector('h3').textContent,
        price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
        image: productCard.querySelector('img').src,
        quantity: 1,
    };

    // Buscar si el producto ya existe en el carrito
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++; // Incrementar cantidad si ya existe
    } else {
        cartItems.push(product); // Agregar producto nuevo
    }

    // Actualizar localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Actualizar el contador visual del carrito
    updateCartCount();
}

// Inicializar los botones de "Añadir al carrito"
document.addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart')) {
        addToCart(e); // Llamar a la función de añadir al carrito
    }
});

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.parentElement.classList.add('show');
    } else {
        cartCount.parentElement.classList.remove('show');
    }
}

// Inicializar el contador al cargar la página
updateCartCount();
