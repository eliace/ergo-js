

var testData = [];

for(var i = 0; i < 100; i++) {
  testData.push({
    id: i,
    date: new Date().toString()
  });
}




var panel = $.ergo({
  etype: 'box',
  renderTo: '.preview',
  components: {
    buttons: {
      etype: 'box',
      defaultItem: {
        etype: 'text-button'
      },
      items: [{
        text: ''+testData.length+' простых виджетов',
        onAction: function() {
          
          panel.outputPane.el.empty();
          
          profiler.clear('widget');
          
          for(var i = 0; i < testData.length; i++) {
            var w = $.ergo({
              etype: 'text',
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
        text: 'Run',
        onAction: function() {
          panel.outputPane.el.empty();
          
//          var fn = function() {};          
          
          var t0 = Ergo.timestamp();
          
/*					
          for(var i = 0; i < testData.length; i++) {
            var el = $('<div></div>');
            el.addClass('test');
						el.text('Item '+i);
//						el.click(Ergo.noop);
            panel.outputPane.el.append(el);
          }
*/

					
					var stream = '<div>';
          for(var i = 0; i < testData.length; i++) {
						var tag = 'div';
						var baseCls = 'test';
						var text = 'Item'+i;
						var id = 'id-'+i;
						
						var stream = '';
						stream += '<'+tag+' id="'+id+'"';
						if(baseCls) stream += ' class="'+text+'"';
						stream += '>';
						if(text) stream += text;
						stream += '</'+tag+'>';
						
          	panel.outputPane.el.append($(stream));

//						stream += Ergo.format('<div id="" class=""></div>');

//						stream += '<div id="'+id+'" class="'+baseCls+'">'+text+'</div>';
          }
					stream += '</div>';
					

          for (var i = 0; i < testData.length; i++) {
						$('#id-'+i).click(Ergo.noop);
		  		}

          
          var t1 = Ergo.timestamp();
          
          growl.info((t1 - t0));          
          
        }
      }]
    },
    outputPane: {
      etype: 'box'
    }
  }
});
