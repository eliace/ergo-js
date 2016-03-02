

$ergo.alias('includes:editor-input', {

	defaults: {
		$editor: {
			etype: 'edit',
			autoRender: false,
			autoBind: false,
			binding: 'prop:text',
			events: {
				'dom:keydown': function(e) {
					if( e.keyCode == 13 ) {
						this.rise('key.enter');
						e.stopImmediatePropagation();
						// e.preventDefault();
						// return false;
					}
					else if( e.keyCode == 27 ) {
						this.rise('key.esc');
						e.stopImmediatePropagation();
					}
				},
				'dom:keyup': function(e) {
//					else {
//						console.log( this.prop('text') );
						var b = this.options.binding;
						this.options.binding = false;
						this.prop('value', this.prop('text'));
						this.options.binding = b;
//					}
				},
        'dom:blur': function() {
          this.rise('blur');
        }
			},

			set: {
				'caretPosition': function(v) {
					var el = this.dom.el;
					var sel = window.getSelection();

					el.focus();

					var range = document.createRange();
					range.setStart(el.childNodes[0], v);
					range.setEnd(el.childNodes[0], v);


					sel.removeAllRanges();
					sel.addRange(range);

				}
			}
		},

		events: {
			'key.enter': 'stopEdit',
			'key.esc': 'stopEdit:cancel',
      'blur': 'stopEdit:cancel'
		}

	},



  startEdit: function() {

		this.$editor.options.autoRender = true;
		this.render();

		this.set('edit');

		this.$editor.prop('caretPosition', this.$editor.prop('text').length);

	},

	stopEdit: function(type) {

		this.$editor.unrender();
		this.$editor.options.autoRender = true;

		this.unset('edit', {cancel: !!type});
	},

  cancelEdit: function() {
    this.stopEdit(true);
  }


});
