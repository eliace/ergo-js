

var testData = [];

for(var i = 0; i < 100; i++) {
  testData.push({
    id: i,
    date: new Date().toString()
  });
}




var panel = $.dino({
  dtype: 'box',
  renderTo: '.preview',
  components: {
    buttons: {
      dtype: 'box',
      defaultItem: {
        dtype: 'text-button'
      },
      items: [{
        text: ''+testData.length+' простых виджетов',
        onAction: function() {
          
          panel.outputPane.el.empty();
          
          profiler.clear('widget');
          
          for(var i = 0; i < testData.length; i++) {
            var w = $.dino({
              dtype: 'text',
              html: '<span class="simple-item">'+testData[i].date+'</span>',
//              cls: 'simple-item',
//              style: {'display': 'block'},
//              innerText: testData[i].date
            });
//            panel.outputPane.el.append(w.el);
          }

          growl.info(profiler.print_result('widget'));
        }
      }, {
        text: 'Поэлементные события',
        onAction: function() {
          panel.outputPane.el.empty();
          
//          var fn = function() {};          
          
          var t0 = Dino.timestamp();
          
          for(var i = 0; i < testData.length; i++) {
            var el = $('<div>Item '+i+'</div>');
            el.addClass('test');
            panel.outputPane.el.append(el);
          }
          
          var t1 = Dino.timestamp();
          
          growl.info((t1 - t0));          
          
        }
      }]
    },
    outputPane: {
      dtype: 'box'
    }
  }
});
