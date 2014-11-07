/**
 * Created by Adib Abud Jaso on 20/08/14.
 * Modified 06/11/14
 ++++Modelo para preguntas++++
 new Pregunta({texto:"PREGUNTA",
 opciones:[
 {opcion:"OPCION1", correcta:false},
 {opcion:"OPCION2", correcta:true},
 {opcion:"OPCION3", correcta:false}
 ]
 });
 */
function Pregunta(objetoConDatos) {
    this.datos = objetoConDatos;
    Pregunta.conjunto.push(this);
}
Pregunta.conjunto = [];//Aquí se almacenan las preguntas
new Pregunta({texto:"1. ‟Hace años registré mi divorcio, pero dejé el trámite sin terminar porque no me alcanzaba el dinero. ¿Ahora podría volverme a casar?”",
    opciones:[
        {opcion:"Sí puede porque se inició el divorcio y con eso es suficiente.", correcta:false},
        {opcion:"No se puede porque es necesario terminar el trámite.", correcta:true}
    ]
});
new Pregunta({texto:"2. “Desde hace siete años, no veo a mi esposa. ¿Estamos divorciados?”",
    opciones:[
        {opcion:"No, aunque no se vean por años, siguen casados.", correcta:true},
        {opcion:"Sí, al no verla, el divorcio se dio automáticamente.", correcta:false}
    ]
});
new Pregunta({texto:"3. “Vivo con mi pareja desde hace 10 años; no tuvimos otras relaciones en ese tiempo. Ahora nos queremos separar, ¿le puedo pedir una pensión?”",
    opciones:[
        {opcion:"Sí, al deshacer el concubinato hay obligaciones similares a un divorcio.", correcta:true},
        {opcion:"No, al deshacer el concubinato no existen obligaciones.", correcta:false}
    ]
});

var buenas = 0;
var pActual = 0;
var intento = 0;
var maxIntento = 1;
var bodyOriginal;

window.addEventListener("load", alCargar);
function alCargar(){
    bodyOriginal = document.body.innerHTML;
    iniciar();
    window.removeEventListener("load", alCargar);
}
function iniciar(){
    document.getElementById("botonContinuar").onclick = alApretarSiguiente;
    function alApretarSiguiente(){
        generarPregunta(pActual);
    }
}
function reiniciar(){
    buenas = 0;
    pActual = 0;
    intento = 0;
    document.body.innerHTML = bodyOriginal;
    iniciar();
}
function generarPregunta(numero){
    var actual = Pregunta.conjunto[numero].datos;

    var contenido = "<div class='preguntaTexto'>" + actual.texto + "</div><div class='opciones'>";

    for(var i=0; i<actual.opciones.length; i++){
        contenido = contenido.concat("<a class='opcion pure-button' id='op"+i+"' data-correcto='" + actual.opciones[i].correcta + "'><img class='palomita' style='display:none' src='css/palomita.png' /><img class='tache' style='display:none' src='css/tache.png' />"+actual.opciones[i].opcion+"</a>");
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
        var mensajeFinal = "";
        retroalimentar(mensajeFinal+"Obtuviste <b>"+buenas+"</b> de <b>"+Pregunta.conjunto.length+"</b>."+'<br /><input type="button" value="Otra vez" onClick="reiniciar()">');
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
