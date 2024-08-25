           // MIS CÓDIGOS//
           //-----------------------------------------
           
           let numero = 2024;
           let nombre = ['juan'];
           let año = 2008;
           let edad = 16;
           
           
           function calculo(a,b) {
             return a - b + 'resultado';
           }
           
           console.log(calculo(numero,edad));
           
           let animal = ["perro","gato","pollo"];
           let sonido = ["guau","miau","pio"];
           
           function perro(a) {
             return 'soy un' + animal[0] + 'y digo' + sonido[0] + a ;
           }
           
           function gato(a) {
             return 'soy un' + animal[1] + 'y digo' + sonido[1] + a ;
           }
           
           function pollo(a) {
             return 'soy un' + animal[2] + 'y digo' + sonido[2] + a ;
           }
           
           let mostrar = perro('.') + gato('.') + pollo('.') + 'estos son los resultados';
           
           console.log(mostrar);