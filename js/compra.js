const tablebody=document.querySelector("tbody")
const totalPrecioElement = document.getElementById("total-precio");

function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito"))
}
const carritoNuevo=recuperarCarrito() 

function armarFilaHtml(producto){
    return`<tr>
                <td>${producto.imagen}</td>
                <td>${producto.nombre}</td>
                <td>$ ${producto.precio}</td>
                <td data-eliminar="" class="boton-Eliminar">x</td>
            </tr>`
}

function mostrarCarrito() {
    tablebody.innerHTML = "";
    let totalPrecio = 0;

    carritoNuevo.forEach((producto) => {
        tablebody.innerHTML += armarFilaHtml(producto);
        totalPrecio += producto.precio;
    });

    // Mostrar el total en el pie de la tabla
    totalPrecioElement.textContent = `$ ${totalPrecio.toFixed(2)}`;
}

mostrarCarrito();
const btnComprar = document.querySelector("button#boton-comprar");

btnComprar.addEventListener("click", () => {
    if (carritoNuevo.length > 0) {
        Swal.fire({
            icon: "success",
            title: "La compra fue realizada con éxito!",
            showConfirmButton: false,
            timer: 1500
        });

        // Redireccionar a index.html después del tiempo de espera
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    }
})
