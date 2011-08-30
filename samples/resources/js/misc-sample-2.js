

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


$.ergo({
  renderTo: '.preview',
  etype: 'panel',
  cls: 'dino-border-all',
  title: 'Листалка',
  width: 850,
  
  content: {
    etype: 'box',
    
    tag: 'widget-2',
    
    extensions: [{
      updateView: function() {
        this.content.el.attr('src', news[news_index].href);
        
        this.contentSelector.item(0).$dataChanged();
        this.contentSelector.item(1).selection.add( this.contentSelector.item(1).items.get(news_index) );
      },
      changeView: function(tag) {
        this.toolbar.selection.add(this.toolbar.item({'tag': tag}));
        this.contentSelector.setActive({'tag': tag});
      }
    }],
    
    onCreated: function() {
      this.changeView('short');
      this.updateView();
    },
    
    components: {
      toolbar: {
        weight: 1,
        etype: 'control-list',
        cls: 'dino-border-bottom',
        extensions: [Ergo.Selectable],
        defaultItem: {
          style: {'margin': 0},
          cls: 'dino-border-all',
          onAction: function() {
            this.getParent({tag: 'widget-2'}).changeView(this.tag);
          }
        },
        items: [{
          etype: 'text-button',
          text: 'Компактно',
          tag: 'short',
          cls: 'dino-corner-left'
        }, {
          etype: 'text-button',
          text: 'Развернуто',
          tag: 'full',
          cls: 'dino-corner-right'
        }]
      },
      content: {
        weight: 3,
        etype: 'box',
        html: '<iframe style="display: block"/>',
        cls: 'dino-border-none',
        width: '100%',
        height: 'auto',
      },
      contentSelector: {
        weight: 2,
        etype: 'list',
        layout: 'stack',
        cls: 'dino-border-bottom',
        style: {'background-color': '#fff'},
        data: news,
        items: [{
          etype: 'list',
          tag: 'short',
          layout: {
            etype: 'column-layout',
            valign: 'middle'
          },
          style: {'text-align': 'center'},
          items: [{
            etype: 'text',
            format: function(val) {
              return val[news_index].name;
            }
          }, {
            etype: 'action-icon',
            cls: 'icon32 icon-back',
            width: 32,
            onAction: function() {
              if(news_index > 0) {
                news_index--;
                this.getParent({tag: 'widget-2'}).updateView();
              }
            }
          }, {
            etype: 'action-icon',
            cls: 'icon32 icon-next',
            width: 32,
            onAction: function() {
              if(news_index+1 < news.length) {
                news_index++;
                this.getParent({tag: 'widget-2'}).updateView();
              }
            }
          }]
        }, {
          etype: 'list-view',
          tag: 'full',
          dynamic: true,
          extensions: [Ergo.Selectable],
          defaultItem: {
            etype: 'text-item',
            icon: 'silk-icon-bullet-orange',
            dataId: 'name',
            onAction: function() {
              news_index = this.data.source.id;
              this.getParent({tag: 'widget-2'}).updateView();
            }
          }
        }]
      }
    }
  }
});


