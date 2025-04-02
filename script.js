
// Selección de elementos HTML
const input = document.getElementById('numero');
const nombreDate = document.getElementById('nombreDate');
const pais = document.getElementById('nacionalidad');
const boton = document.getElementById('press');
const precio = document.getElementById('precio');
const mensaje = document.getElementById('mensaje');
const age = document.getElementById('age')
const tabla = document.getElementById('resultH');
const pago = document.getElementById('resultadoPago')
const pagar = document.getElementById('pago_boton')
const info = document.getElementById('info')

// Función para guardar datos en LocalStorage
function guardarDatosLocalStorage(nombre, edad, pais, tipoBoleta, precio) {
  const datosUsuario = {
    nombre: nombre,
    edad: edad,
    pais: pais,
    tipoBoleta: tipoBoleta,
    precio: precio
  };
  localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
}

// Función para recuperar datos de LocalStorage
function recuperarDatosLocalStorage() {
  const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
  return datosUsuario;
}

// ----------

let reloj = new Date();
let hora = reloj.getHours().toString().padStart(2,'0');
let minutos = reloj.getMinutes().toString().padStart(2,'0');
let segundos = reloj.getSeconds().toString().padStart(2,'0');
let tiempo = ` ${hora}:${minutos}:${segundos}`
let mensaje_system_Lista = ['...cargando','...sistema activado','.....descargando paquetes','......verificando errores','......recibiendo algoritmo',`...hora obtenido ${tiempo}`,'....proceso completado']
let valor = 0;
let intervalo = setInterval(() => {
  let resultado = valor++;
  console.log(mensaje_system_Lista[resultado])
  if (resultado == 6) {
    clearInterval(intervalo)
  }
} , 1000)

// guardar datos de procedimientos
let tipo_boleta;
let precio_boleta;
let verifica_pais;
let codigo_lista = [];
let pagar_user;// resultado de pagar

// evento del botón de formulario
let mensaje_edad;
let mensaje_pais;
let mensaje_precio;
let mensaje_descrip;

boton.addEventListener('click',function () {
  console.log('boton 1 ')
  tabla.textContent = ''
  // ingresar datos
  let edad = parseInt(input.value);
  let nombre = nombreDate.value.trim().toUpperCase();
  nombre_User_base = nombre;
  let nacion = pais.value.trim().toLowerCase();

  // crear listas
  let liCreate = document.createElement('li');

  //validar pais
  if (nacion == 'paraguay' && nombre && edad) {
    mensaje_pais = 'valido solo en Paraguay';
    console.log(`se valido el pais `)
  }else if (nacion !== 'paraguay' && nombre && edad) {
    mensaje_pais = 'no valido en: ' + nacion;
    console.log(`! error no valido el pais !!`)
  }
  console.log('Edad del usuario: ' + edad + ' Años');
  if (nacion == 'paraguay' && edad && nombre) {
    console.log('accion correcta')
    boton.textContent = 'actualizar';
  } else {
    console.log('error acción.')
  }

  // verificar si completo el formulario mostrando que le falta agregar
  if (nombre && edad && nacion == 'paraguay') {
    console.log('el usuario: ' + nombre.toLowerCase().trim() + ' completo el formulario' )
    age.textContent = edad + ' Años';
  }

  // asegurar los datos y si existe un dato eliminar automáticamente
  else if (nombre && edad){
    alert('verifica tu pais asegurate de que escribas Paraguay');
    age.textContent = edad + ' Años';
    liCreate.textContent = '';
    console.log(`el usuario olvidó agregar pais`)
  } else if (nombre && nacion ) {
    alert('verifica tu edad para continuar');
    age.textContent = edad + ' Años';
    liCreate.textContent = '';
    console.log('el usuario olvido agregar si edad')
  } else if (edad && nacion) {
    alert('verifica tu nombre para continuar');
    age.textContent = edad + ' Años';
    liCreate.textContent = '';
    console.log('el usuario olvido agregar el nombre')
  } else if (nombre) {
    alert('verifica la edad y tu pais para continuar');
    age.textContent = edad + ' Años';
    liCreate.textContent = '';
  } else if (edad) {
    alert('verifica el nombre y tu pais para continuar');
    age.textContent = edad + ' Años';
    
liCreate.textContent = '';
} else if (nacion) {
alert('verifica tu nombre y tu edad para continuar');
age.textContent = edad + ' Años';
liCreate.textContent = '';
} else {
alert('completar el formulario para realizar la compra del boleto')
}

// verificar edad mostrar si es mayor menor de edad
if (!edad) {
mensaje_edad = "edad no identificada";
mensaje_descrip = "no hay información";
age.style.color = "red"
} else if (edad > 1 && edad <= 5) {
mensaje_edad = "es un bebé";
mensaje_descrip = "el bebe solo entrara si está con sus padres";
age.style.color = "yellow"
} else if (edad > 5 && edad < 18) {
mensaje_edad = "eres menor de edad";
mensaje_descrip = "debe estar acompañado con un mayor";
age.style.color = "green"
} else if (edad >= 18 && edad <= 75) {
mensaje_edad = "eres mayor de edad";
mensaje_descrip = "puedes pasar sin problema"
} else if (edad > 75) {
mensaje_edad = "eres una persona de avanzada edad";
mensaje_descrip = "la persona debe estar acompañado con alguien por seguridad, también recibe una silla y un lugar donde sentarse";
age.style.color = "orange"
}

// Precios por categoría de edad
let listaDeEntradas = {
basico: '5000',
normal: '15000',
premium: '30000',
especial: '20000'
};

// precios
console.log('precios de entradas: basico: 5.000 , normal: 15.000 , premium: 30.000 , especial: 20000');

// Determinar precio según la edad
if (edad < 5) {
mensaje_edad = 'Bebé (debe estar con los padres)';
mensaje_precio = 'No disponible';
mensaje_descrip = 'Debe estar acompañado obligatoriamente.';
} else if (edad < 10) {
mensaje_edad = 'Niño pequeño';
mensaje_precio = `Precio: ${listaDeEntradas.basico} Gs`;
tipo_boleta = 'Básico';
precio_boleta = listaDeEntradas.basico;
} else if (edad < 30) {
mensaje_edad = 'Joven';
mensaje_precio = `Precio: ${listaDeEntradas.normal} Gs`;
tipo_boleta = 'Normal';
precio_boleta = listaDeEntradas.normal;
} else if (edad < 75) {
mensaje_edad = 'Adulto';
mensaje_precio = `Precio: ${listaDeEntradas.premium} Gs`;
tipo_boleta = 'Premium';
precio_boleta = listaDeEntradas.mayor;
} else if(edad >= 75){
mensaje_edad = 'Persona de avanzada edad';
mensaje_precio = `Precio especial: ${listaDeEntradas.especial} Gs`;
mensaje_descrip = 'Se recomienda un lugar seguro con silla especial.';
tipo_boleta = 'Especial';
precio_boleta = listaDeEntradas.especial;
}

let listaLugar = document.createElement('li')

if (nombre) {
mensaje.textContent = 'Hola ' + nombre + ' Bienvenido';
}

// ver dónde se encuentra el usuario y mostrar mensaje
if (nacion == 'paraguay') {
console.log('el usuario es de: ' + nacion + ' y cumple por la nación permitida')
} else {
console.log('el usuario es de: ' + nacion + ' y no cumple la nacion o país requerida')
}

liCreate.textContent = `${mensaje_edad} ${mensaje_pais} ${mensaje_precio} ${mensaje_descrip}`;
tabla.appendChild(liCreate);

// Guardar datos en LocalStorage
guardarDatosLocalStorage(nombre, edad, nacion, tipo_boleta, precio_boleta);

})

