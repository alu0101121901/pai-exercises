/* Evento que inicializa el carousel cuando carga la página */
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.carousel');
  var instances = M.Carousel.init(elems, {
    //numVisible: 3
  });
});