

$('body > .ergo-dropdown-box').remove();


var w = $.ergo({
  renderTo: '.preview',
  etype: 'list',
  
  defaultItem: {
    width: 100,
    height: 100,
  },
  
  items: [{
    etype: 'box',
    style: {'background-color': '#faa'}
//    style: {'float': 'right', 'margin-right': 40}
  }, {
    etype: 'dropdown-box',
    innerText: 'box 1',
    position: 'top-left',
    style: {'background-color': '#afa'}
  }/*, {
    etype: 'dropdown-box'
  }*/]
  
});

var dd = w.items.get(1);

dd.show(w.items.get(0), 'bottom-right')

var view_w = $('body').outerWidth();
var view_h = $('body').outerHeight();

var dw = view_w - (dd.el.outerWidth() + dd.el.offset().left);

//if( dw < 0) {
//  var x = dd.el.offset().left;
//  dd.el.css('left', x + dw);
//  console.log(x);
//
//}
