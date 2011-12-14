
//= require <core/widget>




Ergo.declare('Ergo.widgets.Input', 'Ergo.core.Widget', /** @lends Ergo.widgets.form.InputField.prototype */{
	
	defaults: {
		html: '<input type="text"/>',
		set: {
			'text': function(v) { this.el.val(v); }
		}
	},
	
	$opt: function(o) {
		this.$super(o);
//		Ergo.widgets.Input.superclass.$opt.call(this, o);
		
//		if('text' in o) this.el.val(o.text);
		if('readOnly' in o) this.el.attr('readonly', o.readOnly);
		if('name' in o) this.el.attr('name', o.name);
		if('value' in o) this.el.attr('value', o.value);
		if('disabled' in o) this.el.attr('disabled', o.disabled);
		if('tabIndex' in o) this.el.attr('tabindex', o.tabIndex);

	}
	
	
}, 'input');




Ergo.declare('Ergo.widgets.TextInput', 'Ergo.widgets.Input', /** @lends Ergo.widgets.form.PasswordField.prototype */{

	defaults: {
		'change': function(e, self) {
			self.setValue( self.el.val());			
		}
	},

	$opt: function(o) {
		this.$super(o);
//		Ergo.widgets.TextInput.superclass.$opt.call(this, o);
		
		var self = this;
		
		if(o.changeOnBlur) {
			this.el.blur(function() { 
				self.setValue(self.el.val(), 'blur'); 
			});			
		}
		
		if(o.rawValueOnFocus){
			this.el.focus(function() { self.hasFocus = true; self.el.val(self.data.get()); self.states.set('raw-value'); });
			this.el.blur(function() { self.hasFocus = false; self.el.val(self.getValue()); self.states.clear('raw-value'); });
		}

//		if(o.initText){
//			this.el.focus(function() { self.hasFocus = true; self.el.val(self.getRawValue()) });
//			this.el.blur(function() { self.hasFocus = false; self.el.val(self.getValue()) });
//		}
		
	},
		
	$dataChanged: function() {
		this.$super();
//		Ergo.widgets.TextInput.superclass.$dataChanged.apply(this);
		
		if(this.options.rawValueOnFocus && this.hasFocus) 
			this.el.val( this.data.get() );
		else
			this.el.val( this.getValue() );
	}
	
/*	
	$events: function(self) {
		this.$super(self);
//		Ergo.widgets.Input.superclass.$events.call(this, self);


		// this.el.keydown(function(e) {
			// if(!self.options.readOnly) {
				// if(e.keyCode == 13) 
					// self.setValue( self.el.val(), 'enterKey');
				// else if(e.keyCode == 27) 
					// self.el.val(self.getValue());				
			// }
		// });
		
		
		this.el.change(function() {
			self.setValue( self.el.val());
		});
	}
*/	
		
}, 'text-input');





/**
 * Поле текстового ввода
 * 
 * @class
 * @name Ergo.widgets.form.PasswordField
 * @extends Ergo.widgets.form.InputField
 */
Ergo.declare('Ergo.widgets.Password', 'Ergo.widgets.TextInput', /** @lends Ergo.widgets.form.PasswordField.prototype */{
	
	defaults: {
		html: '<input type="password"/>'
	}
		
}, 'password');


Ergo.declare('Ergo.widgets.Submit', 'Ergo.widgets.Input', {
	
	defaults: {
		html: '<input type="submit"/>'
	},
	
	$init: function(o) {
		this.$super(o);
//		Ergo.widgets.Submit.superclass.$init.call(this, o);
		
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
 * @name Ergo.widgets.form.File
 * @extends Ergo.widgets.form.InputField
 */
Ergo.declare('Ergo.widgets.File', Ergo.widgets.TextInput, {
	
	defaults: {
		html: '<input name="file" type="file"/>'
	},
	
	$opt: function(o) {
		this.$super(o);
//		Ergo.widgets.File.superclass.$opt.call(this, o);

		if('name' in o) this.el.attr('name', o.name);
	}
	
}, 'file');



/**
 * Checkbox
 * 
 * @class
 * @name Ergo.widgets.form.Checkbox
 * @extends Ergo.widgets.form.InputField
 */
Ergo.declare('Ergo.widgets.Checkbox', Ergo.widgets.Input, /** @lends Ergo.widgets.form.Checkbox.prototype */{
	
	defaults: {
		html: '<input type="checkbox"/>',
		events: {
			'change': function(e, self) {
				self.setValue(self.el.attr('checked') ? true : false);
				self.events.fire('onAction');
			}
		}
	},
	
/*	
	$events: function(self) {
//		Ergo.widgets.form.Checkbox.superclass.$events.call(this, self);
		this.el.change(function(){
			self.setValue(self.el.attr('checked') ? true : false);
			self.events.fire('onAction');
		});
	},
*/	
	
	$opt: function(o) {
		this.$super(o);
//		Ergo.widgets.Checkbox.superclass.$opt.apply(this, arguments);
		
		if('checked' in o)
			this.el.attr('checked', o.checked);	
	},
	
	$dataChanged: function() {
		this.$super();
//		Ergo.widgets.Checkbox.superclass.$dataChanged.apply(this);
		this.el.attr('checked', this.getValue() );
	},
	
	isChecked: function() {
		return this.el.attr('checked');
	}
	
		
}, 'checkbox');



/**
 * Radio
 * 
 * @class
 * @name Ergo.widgets.form.Radio
 * @extends Ergo.widgets.form.InputField
 */
Ergo.declare('Ergo.widgets.Radio', 'Ergo.widgets.Checkbox', /** @lends Ergo.widgets.form.Radio.prototype */{
	
	defaults: {
		html: '<input type="radio"/>'
	}
	
}, 'radio');






Ergo.declare('Ergo.widgets.Submit', 'Ergo.widgets.TextInput', {
	
	defaults: {
		html: '<input type="submit"/>'
	}
	
//	$opt: function(o) {
//		Ergo.widgets.Submit.superclass.$opt.call(this, o);
//	}
	
}, 'submit');


