// # DAL - DOM Abstraction Layer
//
// **DAL** gets a DOM element and returns an object with methods for dealing
// with that element

// # dal(el)
//
// Constructor
//
// `el` _(Optional)_: If no element is passed, a `div` element will be created
// and used, but also detached from the `document.body` (so is invisible) by
// default
//
// *   _[String]_ id of the DOM element
// *   _[Object: DOM Element]_ 

var dal = function (el) {
  if (!el) dal.DOM = document.createElement('div');
  else if (typeof el === 'string') dal.DOM = document.getElementById(el);
  else dal.DOM = el;
  return dal;
}

// Save some original settings

dal.orig {
  display:    dal.DOM.style.display
, overflow:   dal.DOM.style.overflow
, position:   dal.DOM.style.position
}

// # Boolean methods
//
// This methods checks for something in the DOM element `el` received with the
// constructor
//
// Every one of them returns a boolean value, so none of them is chainable

// ## dal.under(target)
//
// `target`: _[Object: DOM Element]_ Determines if `el` is descendant of
// `target`

dal.under = function (target) {
  var parent = dal.DOM.parentNode;
  while (parent) {
    if (parent == target) return true;
    parent = parent.parentNode;
  }
  return false;
}

// ## dal.full()
//
// Determines if `el` is overflowing its bounds

dal.full = function () {
  dal.DOM.style.overflow = 'hidden';
  var isOverflowing = dal.DOM.clientWidth < dal.DOM.scrollWidth ||
                      dal.DOM.clientHeight < dal.DOM.scrollHeight;
  dal.DOM.style.overflow = dal.orig.overflow;
  return isOverflowing;
}

// ## dal.empty()
//
// Determines if `el` has any child

dal.empty = function () {
  return dal.DOM.firstChild;
}

// # Chainable API
//
// The rest is a collection of methods for managing the DOM element `el`
// received with the constructor
//
// Every one of them is chainable

// # Element management methods

// ## dal.attach()
//
// Attaches `el` to the `document.body` if it was not attached yet

dal.attach = function () {
  if (!dal.under(document.body)) document.body.appendChild(dal.DOM);
  return dal;
}

// ## dal.detach()
//
// Detaches `el` from his parent if it has one

dal.detach = function () {
  if (dal.DOM.parentNode) dal.DOM.parentNode.removeChild(dal.DOM);
  return dal;
}

// ## dal.add(newEl, content)
//
// Attaches a new element to `el`
//
// `newEl`:
//
// *   _[String]_ An element is created and attached
//
//         dal().add('h1', 'Hello world!')
//
// *   _[Object: DOM Element]_ An existing DOM element. In this case `newEl` is
//     cloned and the clone is attached
//
// `content` _(Optional)_: _[String]_ Defauilt content for the new element

dal.add = function (newEl, content) {
  var el = typeof newEl === 'object' ? newEl : document.createElement(newEl);
  if (content) el.appendChild(document.createTextdal.DOM(content));
  dal.DOM.appendChild(el);
  return dal;
}

// ## dal.del(target)
//
// If `target` is descendant of `el`, `target` is detached from his parent

dal.del = function (target) {
  var el = dal(target);
  if (el.under(dal.DOM)) el.detach();
  return dal;
}

// ## dal.clear()
//
// Removes all the children of `el`

dal.clear = function () {
  while (!dal.empty()) dal.DOM.removeChild(dal.DOM.firstChild);
  return dal;
}

// ## dal.copy()
//
// Returns a copy of itself excluding its children nodes

dal.copy = function () {
  var copy = dal.DOM.cloneNode(false);
  for (var i = 0; i < dal.DOM.childNodes.length; i++) {
    if (dal.DOM.childNodes[i].nodeType === 3) {
      copy.appendChild(dal.DOM.childNodes[i]);
    }
  }
  return dal(copy);
}

// ## dal.clone()
//
// Returns a clone of itself including its children nodes

dal.clone = function () {
  return dal(dal.DOM.cloneNode(true));
}

// # CSS layout methods

// ## dal.show()
//
// Makes `el` visible (is if is attached to the `document.body`)

dal.show = function () {
  dal.DOM.style.position = dal.orig.position;
  dal.DOM.style.visibility = 'visible';
  return dal;
}

// ## dal.hide()
//
// Makes `el` invisible and ignored by the layout, but behaving as when visible

dal.hide = function () {
  dal.DOM.style.position = 'absolute';
  dal.DOM.style.visibility = 'hidden';
  return dal;
}

// ## dal.move(opts)
//
// Makes the element absotule positioned at `(opts.x, opts.y)`

dal.move = function (opts) {
  dal.DOM.style.position = 'absolute';
  dal.DOM.style.left = opts.x; 
  dal.DOM.style.top = opts.y;
  return dal;
}

// # CSS style methods

// ## dal.color(opts)
//
// Changes the background and text color of `el`
//
// `opts`: _[Object]_
//
// *   `opts.bg`: Determines the backgroud color
// *   `opts.fg`: Determines the text color

dal.color = function (opts) {
  dal.DOM.style.background = opts.bg;
  dal.DOM.style.color = opts.fg;
  return dal;
}

// ## dal.size(opts)
//
// Changes the size of `el`
//
// `opts`: _[Object]_
//
// *   `opts.width`: Determines the width of the element
// *   `opts.height`: Determines the height of the element

dal.size = function (opts) {
  dal.DOM.style.width = opts.width;
  dal.DOM.style.height = opts.height;
  return dal;
}

// # Tag attribute methods

// ## dal.class.add(className)
//
// Adds `class` as a CSS class of `el`
//
// `class`: _[String]_ A CSS class to be added

dal.class = {
  add: function (className) {
    dal.DOM.className += ' ' + className;
    return dal;
  }
}

//  ## Misc property methods
//
//  Chaining useful property definitions

// dal.html(html)
//
// Sets the `innerHTML` value of the element

dal.html = function (html) {
  dal.DOM.innerHTML = html;
  return dal;
}
