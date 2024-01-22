class Compra{
    constructor(carritodecompras){
        this.carrito=carritodecompras
    }

    obtenerSubtotal(){
        if (this.carrito.length>0) {
            return this.carrito.reduce((acumulador, producto)=>acumulador=acumulador+producto.precio,0)
        }
    }
}