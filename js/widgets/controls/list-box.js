
//= require "select-box"
//= require <widgets/natives/list>

Ergo.declare('Ergo.widgets.ListBox', 'Ergo.widgets.SelectBox', {
	
	defaults: {
		cls: 'e-list-box',
		
		components: {
			list: {
				etype: 'list'
			}
		}
		
	}
	
}, 'list-box');
