let productos = [
    {producto:"pan", precio:200},
    {producto:"leche", precio:150},
    {producto:"huevos", precio:100}
];

productos.forEach(function(product){
    console.log("producto: " +product.producto);
    console.log("precio: " +product.precio);
})