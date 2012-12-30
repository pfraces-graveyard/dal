//     DAL.js 0.1
//     (c) 2012 Pau Fracés

// **DAL** se compone de un array de objetos y funciones que operan sobre este
// array
//
// Cada objeto del array está compuesto de un elemento del DOM y algunas de sus
// propiedades guardadas en su estado original, para poder ser restauradas
// posteriormente

// # Inicialización
//
// Basada en **underscore.js**:

// Se crea un scope propio para la librería
(function () {

  // Define el elemento raíz, `window` en el navegador, o `global` en node
  var root = this;

  // Crea una referencia de DAL para su uso posterior
  var dal = function (selection) {
    dal.nodes = sel(selection);
  };

  // Exporta DAL a **node.js** o al navegador
  if (typeof module !== 'undefined' && module.exports) module.exports = dal;
  else root.dal = dal;

  // # Funciones no expuestas

  // ## sel(selection)
  //
  // Se encarga de obtener un array de elementos del DOM guardando el estado
  // original de algunas de sus propiedades, para poder ser restauradas en 
  // cualquier momento

  var sel = function (selection) {
    function getElements () {
      if (!selection) return [].concat(document.createElement('div'));
      if (typeof selection === 'object') return [].concat(selection);
      if (typeof selection === 'string') {
        if (/^[#]/.test(selection)) {
          return [].concat(document.getElementById(selection));
        }
        if (/^[.]/.test(s)) return document.getElementsByClassName(selection);
        return document.getElementsByTagName(selection);
      }
    }

    return getElements().map(function (el) {
      return {
        DOM   : el
      , orig  : {
          display   : el.style.display
        , overflow  : el.style.overflow
        , position  : el.style.position
        }
      };
    });
  };

  // ## under(el, parent)
  //
  // Determina si `el` es descendiente de `parent`

  var under = function (el, parent) {
    var node = el.DOM.parentNode;
    while (node) {
      if (node == parent) return true;
      node = node.parentNode;
    }
    return false;
  }

  // ## full(el)
  //
  // Determina si `el` está lleno

  var full = function (el) {
    el.DOM.style.overflow = 'hidden';
    var isOverflowing = el.DOM.clientWidth < el.DOM.scrollWidth ||
                        el.DOM.clientHeight < el.DOM.scrollHeight;
    el.DOM.style.overflow = el.orig.overflow;
    return isOverflowing;
  }

  // ## empty(el)
  //
  // Determina si `el` está vacío

  var empty = function (el) {
    return el.DOM.firstChild;
  }

  // # Funciones expuestas
  //
  // El resto es una colección de funciones que operan sobre todos los items
  // de `dal.nodes`
  //
  // Todas estas funciones se pueden encadenar (son _chainable_)

  // # Funciones de gestión de elementos

  // ## dal.attach()
  //
  // Vincula cada nodo al `document.body` si no estaba vinculado ya
  //
  // Cuando se crea un nodo, éste no pertenece al `document.body` por defecto.
  // Esto significa que el elemento no es renderizado y por tanto no se
  // muestra en el navegador

  dal.attach = function () {
    dal.nodes.foreach(function (el) {
      if (!under(el.DOM, document.body)) document.body.appendChild(el.DOM);
      return dal;
    });
  }

  // ## dal.detach()
  //
  // Desvincula cada nodo de su nodo padre, dejandolo huérfano
  //
  // Si el nodo estaba bajo `document.body` dejará de renderizarse y
  // desaparecerá del navegador

  dal.detach = function () {
    dal.nodes.foreach(function (el) {
      if (el.DOM.parentNode) el.DOM.parentNode.removeChild(el.DOM);
      return dal;
    });
  }

  // ## dal.add(elm, content)
  //
  // Vincula un nuevo elemento a cada nodo

  dal.add = function (elm, content) {
    var el = typeof elm === 'object' ? elm : document.createElement(elm);
    if (content) el.appendChild(document.createTextNode(content));
    node.appendChild(el);
    return node;
  }

  node.del = function (el) {
    var target = dal(el);
    if (target.under(node)) target.detach();
    return node;
  }

  node.clear = function () {
    while (!node.empty()) node.removeChild(node.firstChild);
    return node;
  }

  node.copy = function () {
    var clone = node.cloneNode(false);
    for (var i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].nodeType === 3) {
        clone.appendChild(node.childNodes[i]);
      }
    }
    return clone;
  }

  node.clone = function () {
    return dal(node.cloneNode(true));
  }

  // ## CSS layout methods

  node.show = function () {
    node.style.position = orig.position;
    node.style.visibility = 'visible';
    return node;
  }

  node.hide = function () {
    node.style.position = 'absolute';
    node.style.visibility = 'hidden';
    return node;
  }

  node.move = function (x, y) {
    node.style.position = 'absolute';
    node.style.left = x; 
    node.style.top = y;
    return node;
  }

  // ## CSS style methods

  node.color = function (opts) {
    node.style.background = opts.bg;
    node.style.color = opts.fg;
    return node;
  }

  node.size = function (opts) {
    node.style.width = opts.width;
    node.style.height = opts.height;
    return node;
  }

  // ## Tag attribute methods

  node.class = {
    add: function (className) {
      node.className += ' ' + className;
      return node;
    }
  }

  // ## Misc property methods
  //
  // Chaining useful property definitions

  node.html = function (html) {
    node.innerHTML = html;
    return node;
  }

}).call(this);
