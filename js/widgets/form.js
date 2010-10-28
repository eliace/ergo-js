

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
		if('value' in o) this.el.attr('value', o.value);
		if('disabled' in o) this.el.attr('disabled', o.disabled);
		
		if(o.rawValueOnFocus){
			var self = this;
			this.el.focus(function() { self.hasFocus = true; self.el.val(self.getRawValue()) });
			this.el.blur(function() { self.hasFocus = false; self.el.val(self.getValue()) });
		}
		
	},
	
	_events: function(self) {
		Dino.widgets.form.InputField.superclass._events.call(this, self);
		
		this.el.change(function() {
			self.setValue( self.el.val());
		});

	},
	
	_dataChanged: function() {
		Dino.widgets.form.InputField.superclass._dataChanged.apply(this);
		
		if(this.options.rawValueOnFocus && this.hasFocus) 
			this.el.val( this.getRawValue() );
		else
			this.el.val( this.getValue() );
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
	
	_html: function() { return '<input type="submit" class="dc-form-button"></input>'; },

	_init: function(o) {
		Dino.widgets.form.Button.superclass._init.call(this, o);
		
		var self = this;
		
		this.el.click(function(e){
			self.events.fire('onAction', {}, e);
		});
		
//		var button_type = this.options.buttonType || 'button';// ('buttonType' in this.options) this.el.attr('type', this.options.buttonType);
//		this.el.attr('type', button_type);
		
	},
	
	_opt: function(o) {
		Dino.widgets.form.Button.superclass._opt.call(this, o);
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
	
	_events: function(self) {
//		Dino.widgets.form.Checkbox.superclass._events.call(this, self);
		this.el.change(function(){
			self.setValue(self.el.attr('checked') ? true : false);
			self.events.fire('onAction');
		});
	},
	
	_dataChanged: function() {
		Dino.widgets.form.Checkbox.superclass._dataChanged.apply(this);
		this.el.attr('checked', this.getValue() );
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
	
	_dataChanged: function() {
		this.el.text(this.getValue());		
	}
	
}, 'label');


Dino.declare('Dino.widgets.form.Anchor', 'Dino.Widget', {
	_html: function() { return '<a href="#" click="return false" />'; },
	
	_init: function(o) {
		Dino.widgets.form.Anchor.superclass._init.call(this, o);
		
		var self = this;
		
		this.el.click(function(e){
			self.events.fire('onAction', {}, e);
		});		
	},
	
	_opt: function(o) {
		Dino.widgets.form.Anchor.superclass._opt.call(this, o);
		
		if('text' in o)
			this.el.text(o.text);
	}
	
}, 'anchor');




Dino.declare('Dino.widgets.form.Select', 'Dino.Widget', {
	_html: function() { return '<select/>'; },
	
	_opt: function(o) {
		Dino.widgets.form.Select.superclass._opt.call(this, o);
		
		if('options' in o){
			for(var i in o.options){
				var option_el = $('<option/>');
				option_el.attr('value', i);
				option_el.text(o.options[i]);
				this.el.append(option_el);
			}
		}
		
		if('disabled' in o) this.el.attr('disabled', o.disabled);
		
	},
	
	_events: function(self) {
		Dino.widgets.form.Select.superclass._events.call(this, self);
		
		this.el.change(function() { self.setValue( self.el.val() ); });
	},
	
	_dataChanged: function() {
		Dino.widgets.form.Select.superclass._dataChanged.call(this);
		this.el.val( this.getValue() );
	}
	
}, 'select');



