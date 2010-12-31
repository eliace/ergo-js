


/**
 * @name Dino.widgets.form
 * @namespace 
 */



/**
 * Базовый объект для полей ввода.
 *
 * @class
 * @name Dino.widgets.form.InputField
 * @extends Dino.Widget
 */
Dino.declare('Dino.widgets.form.InputField', Dino.Widget, /** @lends Dino.widgets.form.InputField.prototype */{
	
	_opt: function(o) {
		Dino.widgets.form.InputField.superclass._opt.call(this, o);
		
		if('text' in o) this.el.val(o.text);
		if('readonly' in o) this.el.attr('readonly', o.readonly);
		if('name' in o) this.el.attr('name', o.name);
		if('value' in o) this.el.attr('value', o.value);
		if('disabled' in o) this.el.attr('disabled', o.disabled);
		if('tabindex' in o) this.el.attr('tabindex', o.tabindex);
		
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
 * 
 * @class
 * @name Dino.widgets.form.TextField
 * @extends Dino.widgets.form.InputField
 */
Dino.declare('Dino.widgets.form.TextField', Dino.widgets.form.InputField, /** @lends Dino.widgets.form.TextField.prototype */{
	
	_html: function() { return '<input type="text" class="dc-form-textfield"></input>'; }
		
}, 'textfield');


/**
 * Поле текстового ввода
 * 
 * @class
 * @name Dino.widgets.form.PasswordField
 * @extends Dino.widgets.form.InputField
 */
Dino.declare('Dino.widgets.form.PasswordField', Dino.widgets.form.InputField, /** @lends Dino.widgets.form.PasswordField.prototype */{
	
	_html: function() { return '<input type="password" class="dc-form-password"></input>'; }
		
}, 'password');


/**
 * Кнопка.
 * 
 * @class
 * @name Dino.widgets.form.SubmitButton
 * @extends Dino.widgets.form.InputField
 * 
 */
Dino.declare('Dino.widgets.form.SubmitButton', Dino.widgets.form.InputField, /** @lends Dino.widgets.form.SubmitButton.prototype */{
	
	_html: function() { return '<input type="submit" class="dc-form-button"></input>'; },

	_init: function(o) {
		Dino.widgets.form.SubmitButton.superclass._init.call(this, o);
		
		var self = this;
		
		this.el.click(function(e){
			self.events.fire('onAction', {}, e);
		});
		
//		var button_type = this.options.buttonType || 'button';// ('buttonType' in this.options) this.el.attr('type', this.options.buttonType);
//		this.el.attr('type', button_type);
		
	},
	
	_opt: function(o) {
		Dino.widgets.form.SubmitButton.superclass._opt.call(this, o);
	}
}, 'submit-button');


/**
 * Файл
 *
 * @class
 * @name Dino.widgets.form.File
 * @extends Dino.widgets.form.InputField
 */
Dino.declare('Dino.widgets.form.File', Dino.widgets.form.InputField, /** @lends Dino.widgets.form.File.prototype */{
	
	_html: function() { return '<input name="file-input" type="file" class="dc-form-file"></input>'; },
	
	_opt: function(o) {
		Dino.widgets.form.File.superclass._opt.call(this, o);

		if('name' in o) this.el.attr('name', o.name);
	}
	
}, 'file');


/**
 * Radio
 * 
 * @class
 * @name Dino.widgets.form.Radio
 * @extends Dino.widgets.form.InputField
 */
Dino.declare('Dino.widgets.form.Radio', Dino.widgets.form.InputField, /** @lends Dino.widgets.form.Radio.prototype */{
	
	_html: function() { return '<input type="radio" class="dc-form-radio"></input>'; }
	
}, 'radio');


/**
 * Checkbox
 * 
 * @class
 * @name Dino.widgets.form.Checkbox
 * @extends Dino.widgets.form.InputField
 */
Dino.declare('Dino.widgets.form.Checkbox', Dino.widgets.form.InputField, /** @lends Dino.widgets.form.Checkbox.prototype */{
	
	_html: function() { return '<input type="checkbox" class="dc-form-checkbox"></input>'; },
	
	_events: function(self) {
//		Dino.widgets.form.Checkbox.superclass._events.call(this, self);
		this.el.change(function(){
			self.setValue(self.el.attr('checked') ? true : false);
			self.events.fire('onAction');
		});
	},
	
	
	_opt: function(o) {
		Dino.widgets.form.Checkbox.superclass._opt.apply(this, arguments);
		
		if('checked' in o) {
			this.el.attr('checked', o.checked);	
		}
	},
	
	_dataChanged: function() {
		Dino.widgets.form.Checkbox.superclass._dataChanged.apply(this);
		this.el.attr('checked', this.getValue() );
	},
	
	isChecked: function() {
		return this.el.attr('checked');
	}
	
		
}, 'checkbox');





/**
 * TextArea
 * 
 * @class
 * @name Dino.widgets.form.TextArea
 * @extends Dino.widgets.form.TextField
 */
Dino.declare('Dino.widgets.form.TextArea', Dino.widgets.form.TextField, /** @lends Dino.widgets.form.TextArea.prototype */{
	
	_html: function() { return '<textarea class="dc-form-textarea"></textarea>'; }
	
}, 'textarea');



/**
 * @class
 * @name Dino.widgets.form.Label
 * @extends Dino.Widget
 */
Dino.declare('Dino.widgets.form.Label', Dino.Widget, /** @lends Dino.widgets.form.Label.prototype */{

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



/**
 * @class
 * @name Dino.widgets.form.Anchor
 * @extends Dino.Widget
 */
Dino.declare('Dino.widgets.form.Anchor', 'Dino.Widget', /** @lends Dino.widgets.form.Anchor.prototype */{
	
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





/**
 * @class
 * @name Dino.widgets.form.SelectOption
 * @extends Dino.Widget
 */
Dino.declare('Dino.widgets.form.SelectOption', 'Dino.Widget', /** @lends Dino.widgets.form.SelectOption.prototype */{
	_html: function() { return '<option/>'; },
	
	_opt: function(o) {
		Dino.widgets.form.SelectOption.superclass._opt.apply(this, arguments);
		
		if('value' in o) this.el.attr('value', o.value);
		if('text' in o) this.el.text(o.text);
	}
	
	
}, 'select-option')



/**
 * @class
 * @name Dino.widgets.form.Select
 * @extends Dino.Container
 */
Dino.declare('Dino.widgets.form.Select', 'Dino.Container', /** @lends Dino.widgets.form.Select.prototype */{
	_html: function() { return '<select/>'; },
	
	defaultOptions: {
		components: {
			optionsList: {
				dtype: 'container',
				defaultItem: {
					dtype: 'select-option'
				}
			}
		}
	},
	
	_init: function(o) {
		Dino.widgets.form.Select.superclass._init.call(this, o);
		
		o.components.optionsList.layout = new Dino.layouts.InheritedLayout({parentLayout: this.layout });
		
		if('options' in o) {
			var items = [];
			for(var i in o.options) items.push({ value: i, text: o.options[i] });
			o.components.optionsList.items = items;
		}
	},
	
	
	_opt: function(o) {
		Dino.widgets.form.Select.superclass._opt.call(this, o);
/*		
		if('options' in o){
			this.el.empty();
			for(var i in o.options){
				var option_el = $('<option/>');
				option_el.attr('value', i);
				option_el.text(o.options[i]);
				this.el.append(option_el);
			}
		}
*/		
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



