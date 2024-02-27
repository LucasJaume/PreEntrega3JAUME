const carrito = [];
const url = "js/prod.json";
let productos = [];

const contenedor = document.getElementById("contenedor");
const botonCarrito = document.querySelector("button#botonCuadrado");
const notificacion = document.querySelector("div#notificacion");

function retornarCardHtml({ imagen, nombre, precio, cantidad, id } = producto) {
    return `<div class="card"> 
    <div><img src="${imagen}" alt="${nombre}"></div>
                <div class="card-title"><p>${nombre}</p></div>
                <div class="card-price"><p>$ ${precio}</p></div>
                <div class="card-price"><p>${cantidad}</p></div>
                <button id="${id}" class="button button-outline button-add" title="Pulsa para comprar">COMPRAR</button>
            </div>`;
}

function retornarCardError() {
    return `<div class="card-error">
                <h2>🔌</h2>
                <h3>No se han podido listar los productos</h3>
                <h4>Intenta nuevamente en unos instantes...</h4>
            </div>`;
}

function obtenerProd() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            productos = data;
            cargarProductos(productos);
            activarBotonComprar();
        })
        .catch((error) => console.error("Error al obtener productos:", error));
}

function cargarProductos(array) {
    array.length > 0 ? array.forEach((producto) => { contenedor.innerHTML += retornarCardHtml(producto); })
        : contenedor.innerHTML = retornarCardError();
}

obtenerProd();

function activarBotonComprar() {
    const btnComprar = document.querySelectorAll("button.button-add");
    for (let boton of btnComprar) {
        boton.addEventListener("click", () => {
            const productoSeleccionado = productos.find((producto) => producto.id === parseInt(boton.id));

            // Verificar si el producto ya está en el carrito
            const productoEnCarrito = carrito.find((productoCarrito) => productoCarrito.id === productoSeleccionado.id);

            if (productoEnCarrito) {
                // Si el producto ya está en el carrito, incrementar la cantidad
                productoEnCarrito.cantidad++;
            } else {
                // Si el producto no está en el carrito, agregarlo
                productoSeleccionado.cantidad = 1; // Establece la cantidad inicial
                carrito.push(productoSeleccionado);
            }

            localStorage.setItem("miCarrito", JSON.stringify(carrito));

            Swal.fire({
                icon: "success",
                title: "Producto agregado al carrito!",
                showConfirmButton: false,
                timer: 1500
            });
        });
    }
}

botonCarrito.addEventListener("mousemove", () => {
    botonCarrito.title = carrito.length > 0
        ? "Hay " + carrito.length + " productos en el carrito!"
        : "";
});

botonCarrito.addEventListener("click", () =>
    carrito.length > 0
        ? location.href = "compra.html"
        : (
            notificacion.innerHTML = mostrarAlerta(),
            notificacion.style.right = "10px",
            notificacion.style.display = "block",
            setTimeout(() => notificacion.style.display = "none", 3000)
        )
);

function mostrarAlerta() {
    return `<div class="alert alert-warning" role="alert">
                No hay productos en el carrito!
            </div>`;
}