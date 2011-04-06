    

var bindingData = new Dino.data.ArrayDataSource( Samples.generate_plain_list(30) );
bindingData.range = [0, 5];
bindingData.filter_chain = function(data){
  var out = [];
  for(var i = 0; i < data.length; i++)
    if(i >= this.range[0] && i < this.range[1]) out.push(i);                
  return out;
};

var offset = 0;

var box = $.dino({
  dtype: 'box',
  renderTo: '.preview',
  components: {
    controls: {
      dtype: 'control-box',
      cls: 'dino-border-bottom',
      items: [{
        dtype: 'text-button',
        text: '<< Предыдущие 5',
        onAction: function() {
          if(offset > 0) {
            offset -= 5;
            bindingData.range = [offset, offset+5];
            bindingData.events.fire('onValueChanged');              
          }
        }
        
      }, {
        dtype: 'text-button',
        text: 'Следующие 5 >>',
        onAction: function() {
          if(offset < 25) {
            offset += 5;
            bindingData.range = [offset, offset+5];
            bindingData.events.fire('onValueChanged');              
          }
        }
      }]
    },
    content: {
      dtype: 'box',
      layout: 'float-layout',
      dynamic: true,
      data: bindingData,
      defaultItem: {
        dtype: 'box',
        cls: 'dino-border-all dino-corner-all',
        style: {'margin': '3px', 'padding': '3px'},
        binding: function(val) { this.opt('innerText', val); }
      }
    }
  }
});

