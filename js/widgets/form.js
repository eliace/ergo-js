



Dino.declare('Dino.widgets.form.InputField', Dino.Widget, {
	
	options: function(o) {
		Dino.widgets.form.InputField.superclass.options.call(this, o);
		
		if('text' in o) this.el.val(o.text);
		if('readonly' in o) this.el.attr('readonly', o.readonly);
		if('name' in o) this.el.attr('name', o.name);
		
	},
	
	build: function(o) {
		
		var self = this;
		
		this.el.change(function() { self.setValue( self.el.val() ); });
	}
	
	
	
});



Dino.declare('Dino.widgets.form.TextField', Dino.widgets.form.InputField, {
	
	render_html: function() { return '<input type="text" class="dc-form-textfield"></input>'; }
		
}, 'textfield');



Dino.declare('Dino.widgets.form.Button', Dino.widgets.form.InputField, {
	
	render_html: function() { return '<input type="button" class="dc-form-button"></input>'; },
	
	options: function(o) {
		Dino.widgets.form.Button.superclass.options.call(this, o);
		
		var self = this;
		
		if('action' in o)
			this.el.click(function(e) { o.action.call(this, e, self); });
	}
}, 'button');



Dino.declare('Dino.widgets.form.File', Dino.widgets.form.InputField, {
	
	render_html: function() { return '<input type="file" class="dc-form-file"></input>'; },
	
	build: function(o) {
		Dino.widgets.form.File.superclass.build.call(this, o);
		
		var name = this.el.attr('name');
		if(!name) this.el.attr('name', 'file-input');
	}
	
}, 'file');


/**
 * Radio
 */
Dino.declare('Dino.widgets.form.Radio', Dino.widgets.form.InputField, {
	
	render_html: function() { return '<input type="radio" class="dc-form-radio"></input>'; }
	
}, 'radio');


/**
 * Checkbox
 */
Dino.declare('Dino.widgets.form.Checkbox', Dino.widgets.form.InputField, {
	
	render_html: function() { return '<input type="checkbox" class="dc-form-checkbox"></input>'; }
	
}, 'checkbox');





/**
 * TextArea
 */
Dino.declare('Dino.widgets.form.TextArea', Dino.widgets.form.TextField, {
	
	render_html: function() { return '<textarea class="dc-form-textarea"></textarea>'; }
	
}, 'textarea');




Dino.declare('Dino.widgets.form.Label', Dino.Widget, {

	render_html: function() { return '<label class="dc-form-label"></label>'; },
	
	options: function(o) {
		Dino.widgets.form.Label.superclass.options.call(this, o);
		
		if('text' in o)
			this.el.text(o.text);
		if('forName' in o)
			this.el.attr('for', o.forName);
	}
	
}, 'label');










