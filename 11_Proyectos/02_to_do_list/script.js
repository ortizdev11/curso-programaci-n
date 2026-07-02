//------------------Variables--------------------------

const listado = document.getElementById("lista");
const texto = document.getElementById("cuadroDeTexto");
const formu = document.getElementById("formulario");
const luna = document.getElementById("lunaCambio");//aqui se busca el id para si tocar el logo se activa el modo oscuro y si vulve a tocar se desactiva.
const ContadorTareas = document.getElementById("tareas"); 
const contadorCompleta = document.getElementById("tareaCompletas");
const contadorPendiente = document.getElementById("tareaspendiente");
let modoOscuro = false;
let completas = 0;
let pendiente = 0;
let tareas = 0;

//------------------Funciones---------------------------

function cambiarModoDePantalla(){
    //aqui si el modoOscuro es false por el ! se cambia a true o viceversa.
    modoOscuro = !modoOscuro;
    
    const body = document.querySelector("body");
    const cuadroTexo = document.getElementById("dividorCampo");
    
    //con toggle si el modoOscuro es true se pone la etiqueta dark encarga de la magia modo oscuro.
    body.classList.toggle("dark", modoOscuro);
    listado.classList.toggle("dark", modoOscuro);
    cuadroTexo.classList.toggle("dark", modoOscuro);
    //IMPORTANTE:!con una class="dark": se pone modo negro y sin esa class modo claro¡
};

function actualizarContadorCompletas(){
    if(completas > 0){
        completas -=1;
        contadorCompleta.textContent = "Completas: "+completas;
    }
};

function actualizarContadorPendiente(){
    if(pendiente > 0){
            pendiente -= 1;
            contadorPendiente.textContent = "Pendiente: "+pendiente;
    };
};

function verficadoCompletado(p){
    p.classList.toggle("listaCompletada");
    if(p.classList.contains("listaCompletada")){
        p.textContent = "Completada";
        completas++;

        contadorCompleta.textContent = "Completas: "+completas;
        actualizarContadorPendiente();
    }else{
        p.textContent = "Pendiente";
        pendiente++;
        
        contadorPendiente.textContent = "Pendiente: "+pendiente;
        actualizarContadorCompletas();
    };
};

function eliminarTareas(p){
    tareas -= 1;
    ContadorTareas.textContent = "tareas: "+tareas;
    if(p.textContent === "Completada" ){
        actualizarContadorCompletas();
    }else{
        actualizarContadorPendiente();
    };
};

function agregarLista(){
    if(texto.value.trim() !== ""){
        //se crean las variables que crean lo de  de la lista 
        const li = document.createElement("li");
        const parrafo = document.createElement("p");
        const text = document.createElement("span");
        const div = document.createElement("div");
        const botonCompletado = document.createElement("button");
        const eliminarBoton = document.createElement("button")

        //se le pone el texto a las variables 
        parrafo.textContent = "Pendiente";
        text.textContent = texto.value;
        botonCompletado.textContent = "✔️";
        eliminarBoton.textContent = "❌";
        
        //se le pone class para poner estilos
        div.classList.add("containerDeBotones");
        botonCompletado.classList.add("botonesDelContainer");
        eliminarBoton.classList.add("botonesDelContainer");

        //se agrupa todo lo anterior creado a la lista
        tareas ++;
        pendiente ++;
        contadorPendiente.textContent = "Pendiente: "+ pendiente;
        ContadorTareas.textContent = "tareas: "+tareas;
        listado.appendChild(li);
        li.appendChild(parrafo);
        li.appendChild(text);
        li.appendChild(div);
        div.appendChild(botonCompletado);
        div.appendChild(eliminarBoton);

        //se  crea un evento para cambiar de pendiente a completado
        botonCompletado.addEventListener("click",()=>{
            verficadoCompletado(parrafo);
        });

        //se crea un evento para eliminar la lista
        eliminarBoton.addEventListener("click",()=>{
            eliminarTareas(parrafo);
            li.remove();
        });
    };
};

//------------------Eventos------------------------

formu.addEventListener("submit", (e) =>{
    // se crea lo que hace que se actualize la web y se mantenga lo lista y no se elimine 
    e.preventDefault();
    if(texto.value.trim() !== ""){
        agregarLista();
    }else{
        alert("no has agregado nada al campo de texto");
    };
    texto.value = "";
});

luna.addEventListener("click", () =>{
    //IMPORTANTE:!aqui ni se necesita el e.preventDefault(), porque esto no actualiza la web sino agrega un class que modifica los colores¡
    cambiarModoDePantalla();
});