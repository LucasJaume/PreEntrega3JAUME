function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito"))
}
const carritoNuevo=recuperarCarrito()

if(carritoNuevo){
    carritoNuevo.forEach((producto)=>{
        console.log(producto)
    })
}