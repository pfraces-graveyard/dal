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

dal = function (selector) {
  var node;

  if (selector) {
    if (typeof selector === 'object') node = selector;
    if (typeof selector === 'string') node = document.getElementById(selector);
  } else node = document.body.appendChild(document.createElement('div'));

  if (!node) return node;

  /**
   *  # Element management functions
   *
   *  https://developer.mozilla.org/en-US/docs/DOM/document.createElement
   *  https://developer.mozilla.org/en-US/docs/DOM/NodeList
   *  https://developer.mozilla.org/en-US/docs/DOM/Node.appendChild
   *  https://developer.mozilla.org/en-US/docs/DOM/Node.removeChild
   */

  node.add = function (elm, content) {
    var el = typeof elm === 'object' ? elm : document.createElement(elm);
    if (content) el.appendChild(document.createTextNode(content));
    node.appendChild(el);
    return node;
  }

  node.clone = function () {
    return dal(node.parentNode.appendChild(node.cloneNode(true)));
  }

  node.del = function () {
    node.parentNode.removeChild(node);
    return node;
  }

  node.empty = function () {
    while (node.firstChild) node.removeChild(node.firstChild);
    return node;
  }

  /**
   *  # CSS alteration functions
   */

  var orig = {
    display:    node.style.display
  , overflow:   node.style.overflow
  }

  node.addClass = function (className) {
    node.className += ' ' + className;
    return node;
  }

  node.hide = function () {
    node.style.display = 'none';
    return node;
  }

  node.show = function () {
    node.style.display = orig.display;
    return node;
  }

  node.overflow = function () {
    node.style.overflow = 'hidden';
    var isOverflowing = node.clientWidth < node.scrollWidth ||
                        node.clientHeight < node.scrollHeight;
    node.style.overflow = orig.overflow;
    return isOverflowing;
  }

  node.color = function (bgcolor, fgcolor) {
    node.style.background = bgcolor;
    node.style.color = fgcolor;
    return node;
  }

  node.size = function (width, height) {
    node.style.width = width;
    node.style.height = height;
    return node;
  }

  /**
   *  # Misc utilities
   */

  node.html = function (html) {
    node.innerHTML = html;
    return node;
  }

  return node;
}