// boton 2
// evento de botón de pagar
pagar.addEventListener('click',function() {
// ...
// Recuperar datos de LocalStorage
const datosUsuario = recuperarDatosLocalStorage();
if (datosUsuario) {
// Mostrar factura con datos recuperados
const mensajeFactura = `Tu FACTURA DE COMPRA 
Datos de la compra 
Nombre: ${datosUsuario.nombre} 
Edad: ${datosUsuario.edad} Años 
País: ${datosUsuario.pais} 
Tipo de boleto: ${datosUsuario.tipoBoleta} 
Precio: ${datosUsuario.precio} GS`;
alert(mensajeFactura);
} else {
alert('No se encuentra los datos del usuario')

}
})

info.addEventListener('click',function() {
// Mostrar un mensaje de bienvenida con terminos de uso
let mensaje = `Bienvenido a nuestra boletería en línea de JUAN EXPRESS 🪪
¿Cómo funciona? ⚙️
1. Ingresa tus datos personales, como nombre, edad y país de origen.
2. El precio y el tipo de boleta se elige dependiendo de tu edad .
3. Revisa y confirma tus datos antes de realizar el pago.
4. Realiza el pago y recibe tu boleto .
5. Recibira el código en la factura y este código validara la entrada asi que no se olvide o pierda
-Términos de uso 📌🧐
•La compra de boletos es solo para personas mayores de 18 años y niños deben pagar sus padres.
•Los boletos son no reembolsables ni transferibles.
•La información personal proporcionada será utilizada solo para fines de compra y venta de boletos.
•Al realizar la compra, aceptas nuestros términos y condiciones.
•Al recibir el código debera guardar o recordar antes de entrar al lugar. si por alguna razón se olvida llege al recepcionista del lugar y deberás dar los datos y recibirá su código agregado
-Política de privacidad 🛡️🔒
Nos comprometemos a proteger tu información personal y a no compartirla con terceros sin tu consentimiento.
Al realizar todo el procedimiento se borrarán todos los datos. `;

let info_pregunta = confirm(mensaje);

// ver si el usuario leyo o no lo hizo y salio de los términos de uso

if (info_pregunta === true) {
console.log('el usuario leyo los términos de uso y acepto el uso')
} else if(info_pregunta === false) {
console.log('el usuario leyo pero no acepto los términos de uso')
}

})