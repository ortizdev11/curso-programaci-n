let tareas = [

    {
        titulo:"Estudiar",
        completada:false
    },

    {
        titulo:"Comer",
        completada:true
    },

    {
        titulo:"Dormir",
        completada:false
    }

];

tareas[2].completada = true;
tareas.splice(1,1);
tareas.forEach(function(tarea){
    console.log(tarea.titulo);
    console.log(tarea.completada);
});