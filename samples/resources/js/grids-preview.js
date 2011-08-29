
var gridData = new Ergo.core.DataSource([]);


    
    
var grid = $.ergo({
  renderTo: '.preview',
  etype: 'table-grid',
  cls: 'dino-border-all dino-corner-all',
  width: 800,
  tableModel: {
    row: {
      html: '<tr class="base"></tr><tr class="details"></tr>',
      states: {
        'hover': 'hovered'
      },
      defaultItem: {
        layoutSelector: function() { return this.el.filter('.base'); } //'.base'
      },
      components: {
        details:{
          etype: 'box',
//          layoutSelector: '.details',
           layoutSelector: function() { return this.el.filter('.details'); },
          html: '<td colspan="2"></td>',
          content: {
            etype: 'box',
            dataId: 'description',
            cls: 'description',
            binding: function(val) { this.opt('innerText', val); }
          }
        }
      }
    },
    cell: {
      cls: 'dino-border-none'
    },
    columns: [{
      content: {
        etype: 'list',
        cls: 'group',
        defaultItem: {
          style: {'display': 'block'}
        },
        items: [{
          etype: 'anchor',
//          dataId: 'link',
          cls: 'title',
          binding: function(val) {
            this.el.text(val.title);
          }
        }, {
          etype: 'text',
          dataId: 'category',
          cls: 'category',
          format: function(val) {return 'Категория: '+val;}
        }]
      },
      header: 'Заголовок',
      cls: 'title-column'
    }, {
      dataId: 'pubDate',
      header: 'Дата',
      format: Ergo.format_date,
      width: 160
    }]
  },
  data: gridData
});
    
    
$.get('ajax/lenta.ru.rss', function(xml){
  var feed = [];
  $(xml).find('item').each(function(i, item){
    item = $(item);
    feed.push({
      title: item.find('title').text(),
      link: item.find('link').text(),
      description: item.find('description').text(),
      pubDate: new Date(item.find('pubDate').text()),
      category: item.find('category').text()
    });
  });
  gridData.set(feed);
  
  grid.$layoutChanged();
  
}, 'text');    
    
    

