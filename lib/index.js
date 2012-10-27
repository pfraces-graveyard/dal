var el = function (id) {
  var node = document.getElementById(id);
  
  node = node ? node : {};

  node.display = node.style.display;

  node.addClass = function (className) {
    node.className += ' ' + className;
  };

  node.hide = function () {
    node.style.display = 'none';
  };

  node.show = function () {
    node.style.display = node.display;
  }

  return node;
}

exports.el = el;
