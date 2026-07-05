let libros =[{
    titulo:"padre rico, padre pobre",
    capitulos:10,
},
{
    titulo:"el principito",
    capitulos:20,
},
{
    titulo:"x",
    capitulos:200,
}];

localStorage.setItem("libros",JSON.stringify("libros"));

let recupeacionLibros = JSON.parse(localStorage.getItem("libros"));

recuperacionlibros.forEach(function(libros, indice){
    console.log("libros: "+libros[indice].titulo + " capitulos: "+ libros[indice].capitulos);
})