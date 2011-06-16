
/**
 * Какие должны быть элементы управления:
 * 1. Button
 * 2. ToggleButton
 * 3. SplitButton/SplitMenu
 * 4. ComboBox
 * 5. Splitter
 * 
 * 
 */

    
$.dino({
  dtype: 'list',
  renderTo: '.preview',
  items: [{
    dtype: 'group-panel',
    title: 'Нативные виджеты',
		content: {
			dtype: 'list',
	    defaultItem: {
	      style: {'margin': '3px 0'},
	//      layout: 'float',
	      items: [{
	        dtype: 'text-button',
	        icon: 'silk-icon-add',
	        text: 'Button 1',
	      }, {
	        dtype: 'text-button',
	        icon: 'silk-icon-delete',
	        text: false
	      }, {
	        dtype: 'text-button',
	        text: 'Button 3'
	      }, {
	        dtype: 'input'
	      }, {
	        dtype: 'select',
	        options: ['лето', 'осень', 'зима', 'весна']
	      }]    
	    },
	    items: [{
	      dtype: 'control-list',
	    }, {
	      dtype: 'control-list',
	      defaultItem: {
	        cls: 'plain'
	      }
	    }]    
		}
  }, {
    dtype: 'group-panel',
    title: 'Dino-виджеты',
		content: {
			dtype: 'list',
	    defaultItem: {
	      dtype: 'control-list',
	      items: [/*{
	        dtype: 'split-button',
	        components: {
	          actionButton: {
	            innerText: 'Africa',
	            width: 80
	          },
	          listButton: {
	            width: 24
	          }
	        },
	        list: [{
	          text: 'Африка',
	          tag: 'africa'
	        }, {
	          text: 'Азия',
	          tag: 'asia'
	        }, {
	          text: 'Европа',
	          tag: 'europe'
	        }, {
	          text: 'Америка',
	          tag: 'america'
	        }]
	      }, {
	        dtype: 'box',
	        width: 2,
	        height: 24,
	        cls: 'dino-split',
	        innerHtml: '&nbsp;'
	      }*/
				'-']
	    },
	    items: [{
	      dtype: 'control-list',
	    }]    
		}
  }]
});


    
