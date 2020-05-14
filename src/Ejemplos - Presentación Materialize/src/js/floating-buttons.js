/* Se inicializan los botones flotantes indicando una dirección 
para la salida de los botones */
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'top',
    //hoverEnabled: false
  });
});
