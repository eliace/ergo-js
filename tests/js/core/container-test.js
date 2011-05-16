

test('core/container', function(){
	
	var item_a = [];
	for(var i = 0; i < 100; i++) {
		item_a.push({
			text: 'Item '+i
		});
	}
	
	
	var t0 = Dino.timestamp();
	
	var c = new Dino.core.Container({
		html: '<div%a>%c</div>',
		items: item_a,
		defaultItem: {
			dtype: 'widget',
			html: '<div%a>%c</div>',
			cls: 'test-item',
		}
	});
	
//	c.$render('body');
	
	var t1 = Dino.timestamp();
	console.log('Container + 100 items: ' + (t1 - t0));
	
	c.destroy();
	
	
	
	var rows = [];
	for(var i = 0; i < 100; i++) {
		rows.push({
			id: ''+i,
			col1: 'col1',
			col2: 'col2',
			col3: 'col3',
			col4: 'col4',
			col5: 'col5',
			col6: 'col6',
		});
	}
	
	
	var Cell = Dino.core.Widget.extend({
		dtype: 'cell',
		html: '<td%a>%c</td>',
		
		$print_content: function() {
			Cell.superclass.$print_content.apply(this, arguments);
			
			if(this.data) return this.data.get();
		}
	});
	
	
	
	var but = Dino.object({
		dtype: 'widget',
		html: '<button%a>%c</button>',
		text: 'Rebuild',
		events: {
			'click': function(e, w) {


				var ta = Dino.timestamp();
				
				t.body.$bind(new Dino.data.ArrayDataSource(rows));
				
				tb = Dino.timestamp();
				console.log(tb - ta);
				

			}
		}
	});
	
	but.$render('body');
	
	
	
	
	t0 = Dino.timestamp();
	
	var t = new Dino.core.Widget({
		html: '<table%a>%c</table>',
		components: {
			body: {
				dtype: 'container',
				html: '<tbody%a>%c</tbody>',
				dynamic: true,
				data: new Dino.data.ArrayDataSource(rows),
				defaultItem: {
					html: '<tr%a>%c</tr>',
					defaultItem: {
						dtype: 'cell'
//						dtype: 'widget',
//						html: '<td%a>%c</td>'
					},
					items: [{dataId: 'id'}, {dataId: 'col1'}, {dataId: 'col2'}, {dataId: 'col3'}, {dataId: 'col4'}, {dataId: 'col5'}, {dataId: 'col6'}]
				},
			}
		}
	});


	t.$render('body');
	
	t1 = Dino.timestamp();
	console.log(t1 - t0);
	
	
	
	
/*	
	
//	console.log(c.$print());//c.items.get(0).$print());
	
	t0 = Dino.timestamp();
	
	var s = '<table><tbody>';
	for(var i = 0; i < item_a.length; i++) {
		s += '<tr>';
		s += '<td style="width: 100px">Column</td>';
		s += '<td style="width: 100px">Column</td>';
		s += '<td style="width: 100px">Column</td>';
		s += '<td style="width: 100px">Column</td>';
		s += '<td style="width: 100px">Column</td>';
		s += '<td style="width: 100px">Column</td>';
		s += '<td style="width: 100px">Column</td>';
		s += '</tr>';
	}
	s += '</tbody></table>';

	var s = $(s);
	

//	var s = $('<div/>');
//	for(var i = 0; i < item_a.length; i++) {
//		s.append('<div class="test-item">'+item_a[i].text+'</div>');
//	}
//

	$('body').append(s);
	
	t1 = Dino.timestamp();
	console.log(t1 - t0);
	
	s.remove();
	
	
	
	
	
	var rows = [];
	for(var i = 0; i < 100; i++) {
		rows.push({
			items: [
				{text: 'Item'+i, width: 100}, 
				{text: 'column2', width: 120}, 
				{text: 'column3', width: 100}, 
				{dtype: 'widget', components: {content:{dtype:'widget', html: '<input type="checkbox" %a/>'}}, width: 50}, 
				{text: 'column5', width: 150}, 
				{text: 'column5', width: 150}, 
				{text: 'column7', width: 150}]
		});
	}
	
	var n = 0;
	
	var but = Dino.object({
		dtype: 'widget',
		html: '<button%a>%c</button>',
		text: 'Rebuild',
		events: {
			'click': function(e, w) {

				rows = [];
				for(var i = 0; i < 100; i++) {
					rows.push({
						items: [
							{text: '', width: 100, index: true}, 
							{text: 'column2', width: 120}, 
							{text: 'column3', width: 100}, 
							{dtype: 'widget', components: {content:{dtype:'widget', html: '<input type="checkbox" %a/>'}}, width: 50, binding: false}, 
							{text: 'column5', width: 150}, 
							{text: 'column5', width: 150}, 
							{text: 'column7', width: 150}
							]
					});
				}

				var ta = Dino.timestamp();
				
				t.body.removeAllItems();

				
				for(var i = 0; i < 100; i++) {
					t.body.addItem(rows[i]);
				}
			
				t.body.el.append( $(t.body.layout.print()) );

				t.body.items.each(function(item){ 
					item.$build();
				});
				
				tb = Dino.timestamp();
				console.log(tb - ta);
				

			}
		}
	});
	
	but.$render('body');
	
	
	var t = new Dino.core.Widget({
		html: '<table%a>%c</table>',
		components: {
			body: {
				dtype: 'container',
				html: '<tbody%a>%c</tbody>',
				defaultItem: {
					html: '<tr%a>%c</tr>',
					defaultItem: {
						dtype: 'widget',
						html: '<td%a>%c</td>',
						binding: function() {
							this.options.text = (this.options.index) ? n++ : 'Hello, there';
						}
					}
				},
//				items: rows
			}
		}
	});


	t.$render('body');

	t0 = Dino.timestamp();

	
	for(var i = 0; i < 100; i++) {
		t.body.addItem(rows[i]);
	}

	t.body.el.append( $(t.body.layout.print()) );

	
//	$(t.$print());
	
	t1 = Dino.timestamp();
	console.log(t1 - t0);
	
	t.body.items.each(function(item){item.$build();});
	
	
//	console.log(t.body.layout.print());
	
//	t.destroy();
	
//	ok(t.body.el, '');
	
//	console.log(t.$print());
	
*/
	
	
});