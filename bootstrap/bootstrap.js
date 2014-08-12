

//= require <layouts/grid>

//= require <mixins/control-feedback>
//= require <mixins/control-help>
//= require <mixins/control-label>

//= require <widgets/addons>
//= require <widgets/alert>
//= require <widgets/badge>
//= require <widgets/breadcrumb>
//= require <widgets/button-group>
//= require <widgets/buttons>
//= require <widgets/button-toolbar>
//= require <widgets/dropdown>
//= require <widgets/dropdown-menu>
//= require <widgets/embed>
//= require <widgets/form-controls>
//= require <widgets/forms>
//= require <widgets/glyphicon>
//= require <widgets/input-group>
//= require <widgets/jumbotron>
//= require <widgets/label>
//= require <widgets/list>
//= require <widgets/list-group>
//= require <widgets/media>
//= require <widgets/nav>
//= require <widgets/navbar>
//= require <widgets/pager>
//= require <widgets/pagination>
//= require <widgets/panel>
//= require <widgets/progress>
//= require <widgets/split-dropdown>
//= require <widgets/table>
//= require <widgets/thumbnail>
//= require <widgets/well>
//= require <widgets/modal>





/*
Ergo.defineClass('Bootstrap.widgets.FormGroup', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'form-group',
		defaultItem: {
			cls: 'form-control'
		},
		defaultComponent: {
			cls: 'form-control'
		}
		
	}
	
}, 'bootstrap:form-group');
*/








Ergo.$bootstrap = Ergo.object;

// Ergo.$bootstrap = function(o, etype) {
	// return Ergo.object(o, 'bootstrap:'+etype);
// };

$.bootstrap = Ergo.$bootstrap;



