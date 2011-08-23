    

var bindingData = new Ergo.core.DataSource( Samples.generate_plain_list(30), {
	range: [0, 5],
	filter: function(data){
	  var out = [];
		var r = this.options.range;
	  for(var i = 0; i < data.length; i++)
	    if(i >= r[0] && i < r[1]) out.push(i);                
	  return out;
	}
} );

var offset = 0;

var box = $.ergo({
  etype: 'box',
  renderTo: '.preview',
  components: {
    controls: {
      etype: 'control-list',
      cls: 'dino-border-bottom',
      items: [{
        etype: 'text-button',
        text: '<< Предыдущие 5',
        onAction: function() {
          if(offset > 0) {
            offset -= 5;
            bindingData.options.range = [offset, offset+5];
            bindingData.events.fire('onValueChanged');              
          }
        }
        
      }, {
        etype: 'text-button',
        text: 'Следующие 5 >>',
        onAction: function() {
          if(offset < 25) {
            offset += 5;
            bindingData.options.range = [offset, offset+5];
            bindingData.events.fire('onValueChanged');              
          }
        }
      }]
    },
    content: {
      etype: 'list',
      layout: 'float',
      dynamic: true,
      data: bindingData,
      defaultItem: {
        etype: 'box',
        cls: 'dino-border-all dino-corner-all',
        style: {'margin': '3px', 'padding': '3px'},
        binding: function(val) { this.opt('innerText', val); }
      }
    }
  }
});

