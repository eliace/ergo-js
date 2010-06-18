


/**
 * Базовый объект для полей ввода.
 * 
 * Параметры:
 * 	text
 * 	readonly
 * 	name
 */
Dino.declare('Dino.widgets.form.InputField', Dino.Widget, {
	
	_opt: function(o) {
		Dino.widgets.form.InputField.superclass._opt.call(this, o);
		
		if('text' in o) this.el.val(o.text);
		if('readonly' in o) this.el.attr('readonly', o.readonly);
		if('name' in o) this.el.attr('name', o.name);
		
	},
	
	_init: function(o) {
		Dino.widgets.form.InputField.superclass._init.call(this, o);
		
		var self = this;
		
		this.el.change(function() { self.setValue( self.el.val() ); });
	},
	
	dataChanged: function() {
		this.el.val( this.data.getValue() );
	}
	
	
	
});


/**
 * Поле текстового ввода
 */
Dino.declare('Dino.widgets.form.TextField', Dino.widgets.form.InputField, {
	
	_html: function() { return '<input type="text" class="dc-form-textfield"></input>'; }
		
}, 'textfield');


/**
 * Кнопка.
 * 
 * Параметры:
 * 
 * События:
 * 	onAction
 * 
 */
Dino.declare('Dino.widgets.form.Button', Dino.widgets.form.InputField, {
	
	_html: function() { return '<input type="button" class="dc-form-button"></input>'; },
	
	_opt: function(o) {
		Dino.widgets.form.Button.superclass._opt.call(this, o);
		
		var self = this;
		
		this.el.click(function(e){
			self.fireEvent('onAction', new Dino.events.Event({}, e));
		});		
	}
}, 'form-button');


/**
 * Файл
 * 
 * Параметры:
 * 	name
 * 
 */
Dino.declare('Dino.widgets.form.File', Dino.widgets.form.InputField, {
	
	_html: function() { return '<input name="file-input" type="file" class="dc-form-file"></input>'; },
	
	_opt: function(o) {
		Dino.widgets.form.File.superclass._opt.call(this, o);

		if('name' in o) this.el.attr('name', o.name);
	}
	
}, 'file');


/**
 * Radio
 */
Dino.declare('Dino.widgets.form.Radio', Dino.widgets.form.InputField, {
	
	_html: function() { return '<input type="radio" class="dc-form-radio"></input>'; }
	
}, 'radio');


/**
 * Checkbox
 */
Dino.declare('Dino.widgets.form.Checkbox', Dino.widgets.form.InputField, {
	
	_html: function() { return '<input type="checkbox" class="dc-form-checkbox"></input>'; },
	
	dataChanged: function() {
		this.el.attr('checked', this.data.getValue() );
	}
	
		
}, 'checkbox');





/**
 * TextArea
 */
Dino.declare('Dino.widgets.form.TextArea', Dino.widgets.form.TextField, {
	
	_html: function() { return '<textarea class="dc-form-textarea"></textarea>'; }
	
}, 'textarea');




Dino.declare('Dino.widgets.form.Label', Dino.Widget, {

	_html: function() { return '<label class="dc-form-label"></label>'; },
	
	_opt: function(o) {
		Dino.widgets.form.Label.superclass._opt.call(this, o);
		
		if('text' in o)
			this.el.text(o.text);
		if('forName' in o)
			this.el.attr('for', o.forName);
	},
	
	dataChanged: function() {
		this.el.text(this.data.getValue());		
	}
	
}, 'label');




