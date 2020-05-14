/* Inicialización de la función para collapsible */
var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, {
  inDuration: 400, /* 300 by default */
  accordion: false
});