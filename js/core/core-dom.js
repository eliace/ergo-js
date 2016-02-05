

(function(){


  var DOM = {};



	DOM.remove = function(elem) {
		if(elem.parentNode) {
			elem.parentNode.removeChild(elem);
		}
	};

	DOM.clear = function(elem) {
		while (elem.firstChild) elem.removeChild(elem.firstChild);
	};

  DOM.insertAfter = function(elem, after) {
		after.parentNode.insertBefore(elem, after.nextSibling);
	};

	DOM.insertBefore = function(elem, before) {
		before.parentNode.insertBefore(elem, before);
	};

	DOM.prependChild = function(elem, child) {
		if(elem.childNodes[0]) {
			elem.insertBefore(child, elem.childNodes[0]);
		}
		else {
			elem.appendChild(elem);
		}
	};


	DOM.addClass = function(el, cls) {
		if( cls && (el instanceof Element) ) {
			(''+cls).split(' ').forEach(function(c) {

				if(!c) return;

				if(el.classList) {
					el.classList.add(c);
				}
				else {
					// IE9
					var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
					if(!re.test(el.className)) {
						el.className = (el.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
					}
				}
			});
		}
	};


	DOM.numberStyleToPx = function(k, v) {
    // postfixes
    var partials = [['padding', 'margin', 'border'], ['top', 'right', 'bottom', 'left']];
    for(var i = 0; i < partials[0].length; i++) {
			if(partials[0][i] == k) return v+'px';
      for(var j = 0; j < partials[1].length; j++) {
        if(partials[0][i]+'-'+partials[1][j] == k) return v+'px';
      }
    }
    // prefixes
    partials = [['width', 'height'], ['max', 'min']];
    for(var i = 0; i < partials[0].length; i++) {
			if(partials[0][i] == k) return v+'px';
      for(var j = 0; j < partials[1].length; j++) {
        if(partials[1][j]+'-'+partials[0][i] == k) return v+'px';
      }
    }
    return v;
  };


  Ergo.dom = DOM;

})();
