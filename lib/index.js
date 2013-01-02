// # DAL - DOM Abstraction Layer
//
// **DAL** gets a DOM element and returns an object with methods for dealing
// with that element

// # Constructor
//
// ## dal(el)
//
// Gets a DOM element and returns an object with methods for dealing with that
// element
//
// `el` _(Optional)_: If no element is passed, a `div` element will be created
// and used, but also detached from the `document.body` (so is invisible) by
// default
//
// *   _[String]_ id of the DOM element
// *   _[Object: DOM Element]_ 

var dal = function (el) {
  var self = {};
  if (!el) self.DOM = document.createElement('div');
  else if (jslib(el).isString()) self.DOM = document.getElementById(el);
  else self.DOM = el; 

  // Save some original settings
  self.orig = {
    display:    self.DOM.style.display
  , overflow:   self.DOM.style.overflow
  , position:   self.DOM.style.position
  };

  // # Getters

  // ## dal.getHtml()
  //
  // Returns the innerHTML value from `el`

  self.getHtml = function () {
    return self.DOM.innerHTML;
  }

  // ## dal.getChildren()
  //
  // Returns an array of the childNodes from `el`

  self.getChildren = function () {
    return jslib(self.DOM.childNodes).toArray();
  }

  // # Boolean methods
  //
  // This methods checks for something in the DOM element `el` received with
  // the constructor

  // ## dal.isUnder(target)
  //
  // `target`: _[Object: DOM Element]_ Determines whether `el` is descendant of
  // `target`

  self.isUnder = function (target) {
    var parent = self.DOM.parentNode;
    while (parent) {
      if (parent == target) return true;
      parent = parent.parentNode;
    }
    return false;
  }

  // ## dal.isFull()
  //
  // Determines whether `el` is overflowing its bounds

  self.isFull = function () {
    self.DOM.style.overflow = 'hidden';
    var isOverflowing = self.DOM.clientWidth < self.DOM.scrollWidth ||
                        self.DOM.clientHeight < self.DOM.scrollHeight;
    self.DOM.style.overflow = self.orig.overflow;
    return isOverflowing;
  }

  // ## dal.isEmpty()
  //
  // Determines whether `el` has any child

  self.isEmpty = function () {
    return self.DOM.firstChild;
  }

  // ## dal.isTag(tagName)
  // 
  // Determines whether `el` is a tag and (if passed) its a `tagName` tag
  //
  // `tagName` _(Optional)_: _[String]_

  self.isTag = function (tagName) {
    if (self.DOM.tagName) {
      return self.DOM.tagName.toUpper() === tagName.toUpper();
    }
    return false;
  }

  // ## dal.hasClass(className)
  //
  // Determines whether `className` is a class of `el`
  //
  // `className`: _[String]_

  self.hasClass = function (className) {
    return self.DOM.classList.contains(className);
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

  self.attach = function () {
    if (!self.isUnder(document.body)) document.body.appendChild(self.DOM);
    return self;
  }

  // ## dal.detach()
  //
  // Detaches `el` from his parent if it has one

  self.detach = function () {
    if (self.DOM.parentNode) self.DOM.parentNode.removeChild(self.DOM);
    return self;
  }

  // ## dal.add(newEl, content)
  //
  // Attaches a new element to `el`
  //
  // `newEl`:
  //
  // *   _[Object: DAL instance]_ 
  // *   _[Object: DOM Element]_
  //
  // *   _[String]_ An element is created and attached
  //
  //         self().add('h1', 'Hello world!')
  //
  // `content` _(Optional)_: _[String]_ Defauilt content for the new element

  self.add = function (newEl, content) {
    var el = {};
    if (jslib(newEl).isString()) el = document.createElement(newEl);
    else if (newEl.DOM) el = newEl.DOM;
    else el = newEl;
    if (content) el.appendChild(document.createTextNode(content));
    self.DOM.appendChild(el);
    return self;
  }

  // ## dal.del(target)
  //
  // If `target` is descendant of `el`, `target` is detached from his parent

  self.del = function (target) {
    var el = self(target);
    if (el.isUnder(self.DOM)) el.detach();
    return self;
  }

  // ## dal.clear()
  //
  // Removes all the children of `el`

  self.clear = function () {
    while (!self.isEmpty()) self.DOM.removeChild(self.DOM.firstChild);
    return self;
  }

  // ## dal.copy()
  //
  // Returns a copy of itself excluding its children nodes

  self.copy = function () {
    var copy = self.DOM.cloneNode(false);
    for (var i = 0; i < self.DOM.childNodes.length; i++) {
      if (self.DOM.childNodes[i].nodeType === 3) {
        copy.appendChild(self.DOM.childNodes[i]);
      }
    }
    return dal(copy);
  }

  // ## dal.clone()
  //
  // Returns a clone of itself including its children nodes

  self.clone = function () {
    return dal(self.DOM.cloneNode(true));
  }

  // # CSS layout methods

  // ## dal.show()
  //
  // Makes `el` visible (is if is attached to the `document.body`)

  self.show = function () {
    self.DOM.style.position = self.orig.position;
    self.DOM.style.visibility = 'visible';
    return self;
  }

  // ## dal.hide()
  //
  // Makes `el` invisible and ignored by the layout, but behaving as when
  // visible

  self.hide = function () {
    self.DOM.style.position = 'absolute';
    self.DOM.style.visibility = 'hidden';
    return self;
  }

  // ## dal.move(opts)
  //
  // Makes the element absotule positioned at `(opts.x, opts.y)`

  self.move = function (opts) {
    self.DOM.style.position = 'absolute';
    self.DOM.style.left = opts.x; 
    self.DOM.style.top = opts.y;
    return self;
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

  self.color = function (opts) {
    self.DOM.style.background = opts.bg;
    self.DOM.style.color = opts.fg;
    return self;
  }

  // ## dal.size(opts)
  //
  // Changes the size of `el`
  //
  // `opts`: _[Object]_
  //
  // *   `opts.width`: Determines the width of the element
  // *   `opts.height`: Determines the height of the element

  self.size = function (opts) {
    self.DOM.style.width = opts.width;
    self.DOM.style.height = opts.height;
    return self;
  }

  // # Tag attribute methods

  self.class = {

    // ## dal.class.add(className)
    //
    // Adds `class` as a CSS class of `el`
    //
    // `class`: _[String]_ A CSS class to be added

    add: function (className) {
      self.DOM.className += ' ' + className;
      return self;
    }
  }

  // # Misc property methods
  //
  // Chaining useful property definitions

  // ## self.html(html)
  //
  // Sets the `innerHTML` value of the element

  self.html = function (html) {
    self.DOM.innerHTML = html;
    return self;
  }

  return self;
}
