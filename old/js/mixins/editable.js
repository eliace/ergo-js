
//= require <core/all>


/**
 * Редактирование
 * 
 * @name Ergo.mixins.Editable
 */
Ergo.declare_mixin('Ergo.mixins.Editable', function(o) {


//	var _old_value = undefined;


	this.startEdit = function() {
		
		if(!this.options.editable) return;
		
		this.states.set('editing');
		
		var w = this.layout.el.width();
		var h = this.layout.el.height();

		var editor_opts = this.options.editor;
		if($.isString(editor_opts)) editor_opts = {etype: editor_opts};		
		
		
		if(editor_opts.replace) {
			var replace_a = editor_opts.replace.split(' ');
			for(var i = 0; i < replace_a.length; i++) {
				this.component(replace_a[i]).el.hide();
			}			
		}
		else {
			this.layout.el.text('');
		}
		
		if(this.content)
			this.content.el.hide();
		
//		this.children.remove_all();
//		this.el.text('');
		
		this.components.set('_editor', editor_opts);
		
		this._editor.$layoutChanged();
		this._editor.$dataChanged();		

		this._old_value = this.data.get();
	
		
		var ed_el = this._editor.el
		var dw = ed_el.outerWidth(true) - ed_el.width();
		var dh = ed_el.outerHeight(true) - ed_el.height();
		ed_el.width(w - dw);
		ed_el.height(h - dh);
		
		// переводим фокус на вложенный тег <input> (если такое есть)
		$('input', this.el).focus();


//		this._editor.bind(this.data);
		
	};
	

	this.stopEdit = function() {
		
		if(!this.options.editable) return;
		
		
		this.children.remove_at('_editor').destroy(); // удаляем и уничтожаем компонент
		
		
		var ed_opts = this.options.editor;
		if($.isString(ed_opts)) ed_opts = {etype: ed_opts};
		
		if(ed_opts.replace) {
			var replace_a = ed_opts.replace.split(' ');
			for(var i = 0; i < replace_a.length; i++) {
				this.component(replace_a[i]).el.show();
			}			
		}
		
		// if(this.content)
			// this.content.el.show();		

		this.$layoutChanged();
		this.$dataChanged(); // явно вызываем обновление данных
				
		
		this.states.unset('editing');
		
		this.events.fire('edit');
	};


	this.cancelEdit = function() {

		this.children.remove_at('_editor').destroy(); // удаляем и уничтожаем компонент
		
		this.data.set(this._old_value);
		
		if(this.content)
			this.content.el.show();		
		
		this.$layoutChanged();
		this.$dataChanged(); // явно вызываем обновление данных		
		
	};
	


	o.editor = o.editor || {etype: 'input-box'}

	o.editable = ('editable' in o) ? o.editable : true;


}, 'editable');