


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
	
	$opt: function(o) {
		Dino.widgets.form.InputField.superclass.$opt.call(this, o);
		
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
	
	$events: function(self) {
		Dino.widgets.form.InputField.superclass.$events.call(this, self);
		
		this.el.change(function() {
			self.setValue( self.el.val());
		});

	},
	
	$dataChanged: function() {
		Dino.widgets.form.InputField.superclass.$dataChanged.apply(this);
		
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
	
	$html: function() { return '<input type="text" class="dino-textfield"></input>'; }
		
}, 'textfield');


/**
 * Поле текстового ввода
 * 
 * @class
 * @name Dino.widgets.form.PasswordField
 * @extends Dino.widgets.form.InputField
 */
Dino.declare('Dino.widgets.form.PasswordField', Dino.widgets.form.InputField, /** @lends Dino.widgets.form.PasswordField.prototype */{
	
	$html: function() { return '<input type="password" class="dc-form-password"></input>'; }
		
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
	
	$html: function() { return '<input type="submit" class="dc-form-button"></input>'; },

	$init: function(o) {
		Dino.widgets.form.SubmitButton.superclass.$init.call(this, o);
		
		var self = this;
		
		this.el.click(function(e){
			self.events.fire('onAction', {}, e);
		});
		
//		var button_type = this.options.buttonType || 'button';// ('buttonType' in this.options) this.el.attr('type', this.options.buttonType);
//		this.el.attr('type', button_type);
		
	},
	
	$opt: function(o) {
		Dino.widgets.form.SubmitButton.superclass.$opt.call(this, o);
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
	
	$html: function() { return '<input name="file-input" type="file" class="dc-form-file"></input>'; },
	
	$opt: function(o) {
		Dino.widgets.form.File.superclass.$opt.call(this, o);

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
	
	$html: function() { return '<input type="radio" class="dc-form-radio"></input>'; }
	
}, 'radio');


/**
 * Checkbox
 * 
 * @class
 * @name Dino.widgets.form.Checkbox
 * @extends Dino.widgets.form.InputField
 */
Dino.declare('Dino.widgets.form.Checkbox', Dino.widgets.form.InputField, /** @lends Dino.widgets.form.Checkbox.prototype */{
	
	$html: function() { return '<input type="checkbox" class="dc-form-checkbox"></input>'; },
	
	$events: function(self) {
//		Dino.widgets.form.Checkbox.superclass.$events.call(this, self);
		this.el.change(function(){
			self.setValue(self.el.attr('checked') ? true : false);
			self.events.fire('onAction');
		});
	},
	
	
	$opt: function(o) {
		Dino.widgets.form.Checkbox.superclass.$opt.apply(this, arguments);
		
		if('checked' in o) {
			this.el.attr('checked', o.checked);	
		}
	},
	
	$dataChanged: function() {
		Dino.widgets.form.Checkbox.superclass.$dataChanged.apply(this);
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
	
	$html: function() { return '<textarea class="dc-form-textarea"></textarea>'; }
	
}, 'textarea');



/**
 * @class
 * @name Dino.widgets.form.Label
 * @extends Dino.Widget
 */
Dino.declare('Dino.widgets.form.Label', Dino.Widget, /** @lends Dino.widgets.form.Label.prototype */{

	$html: function() { return '<label class="dc-form-label"></label>'; },
	
	$opt: function(o) {
		Dino.widgets.form.Label.superclass.$opt.call(this, o);
		
		if('text' in o)
			this.el.text(o.text);
		if('forName' in o)
			this.el.attr('for', o.forName);
	},
	
	$dataChanged: function() {
		this.el.text(this.getValue());		
	}
	
}, 'label');



/**
 * @class
 * @name Dino.widgets.form.Anchor
 * @extends Dino.Widget
 */
Dino.declare('Dino.widgets.form.Anchor', 'Dino.Widget', /** @lends Dino.widgets.form.Anchor.prototype */{
	
	$html: function() { return '<a href="#" click="return false" />'; },
	
	$init: function(o) {
		Dino.widgets.form.Anchor.superclass.$init.call(this, o);
		
		var self = this;
		
		this.el.click(function(e){
			self.events.fire('onAction', {}, e);
		});		
	},
	
	$opt: function(o) {
		Dino.widgets.form.Anchor.superclass.$opt.call(this, o);
		
		if('text' in o)
			this.el.text(o.text);
	},
	
	$dataChanged: function() {
		this.el.attr('href',this.getValue());
//		this.el.text(this.getValue());
	}	
	
}, 'anchor');





/**
 * @class
 * @name Dino.widgets.form.SelectOption
 * @extends Dino.Widget
 */
Dino.declare('Dino.widgets.form.SelectOption', 'Dino.Widget', /** @lends Dino.widgets.form.SelectOption.prototype */{
	$html: function() { return '<option/>'; },
	
	$opt: function(o) {
		Dino.widgets.form.SelectOption.superclass.$opt.apply(this, arguments);
		
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
	$html: function() { return '<select/>'; },
	
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
	
	$init: function(o) {
		Dino.widgets.form.Select.superclass.$init.call(this, o);
		
		o.components.optionsList.layout = new Dino.layouts.InheritedLayout({parentLayout: this.layout });
		
		if('options' in o) {
			var items = [];
			for(var i in o.options) items.push({ value: i, text: o.options[i] });
			o.components.optionsList.items = items;
		}
	},
	
	
	$opt: function(o) {
		Dino.widgets.form.Select.superclass.$opt.call(this, o);
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
	
	$events: function(self) {
		Dino.widgets.form.Select.superclass.$events.call(this, self);
		
		this.el.change(function() { self.setValue( self.el.val() ); });
	},
	
	$dataChanged: function() {
		Dino.widgets.form.Select.superclass.$dataChanged.call(this);
		this.el.val( this.getValue() );
	}
	
}, 'select');



