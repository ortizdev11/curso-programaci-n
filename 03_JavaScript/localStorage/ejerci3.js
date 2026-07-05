let tareas = [

    {
        titulo:"Estudiar",
        completada:false
    },

    {
        titulo:"Dormir",
        completada:true
    }

];
localStorage.setItem("tareas",JSON.stringify(tareas));
let tareasRecuperados = JSON.parse(localStorage.getItem("tareas"));
tareasRecuperados.forEach(function(tareas,indice){
    console.log(tareas[indice].titulo);
    console.log(tareas[indice].completada);
});