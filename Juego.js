//Enlazar canvas en 2d
var canvas = document.getElementById('juego'); 
var ctx = canvas.getContext('2d');
var fondo;
var teclado = {};

//Crear el personaje
var personaje = {
    x: 20,
    y: 20,
    width: 20,
    height: 20
}
function dibujarPersonaje(){
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.fillRect(personaje.x, personaje.y, personaje.width, personaje.height);
    ctx.restore
}
//crear el laberinto
var muroHorizontal = {
    x: 20,
    y: 50,
    width: 190,
    height: 10
}
var muroVertical = {
    x: 20,
    y: 50,
    width: 10,
    height: 320
}
var muroHorizontal1 = {
    x: 20,
    y: 360,
    width: 350,
    height: 10
}
var muroVertical1 = {
    x: 360,
    y: 50,
    width: 10,
    height: 320
}
var cuadrado = {
    x: 50,
    y: 80,
    width: 60,
    height: 60
}
var cuadrado1 = {
    x: 150,
    y: 160,
    width: 80,
    height: 80
}
var cuadrado2 = {
    x: 260,
    y: 260,
    width: 60,
    height: 60
}
function crearLaberinto(){
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillRect(muroHorizontal.x, muroHorizontal.y, muroHorizontal.width, muroHorizontal.height);
    ctx.fillRect(muroVertical.x, muroVertical.y, muroVertical.width, muroVertical.height);
    ctx.fillRect(muroHorizontal1.x, muroHorizontal1.y, muroHorizontal1.width, muroHorizontal1.height);
    ctx.fillRect(muroVertical1.x, muroVertical1.y, muroVertical1.width, muroVertical1.height);
    ctx.fillRect(cuadrado.x, cuadrado.y, cuadrado.width, cuadrado.height);
    ctx.fillRect(cuadrado1.x, cuadrado1.y, cuadrado1.width, cuadrado1.height);
    ctx.fillRect(cuadrado2.x, cuadrado2.y, cuadrado2.width, cuadrado2.height);
    ctx.restore
}

//Crear objetivo

var objetivo = {
    x: 80,
    y: 300,
    r: 20,
    width: 0,
    height: 2 * Math.PI

}

function crearObjetivo(){
    ctx.save();
    ctx.beginPath();
    ctx.arc(objetivo.x, objetivo.y, objetivo.r, objetivo.width, objetivo.height);
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore;
}

//Crear el fondo
function loadMedia(){
    fondo = new Image();
    fondo.src = 'fondo.jpg';
    fondo.onload = function(){
        var intervalo = window.setInterval(frameLoop, 1000/55); //crea una variable que hace un intervalo para frameloop
    }
    
}//cargar la imagen y la funcion cada 1000/55 milisegundos a traves del metodo set.Interval
function dibujarFondo(){
    ctx.drawImage(fondo, 0, 0);
}

//Agregar eventos del teclado y movimiento
function agregarEventosTeclados(){
    agregarEvento(document, "keydown", function(e){
        teclado[e.keyCode] = true; //Si el teclado no se oprime, teclado tiene el valor true
    });
    agregarEvento(document, "keyup", function(e){
        teclado[e.keyCode] = false; //Si el teclado no se oprime, teclado tiene el valor false
    })
    function agregarEvento(elemento, nombreEvento, funcion){
        if(elemento.addEventListener){
            elemento.addEventListener(nombreEvento, funcion, false);
        }
        else if(elemento.attachEvent){
            elemento.attachEvent(nombreEvento, funcion);
        }
    }
}
function moverPersonaje(){
    if(teclado[37]){
        //Movimiento a la izquierda
        personaje.x -= 5;
        if(personaje.x < 0) personaje.x = 0;
    }
    if(teclado[39]){
        //Movimiento a la derecha
        var limite = canvas.width - personaje.width;
        personaje.x += 5;
        if(personaje.x > limite) personaje.x = limite;
    }
    if(teclado[38]){
        //Movimiento arriba
        personaje.y -= 5;
        if(personaje.y < 0) personaje.y = 0;
    }
    if(teclado[40]){
        //Movimiento abajo
        var limite = canvas.height - personaje.height;
        personaje.y += 5;
        if(personaje.y > limite) personaje.y = limite;
    }
}

function choque(a,b){
    var tocado = false;
    if(b.x + b.width >= a.x && b.x < a.x + a.width){
        if(b.y + b.height >= a.y && b.y < a.y + a.height){
            tocado = true;
        }
    }
    if(b.x <= a.x && b.x + b.width >= a.x + a.height){
        if(b.y <= a.y && b.y + b.height >= a.y + a.height){
            tocado = true;
        }
    }
    if(a.x <= b.x && a.x + b.width >= b.x + b.height){
        if(a.y <= b.y && a.y + a.height >= b.y + b.height){
            tocado = true;
        }
    } 
    return tocado
} 
function contacto(){
    if(choque(personaje, muroHorizontal)){
        ctx.font = "60px Arial";
        ctx.fillText("PERDISTE", 50, 180);
        alert("perdiste!"); //Pierde
        document.location.reload();
        console.log("PERDISTE"); //verificación de que funciona
    }
    if(choque(personaje, muroHorizontal1)){
        ctx.font = "60px Arial";
        ctx.fillText("PERDISTE", 50, 180);
        alert("perdiste!"); //Pierde
        document.location.reload();
    }
    if(choque(personaje, muroVertical)){
        ctx.font = "60px Arial";
        ctx.fillText("PERDISTE", 50, 180);
        alert("perdiste!"); //Pierde
        document.location.reload();
    }
    if(choque(personaje, muroVertical1)){
        ctx.font = "60px Arial";
        ctx.fillText("PERDISTE", 50, 180);
        alert("perdiste!"); //Pierde
        document.location.reload();
    }
    if(choque(personaje, cuadrado)){
        ctx.font = "60px Arial";
        ctx.fillText("PERDISTE", 50, 180);
        alert("perdiste!"); //Pierde
        document.location.reload();
    }
    if(choque(personaje, cuadrado1)){
        ctx.font = "60px Arial";
        ctx.fillText("PERDISTE", 50, 180);
        alert("perdiste!"); //Pierde
        document.location.reload();
    }
    if(choque(personaje, cuadrado2)){
        ctx.font = "60px Arial";
        ctx.fillText("PERDISTE", 50, 180);
        alert("perdiste!"); //Pierde
        document.location.reload();
    }
    if(choque(personaje, objetivo)){
        ctx.font = "60px Arial";
        ctx.fillText("GANASTE", 50, 180);
        alert("Ganaste"); //ganas
        document.location.reload();
    }
}
//Ejecucion principal
function frameLoop(){
    moverPersonaje();
    dibujarFondo();
    crearLaberinto();
    dibujarPersonaje();
    crearObjetivo();
    contacto();
}//llamar todas las funciones anteriores

agregarEventosTeclados(); //si se oprime una tecla
loadMedia(); //funcion principal que se repite llamando el frameloop