//se crea la variable más importante de la web cuya se guardara todo en el localStorage
let tareas = [];

//------------------Variables--------------------------

const body = document.querySelector("body");
const listados = document.getElementById("listado");
const texto = document.getElementById("cuadroDeTexto");
const formulario = document.getElementById("formulario");
const eliminarTodo = document.getElementById("eliminartodo");
const luna = document.getElementById("lunaCambio");//aqui se busca el id para si tocar el logo se activa el modo oscuro y si vulve a tocar se desactiva.
const cuadroTexto = document.getElementById("dividorCampo");

//------------------Variables boleanas--------------------------

let modoOscuro = false;
let editado = false;
let indiceEdita = null;
let ventanaAdvertencia = false;

//------------------Funciones---------------------------

//aquí solo se cambia cuando toca la luna y modo Oscuro si esta en oscuro pasa a claro
function cambiarModoDePantalla(){
    //aqui si el modoOscuro es false por el ! se cambia a true o viceversa.
    modoOscuro = !modoOscuro;
    
    //con toggle si el modoOscuro es true se pone la etiqueta dark encarga de la magia modo oscuro.
    body.classList.toggle("dark", modoOscuro);
    listados.classList.toggle("dark", modoOscuro);
    cuadroTexto.classList.toggle("dark", modoOscuro);
    //IMPORTANTE:!con una class="dark": se pone modo negro y sin esa class modo claro¡
    localStorage.setItem("modoOscuro", modoOscuro);
};

function guardarLocalStorage(){
    localStorage.setItem("tareas", JSON.stringify(tareas));
};

//se crea la función que hace que el modo se quede siempre 
function recargarModoOscuro(){
    let recuperaModo = JSON.parse(localStorage.getItem("modoOscuro"));
    if(recuperaModo){

        modoOscuro = recuperaModo;//aqui se establece el modo por true 
    
        body.classList.add("dark");
        listados.classList.add("dark");
        cuadroTexto.classList.add("dark");
    };
};

function guardarLista(){
    tareas.push({
        titulo: texto.value,
        completada : false
    });
    
    guardarLocalStorage();
};

function actualizadorDeContadores(){
    const tarea = document.getElementById("tareaCantidad");
    const pendiente = document.getElementById("pendiente");
    const completa = document.getElementById("completa");
    const porcentaje = document.getElementById("porcentaje");
    let totalCompleta = 0;
    let porcentajeCompleta = 0;

    tareas.forEach(function(tarea){
        if(tarea.completada){
            totalCompleta ++;
        }
    });

    let totalPendiente = tareas.length - totalCompleta;
    if(tareas.length !== 0){
        porcentajeCompleta = (totalCompleta / tareas.length)* 100;
    }

    tarea.textContent = "Tareas:  " + tareas.length;
    completa.textContent = "Completadas:  "+ totalCompleta;
    pendiente.textContent = "Pendientes:  "+ totalPendiente;
    porcentaje.textContent = Math.round(porcentajeCompleta)+ "%" + " Completadas";//marh.round es la que hace que el numero decimla se reode
};

function comprobarCompletada(tarea,textPendiente){
    if(tarea.completada){
        textPendiente.textContent = "Completado";
        textPendiente.classList.add("listaCompletada");
    }else{
        textPendiente.textContent = "Pendiente"
    }
};

function completarTareas(tarea,textPendiente){
    if(!tarea.completada){
        tarea.completada = true ;
                
        textPendiente.textContent = "Completado";

        textPendiente.classList.add("listaCompletada");//agrega class
    
        guardarLocalStorage();
    }else{
        tarea.completada = false;

        textPendiente.textContent = "Pendiente";

        textPendiente.classList.remove("listaCompletada");//la elimina

        guardarLocalStorage();
    };
    actualizadorDeContadores();    
};

//elimina solo una lista dependiendo del indice 
function botonEliminaruno(indice){
    tareas.splice(indice, 1);
    guardarLocalStorage();
    recargarListado();
};

//edita la lista y halla lo que tiene la lista segun el indice
function editador( indice){
    if(texto.value !== ""){
        tareas[indice].titulo = texto.value;
        guardarLocalStorage();
    }
};

