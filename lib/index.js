/**
 *  # DAL.js
 *
 *  DOM Abstraction Layer
 *
 *  # Selectores
 *
 *  En realidad no sé lo que es un selector, pero lo trato como una cadena de
 *  texto mediante la cual se obtienen elementos concretos:
 *
 *  *   `'foo'` busca el elemento con id _foo_, si no se encuentra prueba con
 *      el atributo name
 *
 *  *   `'foo bar'` busca los elementos con id _foo_ y _bar_
 *  *   `'.qux'` busca los elementos con clase _qux_ (nótese el `.` al inicio)
 *
 *  # Diseño del API
 *
 *  *   Como trata sobre alterar el dom, siempre recibirá un selector por
 *      parámetro
 *
 *  *   Como puede devolver varios elementos siempre devolverá un array y se
 *      creará una función para acceder al primer elemento de forma más fácil
 *      que al resto ya que en la mayoría de casos se pedirá por un sólo
 *      elemento
 */
module.exports = function (selector) {
  var node = document.getElementById(selector)
    , display;

  if (!node) return node;
  display = node.style.display;

  node.addClass = function (className) {
    node.className += ' ' + className;
  };

  node.hide = function () {
    node.style.display = 'none';
  };

  node.show = function () {
    node.style.display = display;
  }

  return node;
}
