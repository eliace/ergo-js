

var news = [{
  name: 'Страница 1',
  href: 'http://progit.org/book/ru/ch2-1.html'
}, {
  name: 'Страница 2',  
  href: 'http://progit.org/book/ru/ch2-2.html'
}, {
  name: 'Страница 3',  
  href: 'http://progit.org/book/ru/ch2-3.html'
}, {
  name: 'Страница 4',  
  href: 'http://progit.org/book/ru/ch2-4.html'
}, {
  name: 'Страница 5',  
  href: 'http://progit.org/book/ru/ch2-5.html'
}]

var news_index = 0;


$.dino({
  renderTo: '.preview',
  dtype: 'panel',
  cls: 'dino-border-all',
  title: 'Листалка',
  width: 850,
  
  content: {
    dtype: 'box',
    
    tag: 'widget-2',
    
    extensions: [{
      updateView: function() {
        this.content.el.attr('src', news[news_index].href);
        
        this.contentSelector.getItem(0).$dataChanged();
        this.contentSelector.getItem(1).selection.add( this.contentSelector.getItem(1).getItem(news_index) );
      },
			changeView: function(tag) {
	      this.toolbar.selection.add(this.toolbar.getItem(tag));
	      this.contentSelector.layout.activate(tag);				
			}
    }],
    
    onCreated: function() {
      this.changeView('short');
      this.updateView();
    },
    
    components: {
      toolbar: {
        weight: 1,
        dtype: 'control-box',
        cls: 'dino-border-bottom',
        extensions: [Dino.Selectable],
        defaultItem: {
          style: {'margin': 0},
          cls: 'dino-border-all',
					onAction: function() {
            this.getParent('widget-2').changeView(this.tag);
					}
        },
        items: [{
          dtype: 'text-button',
          text: 'Компактно',
					tag: 'short',
          cls: 'dino-corner-left'
        }, {
          dtype: 'text-button',
          text: 'Развернуто',
					tag: 'full',
          cls: 'dino-corner-right'
        }]
      },
      content: {
        weight: 3,
        dtype: 'box',
        html: '<iframe style="display: block"/>',
        cls: 'dino-border-none',
        width: '100%',
        height: 'auto',
      },
      contentSelector: {
        weight: 2,
        dtype: 'box',
        layout: 'stack',
        cls: 'dino-border-bottom',
        style: {'background-color': '#fff'},
        data: news,
        items: [{
          dtype: 'box',
					tag: 'short',
          layout: {
            dtype: 'column-layout',
            valign: 'middle'
          },
          style: {'text-align': 'center'},
          items: [{
            dtype: 'text',
            format: function(val) {
              return val[news_index].name;
            }
          }, {
            dtype: 'action-icon',
            cls: 'icon32 icon-back',
            width: 32,
            onAction: function() {
              if(news_index > 0) {
                news_index--;
                this.getParent('widget-2').updateView();
              }
            }
          }, {
            dtype: 'action-icon',
            cls: 'icon32 icon-next',
            width: 32,
            onAction: function() {
              if(news_index+1 < news.length) {
                news_index++;
                this.getParent('widget-2').updateView();
              }
            }
          }]
        }, {
          dtype: 'list-box',
					tag: 'full',
          dynamic: true,
          extensions: [Dino.Selectable],
          defaultItem: {
            dtype: 'text-item',
            icon: 'silk-icon-bullet-orange',
            dataId: 'name',
            onAction: function() {
              news_index = this.data.source.id;
              this.getParent('widget-2').updateView();
            }
          }
        }]
      }
    }
  }
});