//esta es la que crea el li 
function creaUnaLista(tarea, indice){
    const textPendiente = document.createElement("p");//aqui se crea un parrafo para creadorDeLista
    const botonCompletada = document.createElement("button");
    const botonEditar = document.createElement("button");       
    const botonEliminar = document.createElement("button");
    const li = document.createElement("li");
    const spanTexto = document.createElement("span");
    const containerDeBotones = document.createElement("div");
        

    spanTexto.textContent = tarea.titulo;
    comprobarCompletada(tarea, textPendiente);
    botonCompletada.textContent ="✅";
    botonEditar.textContent = "✏️";
    botonEliminar.textContent = "❌";

    li.classList.add("lista");

    setTimeout(() =>{
        li.classList.add("visible");
    }, 20);//esto le va el poner de que ponerle otra class pues 20s y se anima la li al crear

    li.appendChild(spanTexto);
    li.appendChild(textPendiente);
    li.appendChild(containerDeBotones);
    containerDeBotones.appendChild(botonCompletada);
    containerDeBotones.appendChild(botonEditar);
    containerDeBotones.appendChild(botonEliminar);
    listados.appendChild(li);

    containerDeBotones.classList.add("containerDeBotones");
        
    botonCompletada.addEventListener("click",() =>{
        completarTareas(tarea,textPendiente);
    });
        
    botonEliminar.addEventListener("click",()=>{
        botonEliminaruno(indice);
    });

    botonEditar.addEventListener("click", () =>{
        editado = true;
        indiceEdita = indice;
        texto.value = tarea.titulo;
    });
};

//esta crea todas las li que hay en tareas que es la encargada de todo
function mostrarTareas(){
    tareas.forEach(function(tarea,indice){
        creaUnaLista(tarea,indice);
    });
};

//esta funcion  elimina todo los li para luego volverlas a crear
function recargarListado(){
    listados.textContent = "";  
    let recuperacionTareas = JSON.parse(localStorage.getItem("tareas"));
    
    if(recuperacionTareas !== null){
        tareas = recuperacionTareas;
        mostrarTareas();        
    }else{
        const ListaAlerta = document.createElement("li");
        const textAlerta = document.createElement("span");

        textAlerta.textContent = "no se ha guarda ninguna lista..."
        
        ListaAlerta.appendChild(textAlerta);
        listados.appendChild(ListaAlerta);
    };

    actualizadorDeContadores();
};

//esta es la funcion del boron que elimin TODO los li
function eliminarTodaLista(){
    const divAlert = document.createElement("div");
    const textoAviso = document.createElement("p");
    const containerBotonAviso = document.createElement("div");
    const botonSi = document.createElement("button");
    const botonNo = document.createElement("button");

    textoAviso.textContent = "¿Estás seguro de que deseas eliminar todas las tareas?";
    botonSi.textContent = "Si";
    botonNo.textContent = "No";
    
    divAlert.classList.add("avisoEliminar");
    botonSi.classList.add("botonSi");
    botonNo.classList.add("botonNo");
    containerBotonAviso.classList.add("containerAviso");

    setTimeout(() =>{
        divAlert.classList.add("visible");
    }, 20);//se hace lo mismo que en cuando se crea una sola li pero esta vez solo para una advertencia

    divAlert.appendChild(textoAviso);
    containerBotonAviso.appendChild(botonSi);
    containerBotonAviso.appendChild(botonNo);
    divAlert.appendChild(containerBotonAviso);
    document.body.appendChild(divAlert);
     
    botonSi.addEventListener("click", () =>{
        ventanaAdvertencia = false;
        divAlert.remove(); 
        tareas.splice(0,tareas.length);
        guardarLocalStorage();
        recargarListado();
    });

    botonNo.addEventListener("click", () =>{
        ventanaAdvertencia = false;
        divAlert.remove();
    });
}

//------------------Eventos------------------------
//conmienza la web y se recarga poniendo todo las li que hay y el modo guardado
recargarListado();
recargarModoOscuro();

//este es submit encargado de crear una lista y editar una lista 
formulario.addEventListener("submit", (e) =>{
    // se crea lo que hace que se actualize la web y se mantenga lo lista y no se elimine 
    e.preventDefault();
    if(texto.value.trim() !== ""){
        if(editado === true){//esto inpide que el usuario se ponga a tocar mucho el boton de editar y se haga muchos 
            editador(indiceEdita);
            
            editado = false;
            indiceEdita = null;

            recargarListado();
        }else{
           guardarLista();

           const ultimoIndice = tareas.length - 1;
           const ultimaLista = tareas[ultimoIndice];

           creaUnaLista(ultimaLista, ultimoIndice);
           actualizadorDeContadores();
        }       
    }else{
        alert("no has agregado nada al campo de texto");
    };
    texto.value = "";
});

//aqui se detecta cuando toca el boton elimine todo los li si hay
eliminarTodo.addEventListener("click", () =>{
    if (!ventanaAdvertencia){
        eliminarTodaLista();
    };
    ventanaAdvertencia = true;//impide que se creen muchas ventanas
});

//aqui detecta cuando tocan la luna y camdie el modo
luna.addEventListener("click", () =>{
    //IMPORTANTE:!aqui ni se necesita el e.preventDefault(), porque esto no actualiza la web sino agrega un class que modifica los colores¡
    cambiarModoDePantalla();
});