




Dino.declare('Dino.widgets.Input', 'Dino.Widget', /** @lends Dino.widgets.form.InputField.prototype */{
	
	defaultOptions: {
		html: '<input type="text"></input>'
	},
	
	$opt: function(o) {
		Dino.widgets.Input.superclass.$opt.call(this, o);
		
		if('text' in o) this.el.val(o.text);
		if('readOnly' in o) this.el.attr('readonly', o.readOnly);
		if('name' in o) this.el.attr('name', o.name);
		if('value' in o) this.el.attr('value', o.value);
		if('disabled' in o) this.el.attr('disabled', o.disabled);
		if('tabindex' in o) this.el.attr('tabindex', o.tabindex);

/*
		var self = this;
		
		if(o.changeOnBlur) {
			this.el.blur(function() { 
				self.setValue(self.el.val(), 'blur'); 
			});			
		}
		
		if(o.rawValueOnFocus){
			this.el.focus(function() { self.hasFocus = true; self.el.val(self.getRawValue()) });
			this.el.blur(function() { self.hasFocus = false; self.el.val(self.getValue()) });
		}
*/		
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
	
//	$dataChanged: function() {
//		Dino.widgets.Input.superclass.$dataChanged.apply(this);
//		
//		if(this.options.rawValueOnFocus && this.hasFocus) 
//			this.el.val( this.getRawValue() );
//		else
//			this.el.val( this.getValue() );
//	}
	
	
	
});




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
	}	
		
}, 'input');




/**
 * Поле текстового ввода
 * 
 * @class
 * @name Dino.widgets.form.PasswordField
 * @extends Dino.widgets.form.InputField
 */
Dino.declare('Dino.widgets.Password', 'Dino.widgets.TextInput', /** @lends Dino.widgets.form.PasswordField.prototype */{
	
	defaultOptions: {
		html: '<input type="password"></input>'
	}
		
}, 'password');


