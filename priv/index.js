const nearley = require("nearley");
const grammar = require("../grammar.js");
const formulario = document.querySelector('#formulario');
const textArea = document.querySelector("textarea");

eventListeners();
function eventListeners(){

    formulario.addEventListener('submit', validarInformacion);

 }

 function validarInformacion(e){
   e.preventDefault();
   const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

   const codigo = textArea.value;

   parser.feed(codigo);
     if(parser.results.length>1){
       Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Error: gramatica ambigua detectada'
       })
     } else if (parser.results.length == 1) {
       Swal.fire({
         icon: 'success',
         title: 'Validado',
         text: 'Gramatica correcta'
       })
     } else {
       Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Error: gramatica incorrecta'
       })
       
    }

 }
