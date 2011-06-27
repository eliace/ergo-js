
//= require <core/widget>




Dino.declare('Dino.widgets.Input', 'Dino.core.Widget', /** @lends Dino.widgets.form.InputField.prototype */{
	
	defaults: {
		html: '<input type="text"/>'
	},
	
	$opt: function(o) {
		Dino.widgets.Input.superclass.$opt.call(this, o);
		
		if('text' in o) this.el.val(o.text);
		if('readOnly' in o) this.el.attr('readonly', o.readOnly);
		if('name' in o) this.el.attr('name', o.name);
		if('value' in o) this.el.prop('value', o.value);
		if('disabled' in o) this.el.prop('disabled', o.disabled);
		if('tabIndex' in o) this.el.attr('tabindex', o.tabIndex);

	}
	
	
}, 'input');




Dino.declare('Dino.widgets.TextInput', 'Dino.widgets.Input', /** @lends Dino.widgets.form.PasswordField.prototype */{

	$opt: function(o) {
		Dino.widgets.TextInput.superclass.$opt.call(this, o);
		
		var self = this;
		
		if(o.changeOnBlur) {
			this.el.blur(function() { 
				self.setValue(self.el.val(), 'blur'); 
			});			
		}
		
		if(o.rawValueOnFocus){
			this.el.focus(function() { self.hasFocus = true; self.el.val(self.getRawValue()); self.states.set('raw-value'); });
			this.el.blur(function() { self.hasFocus = false; self.el.val(self.getValue()); self.states.clear('raw-value'); });
		}

//		if(o.initText){
//			this.el.focus(function() { self.hasFocus = true; self.el.val(self.getRawValue()) });
//			this.el.blur(function() { self.hasFocus = false; self.el.val(self.getValue()) });
//		}
		
	},
		
	$dataChanged: function() {
		Dino.widgets.TextInput.superclass.$dataChanged.apply(this);
		
		if(this.options.rawValueOnFocus && this.hasFocus) 
			this.el.val( this.getRawValue() );
		else
			this.el.val( this.getValue() );
	},
	
	$events: function(self) {
		Dino.widgets.Input.superclass.$events.call(this, self);

		this.el.keydown(function(e) {
			if(!self.options.readOnly) {
				if(e.keyCode == 13) 
					self.setValue( self.el.val(), 'enterKey');
				else if(e.keyCode == 27) 
					self.el.val(self.getValue());				
			}
		});
		
//		this.el.change(function() {
//			self.setValue( self.el.val());
//		});
	}
	
		
}, 'text-input');





/**
 * Поле текстового ввода
 * 
 * @class
 * @name Dino.widgets.form.PasswordField
 * @extends Dino.widgets.form.InputField
 */
Dino.declare('Dino.widgets.Password', 'Dino.widgets.TextInput', /** @lends Dino.widgets.form.PasswordField.prototype */{
	
	defaults: {
		html: '<input type="password"/>'
	}
		
}, 'password');


Dino.declare('Dino.widgets.Submit', 'Dino.widgets.Input', {
	
	defaults: {
		html: '<input type="submit"/>'
	},
	
	$init: function(o) {
		Dino.widgets.Submit.superclass.$init.call(this, o);
		
		var self = this;
		
		this.el.click(function(e){
			self.events.fire('onAction', {}, e);
		});
		
//		var button_type = this.options.buttonType || 'button';// ('buttonType' in this.options) this.el.attr('type', this.options.buttonType);
//		this.el.attr('type', button_type);
		
	}
	
}, 'submit');


/**
 * Файл
 *
 * @class
 * @name Dino.widgets.form.File
 * @extends Dino.widgets.form.InputField
 */
Dino.declare('Dino.widgets.File', Dino.widgets.TextInput, {
	
	defaults: {
		html: '<input name="file" type="file"/>'
	},
	
	$opt: function(o) {
		Dino.widgets.File.superclass.$opt.call(this, o);

		if('name' in o) this.el.attr('name', o.name);
	}
	
}, 'file');



/**
 * Checkbox
 * 
 * @class
 * @name Dino.widgets.form.Checkbox
 * @extends Dino.widgets.form.InputField
 */
Dino.declare('Dino.widgets.Checkbox', Dino.widgets.Input, /** @lends Dino.widgets.form.Checkbox.prototype */{
	
	defaults: {
		html: '<input type="checkbox"></input>'
	},
	
	$events: function(self) {
//		Dino.widgets.form.Checkbox.superclass.$events.call(this, self);
		this.el.change(function(){
			self.setValue(self.el.prop('checked') ? true : false);
			self.events.fire('onAction');
		});
	},
	
	
	$opt: function(o) {
		Dino.widgets.Checkbox.superclass.$opt.apply(this, arguments);
		
		if('checked' in o)
			this.el.prop('checked', o.checked);	
	},
	
	$dataChanged: function() {
		Dino.widgets.Checkbox.superclass.$dataChanged.apply(this);
		this.el.prop('checked', this.getValue() );
	},
	
	isChecked: function() {
		return this.el.prop('checked');
	}
	
		
}, 'checkbox');



/**
 * Radio
 * 
 * @class
 * @name Dino.widgets.form.Radio
 * @extends Dino.widgets.form.InputField
 */
Dino.declare('Dino.widgets.Radio', 'Dino.widgets.Checkbox', /** @lends Dino.widgets.form.Radio.prototype */{
	
	defaults: {
		html: '<input type="radio"/>'
	}
	
}, 'radio');






