
//PRE ENTREGA 3
const carrito=[]
const productos=[
{id:1, imagen:'./img/biciletaZionStrix.jpeg', nombre:"BICICLETA ZION", precio:750000},
{id:2, imagen:'./img/biciletaSlpPro.jpg', nombre:"BICICLETA SLP", precio:350000},
{id:3, imagen:'./img/nordicc.jpg', nombre:"BICICLETA NORDIC", precio:250000},
{id:4, imagen:'./img/TOP_MEGA_SUNSHINE.png', nombre:"BICICLETA TOPMEGA", precio:560000},
{id:5, imagen:'./img/caramanolaa.jpg', nombre:"CARAMAÑOLA", precio:35000},
{id:6, imagen:'./img/asiento.jpg', nombre:"ASIENTO DE BICICLETA", precio:125000},
{id:7, imagen:'./img/casco.jpg', nombre:"CASCO", precio:110000}]

const contenedor=document.getElementById("contenedor")
const botonCarrito=document.querySelector("img#carrito")
const notificacion=document.querySelector("div#notificacion")

function retornarCardHtml({imagen, nombre, precio, id}=producto) {
    return `<div class="card"> 
    <div><img src="${imagen}" alt="${nombre}"></div>
                <div class="card-title"><p>${nombre}</p></div>
                <div class="card-price"><p>$ ${precio}</p></div>
                <button id="${id}" class="button button-outline button-add" title="Pulsa para comprar">COMPRAR</button>
            </div>`
}

function retornarCardError(){
    return `<div class="card-error">
                <h2>🔌</h2>
                <h3>No se han podido listar los productos</h3>
                <h4>Intenta nuevamente en unos instantes...</h4>
            </div>`
}

function cargarProductos(array) {
    array.length > 0 ? array.forEach((producto) => { contenedor.innerHTML += retornarCardHtml(producto); }) 
                    : contenedor.innerHTML = retornarCardError();
}



cargarProductos(productos) //cargo las cards con los productos disponibles en el array

function activarBotonComprar(){
    const btnComprar=document.querySelectorAll("button.button-add")
    for (let boton of btnComprar){
        boton.addEventListener("click", ()=>{
            const productoSeleccionado = productos.find((producto)=> producto.id === parseInt(boton.id))
            carrito.push(productoSeleccionado)
            localStorage.setItem("miCarrito", JSON.stringify(carrito))
            Swal.fire({
                icon: "success",
                title: "Producto agregado al carrito!",
                showConfirmButton: false,
                timer: 1500
              });
            // console.table(carrito)
        })
    }
}
activarBotonComprar()

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
    return  `<div class="alert alert-warning" role="alert">
                No hay productos en el carrito!
            </div>`
}



