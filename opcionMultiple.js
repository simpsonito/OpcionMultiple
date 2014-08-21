/**
 * Created by adib on 20/08/14.

 ++++Modelo para preguntas++++
 var pregunta1 = {texto:"PREGUNTA",
 opciones:[
 {opcion:"OPCION1", correcta:false},
 {opcion:"OPCION2", correcta:true},
 {opcion:"OPCION3", correcta:false}
 ]
 };
 */
function Pregunta(objetoConDatos) {
    this.datos = objetoConDatos;
    Pregunta.conjunto.push(this);
}
Pregunta.conjunto = [];
    
new Pregunta({texto:"¿Cuáles son las cuatro preguntas fundamentales en un proceso de Due dilligence?",
    opciones:[
        {opcion:"¿Dónde están las sinergias?,¿Dónde hay esqueletos ocultos?, ¿Cuánto dinero se repartirá entre los vendedores? y ¿Para quién será la empresa?", correcta:false},
        {opcion:"Qué estamos comprando realmente? Cuál es el valor aislado de la empresa objetivo? Dónde están las sinergias y dónde hay esqueletos ocultos? y Cuál es nuestro precio de retirada?", correcta:true},
        {opcion:"¿Dónde está ubicada la empresa? ¿Quiénes son los dueños? ¿Cuánto dinero se repartirá entre los vendedores?", correcta:false}
    ]
});
new Pregunta({texto:"¿Por qué Tarzán no lleva barba?",
    opciones:[
        {opcion:"OPCION1", correcta:false},
        {opcion:"OPCION2", correcta:true},
        {opcion:"OPCION3", correcta:false}
    ]
});
new Pregunta({texto:"PREGUNTA3",
    opciones:[
        {opcion:"OPCION1", correcta:false},
        {opcion:"OPCION2", correcta:true},
        {opcion:"OPCION3", correcta:false}
    ]
});
new Pregunta({texto:"PREGUNTA4",
    opciones:[
        {opcion:"OPCION1", correcta:false},
        {opcion:"OPCION2", correcta:true},
        {opcion:"OPCION3", correcta:false}
    ]
});
new Pregunta({texto:"PREGUNTA5",
    opciones:[
        {opcion:"OPCION1", correcta:false},
        {opcion:"OPCION2", correcta:true},
        {opcion:"OPCION3", correcta:false}
    ]
});
var buenas = 0;
var pActual = 0;
var intento = 0;
var maxIntento = 2;
var bodyOriginal;

function alCargar(){
    //alert("cargado");
    //setClicBotones();
    bodyOriginal = document.body.innerHTML;
}
function reiniciar(){
    buenas = 0;
    pActual = 0;
    intento = 0;
    document.body.innerHTML = bodyOriginal;
}
function generarPregunta(numero){
    var actual = Pregunta.conjunto[numero].datos;

    var contenido = "<div class='preguntaTexto'>" + actual.texto + "</div><div class='opciones'>";

    for(var i=0; i<actual.opciones.length; i++){
        contenido = contenido.concat("<a class='opcion pure-button' id='op"+i+"' data-correcto='" + actual.opciones[i].correcta + "'><img class='palomita' style='display:none' src='palomita.png' /><img class='tache' style='display:none' src='tache.png' />"+actual.opciones[i].opcion+"</a>");
    }
    contenido = contenido.concat("</div>");
    document.getElementById("setPregunta").innerHTML = contenido;

    setClicBotones();

    pActual++;
    document.getElementById("botonContinuar").style.display = "none";
}


function setClicBotones(){
    var oList = document.getElementById("setPregunta").getElementsByTagName("a");
    for(var i=0; i<oList.length; i++){
        var objeto = oList[i];
        //mensajear(objeto.className);
        if (objeto.className.indexOf("opcion") == 0){
            hacerOpcion(objeto);
        }
    }
}
function desactivarBotones(){
    var oList = document.getElementById("setPregunta").getElementsByTagName("a");
    for(var i=0; i<oList.length; i++){
        var objeto = oList[i];
        //mensajear(objeto.className);
        if (objeto.className.indexOf("opcion") == 0){
            deshacerOpcion(objeto);
        }
    }
    intento = 0;
    if(pActual < Pregunta.conjunto.length){
        document.getElementById("botonContinuar").style.display = "";
        document.getElementById("botonContinuar").value = "Siguiente";
    } else {//Si ya no hay más preguntas.
        var mensajeFinal;
        switch (buenas) {
            case 5:
                mensajeFinal = "Felicidades, has logrado una comprensión integral de los temas.";
                break;
            case 4:
            case 3:
                mensajeFinal = "Tienes un buen manejo de los temas, pero aún puedes mejorar.";
                break;
            case 2:
            case 1:
                mensajeFinal = "Manejas algunos aspectos importantes, pero es necesario fortalecer el estudio de los temas.";
                break;
            default://Cualquier otro (5 ó menos)
                mensajeFinal = "Revisa nuevamente los contenidos de la unidad.";
        }
        retroalimentar(mensajeFinal+"<br/>Obtuviste <b>"+buenas+"</b> de <b>"+Pregunta.conjunto.length+"</b>."+'<br /><input type="button" value="Otra vez" onClick="reiniciar()">');
    }
}

function hacerOpcion(boton){
    boton.onclick = function(){
        //mensajear(this.id +" - " + this.id.substr(this.id.length - 1) + " - " + this.getAttribute("data-correcto"));
        if(this.getAttribute("data-correcto") == "true"){
            //mensajear("sí");
            this.getElementsByClassName('palomita').item(0).style.display = "";
            buenas++;
            desactivarBotones();
        } else {
            this.getElementsByClassName('tache').item(0).style.display = "";
            intento++;
            deshacerOpcion(this);
            if(intento >= maxIntento){
                desactivarBotones();
            }
        }
    };
    boton.className = 'opcion pure-button';
}
function deshacerOpcion(boton){
    boton.onclick = null;
    //console.log("clase antes: "+boton.class);
    boton.className = 'opcion pure-button pure-button-disabled';
    //console.log("clase boton: "+boton.class);
}


function shuffle(array) {
    var currentIndex = array.length
        , temporaryValue
        , randomIndex
        ;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function retroalimentar(cadena){
    document.getElementById("retroalimentacion").innerHTML = cadena;
}


function mensajear(cadena){
    /*
     var actualCadena = document.getElementById("mensajes").innerHTML;
     var nuevaCadena = cadena + "<br />" + actualCadena;
     document.getElementById("mensajes").innerHTML = nuevaCadena;
     */
}