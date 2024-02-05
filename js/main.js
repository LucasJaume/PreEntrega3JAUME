/*
Variables/constantes
Interacciones (Prompt, Alert, Confirm, Console)
1 ciclo de interacion y un condicional
*/
/*PRE ENTREGA 1
let precioZion=1500000
let precioSlp=350000
let precioNordic=250000
let precioTopmega=560000


function mostrarPrecio(entrada) {
    switch (entrada) {
        case 1:
            alert("El precio de la bicicleta Zion es: "+precioZion)
            break;
        case 2:
            alert("El precio de la bicicleta SLP es: "+precioSlp)
            break;
        case 3:
            alert("El precio de la bicicleta Nordic es: "+precioNordic)
            break;
        case 4:
            alert("El precio de la bicicleta TopMega es: "+precioTopmega)
            break;
        default:
            alert("El producto ingreasado es incorrecto, reingrese un valor valido.")
            break;
    }
}


//si paga al contado hay un descuento del 20%

let descuento=0
let precioContado=0
function mostrarPrecioContado(entrada) {
    switch (entrada) {
        case 1:
            descuento=precioZion*0.20
            precioContado=precioZion-descuento
            alert("El precio al contado, con 20% de descuento es: "+precioContado)
            break;
        case 2:
            descuento=precioSlp*0.20
            precioContado=precioSlp-descuento
            alert("El precio al contado, con 20% de descuento es: "+precioContado)
            break;
        case 3:
            descuento=precioNordic*0.20
            precioContado=precioNordic-descuento
            alert("El precio al contado, con 20% de descuento es: "+precioContado)
            break;
        case 4:
            descuento=precioTopmega*0.20
            precioContado=precioTopmega-descuento
            alert("El precio al contado, con 20% de descuento es: "+precioContado)
            break;
        default:
            alert("El producto ingreasado es incorrecto, reingrese un valor valido.")
            break;
    }
}

function mostrarCuotas(){
    console.log("Podes pagar en ")
    for (let a=3; a<=12; a=a+3) {
        console.log(a+" cuotas sin interes!")
    }

}

function consultarBicicleta() {
    let codigoBici=prompt("Ingrese un codigo de bicicleta para ver su informacion!")
    if (codigoBici!=null && codigoBici!="") {
        mostrarPrecio(parseInt(codigoBici))
        mostrarPrecioContado(parseInt(codigoBici))
        mostrarCuotas(codigoBici)
    }else{
        console.warn("Codigo de bicicleta incorrecto. Porfavor ingrese uno que sea correcto.")
    }
    */

//PRE-ENTREGA 2

/*function buscarProducto(productoABuscar) {
    if(productoABuscar!="") {
        let encontrado=productos.find((producto)=>producto.nombre===productoABuscar.toUpperCase())
        if (encontrado!==undefined) {
            return encontrado
        }else{
            console.log("No se encontro coincidencia")
        }
    }
}

function comprar() {
    let nombreProducto=prompt("Ingresa el nombre completo del producto que quiera comprar: ")
    let productoElegido=buscarProducto(nombreProducto)
    if (productoElegido===undefined) {
        alert("Error en el nombre del producto, intente con un nombre correcto!")}else{
            carrito.push(productoElegido)
            alert(productoElegido.nombre+" fue agregada al carrito!")
            let consulta=confirm("Quieres elegir otro producto?")
            if (consulta) {
                comprar()
            }else{
                console.table("Su carrito: ",carrito)
                const compraFinal=new Compra(carrito)
                console.log("El total de su compra es: $",compraFinal.obtenerSubtotal())
            }
        }
}*/

//PRE ENTREGA 3
const carrito=[]
const productos=[{id:1, imagen:'🚲', nombre:"BICICLETA ZION", precio:750000},
{id:2, imagen:'🚲', nombre:"BICICLETA SLP", precio:350000},
{id:3, imagen:'🚲', nombre:"BICICLETA NORDIC", precio:250000},
{id:4, imagen:'🚲', nombre:"BICICLETA TOPMEGA", precio:560000},
{id:5, imagen:'🧴', nombre:"CARAMAÑOLA", precio:35000},
{id:6, imagen:'🪑', nombre:"ASIENTO DE BICICLETA", precio:125000},
{id:7, imagen:'⛑', nombre:"CASCO", precio:110000}]

const contenedor=document.getElementById("contenedor")
const botonCarrito=document.querySelector("img#carrito")
const notificacion=document.querySelector("div#notificacion")

function retornarCardHtml(producto) {
    return `<div class="card"> 
                <div><h1>${producto.imagen}</h1></div>
                <div class="card-title"><p>${producto.nombre}</p></div>
                <div class="card-price"><p>$ ${producto.precio}</p></div>
                <button id="${producto.id}" class="button button-outline button-add" title="Pulsa para comprar">COMPRAR</button>
            </div>`
}

function retornarCardError(){
    return `<div class="card-error">
                <h2>🔌</h2>
                <h3>No se han podido listar los productos</h3>
                <h4>Intenta nuevamente en unos instantes...</h4>
            </div>`
}

function cargarProductos(array){
if(array.length>0){
    array.forEach((producto) => {
        contenedor.innerHTML+=retornarCardHtml(producto)
    })
}else{
    contenedor.innerHTML=retornarCardError()
}
}

cargarProductos(productos) //cargo las cards con los productos disponibles en el array

function activarBotonComprar(){
    const btnComprar=document.querySelectorAll("button.button-add")
    for (let boton of btnComprar){
        boton.addEventListener("click", ()=>{
            const productoSeleccionado = productos.find((producto)=> producto.id === parseInt(boton.id))
            carrito.push(productoSeleccionado)
            localStorage.setItem("miCarrito", JSON.stringify(carrito))
            // console.table(carrito)
        })
    }
}
activarBotonComprar()

botonCarrito.addEventListener("mousemove", ()=>{
    if (carrito.length>0) {
        botonCarrito.title= "Hay "+carrito.length+" productos en el carrito!"
    }else{
        
    }
})

botonCarrito.addEventListener("click", () => {
    if (carrito.length > 0) {
        location.href = "compra.html";
    } else {
        notificacion.innerHTML = mostrarAlerta();
        notificacion.style.right = "10px"; // Ajusta la posición a la derecha de la pantalla
        notificacion.style.display = "block";

        setTimeout(() => {
            notificacion.style.display = "none";
        }, 3000);
    }
})

function mostrarAlerta() {
    return  `<div class="alert alert-warning" role="alert">
                No hay productos en el carrito!
            </div>`
}