Dino.declare('Dino.widgets.Submit', Dino.widgets.Input, {
	
	defaultOptions: {
		html: '<input type="submit"></input>'
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
	
	defaultOptions: {
		html: '<input name="file-input" type="file"></input>'
	},
	
	$opt: function(o) {
		Dino.widgets.File.superclass.$opt.call(this, o);

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
Dino.declare('Dino.widgets.Radio', Dino.widgets.Input, /** @lends Dino.widgets.form.Radio.prototype */{
	
	defaultOptions: {
		html: '<input type="radio"></input>'
	}
	
}, 'radio');


/**
 * Checkbox
 * 
 * @class
 * @name Dino.widgets.form.Checkbox
 * @extends Dino.widgets.form.InputField
 */
Dino.declare('Dino.widgets.Checkbox', Dino.widgets.Input, /** @lends Dino.widgets.form.Checkbox.prototype */{
	
	defaultOptions: {
		html: '<input type="checkbox"></input>'
	},
	
	$events: function(self) {
//		Dino.widgets.form.Checkbox.superclass.$events.call(this, self);
		this.el.change(function(){
			self.setValue(self.el.attr('checked') ? true : false);
			self.events.fire('onAction');
		});
	},
	
	
	$opt: function(o) {
		Dino.widgets.Checkbox.superclass.$opt.apply(this, arguments);
		
		if('checked' in o)
			this.el.attr('checked', o.checked);	
	},
	
	$dataChanged: function() {
		Dino.widgets.Checkbox.superclass.$dataChanged.apply(this);
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
Dino.declare('Dino.widgets.TextArea', Dino.widgets.TextInput, /** @lends Dino.widgets.form.TextArea.prototype */{
	
	defaultOptions: {
		html: '<textarea></textarea>'
	}
	
}, 'textarea');



/**
 * @class
 * @name Dino.widgets.form.Label
 * @extends Dino.Widget
 */
Dino.declare('Dino.widgets.Label', Dino.Widget, /** @lends Dino.widgets.form.Label.prototype */{

	$html: function() { return '<label></label>'; },
	
	$opt: function(o) {
		Dino.widgets.Label.superclass.$opt.call(this, o);
		
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
Dino.declare('Dino.widgets.Anchor', 'Dino.Widget', /** @lends Dino.widgets.form.Anchor.prototype */{
	
	$html: function() { return '<a href="#" click="return false" />'; },
	
	$init: function(o) {
		Dino.widgets.Anchor.superclass.$init.call(this, o);
		
		var self = this;
		
		this.el.click(function(e){
			self.events.fire('onAction', {}, e);
		});		
	},
	
	$opt: function(o) {
		Dino.widgets.Anchor.superclass.$opt.call(this, o);
		
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
Dino.declare('Dino.widgets.SelectOption', 'Dino.Widget', /** @lends Dino.widgets.form.SelectOption.prototype */{
	
	$html: function() { return '<option/>'; },
	
	$opt: function(o) {
		Dino.widgets.SelectOption.superclass.$opt.apply(this, arguments);
		
		if('value' in o) this.el.attr('value', o.value);
		if('text' in o) this.el.text(o.text);
	}
	
}, 'select-option')



/**
 * @class
 * @name Dino.widgets.form.Select
 * @extends Dino.Container
 */
Dino.declare('Dino.widgets.Select', 'Dino.Container', /** @lends Dino.widgets.form.Select.prototype */{
	$html: function() { return '<select/>'; },
	
	defaultOptions: {
		components: {
			optionsList: {
				dtype: 'container',
				defaultItem: {
					dtype: 'select-option'
				}
			}
		},
		optionsKey: 0,
		optionsValue: 1
	},
	
	$init: function(o) {
		Dino.widgets.Select.superclass.$init.call(this, o);
		
		o.components.optionsList.layout = new Dino.layouts.InheritedLayout({parentLayout: this.layout });
		
		if('options' in o) {
			var items = [];
			var opt_key = o.optionsKey; 
			var opt_val = o.optionsValue;
			for(var i = 0; i < o.options.length; i++) {
				var opt = o.options[i];
				if(Dino.isArray(opt) || Dino.isPlainObject(opt))
					items.push({ value: opt[opt_key], text: opt[opt_val] });
				else
					items.push({ value: i, text: opt });				
			}
			o.components.optionsList.items = items;
		}
	},
	
	
	$opt: function(o) {
		Dino.widgets.Select.superclass.$opt.call(this, o);
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
		Dino.widgets.Select.superclass.$events.call(this, self);
		
		this.el.change(function() { self.setValue( self.el.val() ); });
	},
	
	$dataChanged: function() {
		Dino.widgets.Select.superclass.$dataChanged.call(this);
		this.el.val( this.getValue() );
	}
	
}, 'select');





Dino.declare('Dino.widgets.Text', 'Dino.Widget', {
	
	defaultOptions: {
		html: '<span/>'
	},
	
	$opt: function(o) {
		Dino.widgets.Text.superclass.$opt.apply(this, arguments);
		
		if('text' in o) {
			(o.text) ? this.el.text(o.text) : this.el.html('&nbsp;');
		}
	},
	
	$dataChanged: function() {
		Dino.widgets.Text.superclass.$dataChanged.apply(this, arguments);
		this.el.text( this.getValue() );
//		this.states.set( this.getStateValue() );
	},
	
	getText: function() {
		return this.el.text();
	}
		
}, 'text');







Dino.widgets.Button = Dino.declare('Dino.widgets.Button', 'Dino.Widget', /** @lends Dino.widgets.Button.prototype */{
	
	$html: function() { return '<button type="button"/>'; },
	
	
	$init: function() {
		Dino.widgets.Button.superclass.$init.apply(this, arguments);

		var self = this;
		
		this.el.click(function(e){
			if(!self.states.is('disabled')) self.events.fire('onAction', {}, e);
		});		
		
	},
	
	
	$opt: function(o) {
		Dino.widgets.Button.superclass.$opt.apply(this, arguments);

		if('buttonType' in o)
			this.el.attr('type', o.buttonType);
		if('disabled' in o){
			(o.disabled) ? this.el.attr('disabled', 'disabled') : this.el.removeAttr('disabled');
		}
	}

}, 'button');





/**
 * Изображение.
 * 
 * @class
 * @extends Dino.Widget
 */
Dino.widgets.Image = Dino.declare('Dino.widgets.Image', Dino.Widget, /** @lends Dino.widgets.Image.prototype */{
	
	$html: function() { return '<img></img>';},
	
	$opt: function(o) {
		Dino.widgets.Image.superclass.$opt.call(this, o);
		
		if('imageUrl' in o) this.el.attr('src', o.imageUrl);
	},
	
	$dataChanged: function() {
		this.el.attr( 'src', this.getValue() );
	}
	
	
}, 'image');




