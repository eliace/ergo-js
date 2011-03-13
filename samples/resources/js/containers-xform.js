    

var xformData = {
  text: 11,
  text2: '16.12.2010'
};


var listData = [{
  name: 'Africa'
}, {
  name: 'Eurasia'
}, {
  name: 'America'
}, {
  name: 'Australia'
}, {
  name: 'Antarctica'
}];



  
$.dino({
  dtype: 'box',
  renderTo: '.preview',
  layout: 'simple-form-layout',
//  layout: {
//    dtype: 'form-layout',
//    labelWidth: 200
//  },
  data: xformData,
  defaultItem: {
//    style: {'padding': '5px 0'}
  },
  items: [{
    label: 'Поле с кнопкой:',
    dataId: 'text',
    components: {
      input: {
        dtype: 'textfield',
        cls: 'tb-text dino-border-all dino-corner-left dino-border-no-right'
      },
      button: {
        dtype: 'text-button',        
        cls: 'tb-button dino-border-all dino-corner-right dino-bg-highlight',
        binding: false,
        icon: 'led-icon-find',
        text: false,
//        width: 24,
      }
    }
  }, {
    label: 'Поле с кнопкой 2:',
    dtype: 'box',
    cls: 'tb2',
    dataId: 'text2',
    layout: 'dock-layout',
    components: {
      input: {
        dtype: 'textfield'
      },
      button: {
        dtype: 'icon',
        cls: 'led-icon-calendar_1 dino-clickable',
        dock: 'right'
      }
    }
  }, {
    dtype: 'box',
    label: 'Поле со списком',
    style: {'position': 'relative'},
    data: listData,
    components: {
      input: {
        dtype: 'textfield',
        cls: 'tb-text dino-border-all dino-corner-left dino-border-no-right',
        binding: false
      },
      button: {
        dtype: 'text-button',
        cls: 'tb3-button dino-border-all dino-corner-right dino-clickable dino-bg-highlight',
        binding: false,
        text: false,
        icon: 'ui-icon ui-icon-triangle-1-s',
        onAction: function() {
          
          var dd = this.parent.dropdown;
          
          dd.el.width(this.parent.input.el.width());
          dd.show(0, this.parent.el.height());
          
          var glassPanel = $('<div class="glass-panel"></div>')
          
          glassPanel.bind('click', function(){
            dd.hide();
            glassPanel.remove();
          });          
          
          $('body').append(glassPanel);
        }
      },
      dropdown: {
        dtype: 'dropdown-box',
        cls: 'dino-border-all tb3-dropdown',
        dynamic: true,
        defaultItem: {
          dtype: 'text-item',
          style: {'display': 'block'},
          cls: 'list-item',
          dataId: 'name',
          icon: 'led-icon-world',
          state: 'clickable',
          onClick: function() {
            this.parent.hide();
            $('.glass-panel').remove();
            this.parent.parent.input.el.val(this.data.val());
          }
        }
//        onShow: function() {
//        }
      }
    }
  }, {
		dtype: 'box',
		style: {'display': 'inline'},
		layout: {
			dtype: 'dock-layout',
			updateMode: 'auto'
		},
		items: [{
			dtype: 'textfield',
			cls: 'dino-border-all dino-border-no-right dino-corner-left',
			style: {'font-size': '14px', 'padding': '3px 0', 'outline': 'none'}
		}, {
			dock: 'right-center',
			dtype: 'box',
			defaultItem: {
				style: {'display': 'block'},
				cls: 'dino-border-all',
				height: 12,
				width: 12
			},
			items: [{
				dtype: 'button',
				cls: 'led-icon led-icon-cog dino-corner-right-top'
			}, {
				dtype: 'button',
				cls: 'led-icon led-icon-cog dino-corner-right-bottom'
			}]
		}]
	}
  ]
});      


