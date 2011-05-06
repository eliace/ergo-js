
gridData = new Dino.data.ArrayDataSource();


    
    
var grid = $.dino({
  renderTo: '.preview',
  dtype: 'grid',
  cls: 'dino-border-all dino-corner-all',
  width: 800,
  content: {
    height: 400,//'auto',
    state: 'scrollable',
    style: {'padding-right': '15px'},
  },
//  headerCls: 'dino-bg-highlight',
  tableModel: {
    row: {
      html: '<tr class="base"></tr><tr class="details"></tr>',
      states: {
        'hover': 'hovered'
      },
      defaultItem: {
        layoutSelector: '.base'
      },
      components: {
        details:{
          dtype: 'box',
          layoutSelector: '.details',
          html: '<td colspan="100"></td>',
          content: {
            dtype: 'box',
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
        dtype: 'box',
        cls: 'group',
        defaultItem: {
          style: {'display': 'block'}
        },
        items: [{
          dtype: 'anchor',
//          dataId: 'link',
          cls: 'title',
          binding: function(val) {
            this.el.text(val.title);
          }
        }, {
          dtype: 'text',
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
      format: Dino.format_date,
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
  
}, 'text');    
    
    
/*    
google.load("feeds", "1");

function feeder_init() {
  
  var feed = new google.feeds.Feed("http://lenta.ru/rss");
  feed.load(function(result) {
    if (!result.error) {
      console.log(result);
      
  //    var container = document.getElementById("feed");
  //    for (var i = 0; i < result.feed.entries.length; i++) {
  //      var entry = result.feed.entries[i];
  //      var div = document.createElement("div");
  //      div.appendChild(document.createTextNode(entry.title));
  //      container.appendChild(div);
  //    }
    }
  });
  
}

    
google.setOnLoadCallback(feeder_init);

*/

