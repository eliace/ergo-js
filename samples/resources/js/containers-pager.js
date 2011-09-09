    

var bindingData = new Ergo.core.DataSource( Samples.generate_plain_list(30), {
  range: [0, 5],
  filter: function(v, i){
    var r = this.options.range;
    return (i >= r[0] && i < r[1]);
    // var out = [];
    // for(var i = 0; i < data.length; i++)
      // if(i >= r[0] && i < r[1]) out.push(i);                
    // return out;
  }
} );

var offset = 0;

var box = $.ergo({
  etype: 'box',
  renderTo: '.preview',
  components: {
    controls: {
      etype: 'control-list',
      cls: 'ergo-border-bottom',
      items: [{
        etype: 'text-button',
        text: '<< Предыдущие 5',
        onAction: function() {
          if(offset > 0) {
            offset -= 5;
            bindingData.options.range = [offset, offset+5];
            bindingData.events.fire('value:changed');
          }
        }
        
      }, {
        etype: 'text-button',
        text: 'Следующие 5 >>',
        onAction: function() {
          if(offset < 25) {
            offset += 5;
            bindingData.options.range = [offset, offset+5];
            bindingData.events.fire('value:changed');              
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
        cls: 'ergo-border-all ergo-corner-all',
        style: {'margin': '3px', 'padding': '3px'},
        binding: function(val) { this.opt('innerText', val); }
      }
    }
  }
});

