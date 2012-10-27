var el = function (id) {
  var el = document.getElementById(id);

  return el ? el : {};
}

exports.el = el;
