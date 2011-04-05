
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
  dtype: 'box',
  renderTo: '.preview',
  items: [{
    dtype: 'group-box',
    title: 'Нативные виджеты',
    defaultItem: {
      style: {'margin': '3px 0'},
//      layout: 'float-layout',
      items: [{
        dtype: 'text-button',
        icon: 'led-icon-add',
        text: 'Button 1',
      }, {
        dtype: 'text-button',
        icon: 'led-icon-delete',
//        text: false
      }, {
        dtype: 'text-button',
        text: 'Button 3'
      }, {
        dtype: 'textfield'
      }, {
        dtype: 'select',
        options: {
          '1': 'лето',
          '2': 'осень',
          '3': 'зима',
          '4': 'весна',
        }
      }]    
    },
    items: [{
      dtype: 'control-box',
    }, {
      dtype: 'control-box',
      defaultItem: {
        cls: 'plain'
      }
    }]    
  }, {
    dtype: 'group-box',
    title: 'Dino-виджеты',
    defaultItem: {
      dtype: 'control-box',
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
      }, */{
        dtype: 'box',
        width: 2,
        height: 24,
        cls: 'dino-split',
        innerHtml: '&nbsp;'
      }]
    },
    items: [{
      dtype: 'control-box',
    }]    
  }]
});


    
