




Ergo.defineClass('Bootstrap.forms.Input', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'form-group',
		components: {
			label: {
				weight: -100,
				etype: 'html:label'
			},
			content: {
				etype: 'html:input',
				cls: 'form-control'
			}
		},
		states: {
			'large:size': 'form-group-lg',
			'small:size': 'form-group-sm'
		}
	},
	
	setLabel: function(v) {
		this.label.opt('text', v);
	},
	
	setPlaceholder: function(v) {
		this.content.opt('placeholder', v);
	},
	
	setType: function(v) {
		this.content.opt('type', v);
	},
	
	setReadOnly: function(v) {
		this.content.opt('readOnly', v);
	}
	
	
}, 'bootstrap:form-input');




Ergo.defineClass('Bootstrap.forms.File', 'Bootstrap.forms.Input', {
	
	defaults: {
		type: 'file',
		components: {
			content: {
				'-cls': 'form-control'
			}
		}
	}
	
	
}, 'bootstrap:form-file');






Ergo.defineClass('Bootstrap.forms.Select', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'form-group',
		components: {
			label: {
				weight: -100,
				etype: 'html:label'
			},
			content: {
				etype: 'html:select',
				cls: 'form-control',
				// defaultItem: {
					// etype: 'html:option'
				// }
			}
		}
	},
	
	setLabel: function(v) {
		this.label.opt('text', v);
	}
	

	
	
}, 'bootstrap:form-select');






Ergo.defineClass('Bootstrap.forms.Checkbox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'checkbox',
		components: {
			content: {
				etype: 'html:label',
				content: {
					etype: 'html:input',
					autoRender: true,
					type: 'checkbox'
				}
//				trail: ' Check me out         '
			}
		},
		states: {
			'disabled': function(on) {
				this.content.content.opt('disabled', on);
			},
			'inline': 'checkbox-inline'
		}
	},
	
	setLabel: function(v) {
		this.content.opt('trail', v);
	},
	
	setText: function(v) {
		this.content.opt('trail', v);
	}
	
	
}, 'bootstrap:form-checkbox');




Ergo.defineClass('Bootstrap.forms.Radio', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'radio',
		components: {
			content: {
				etype: 'html:label',
				content: {
					etype: 'html:input',
					autoRender: true,
					type: 'radio'
				}
//				trail: ' Check me out         '
			}
		},
		states: {
			'disabled': function(on) {
				this.content.content.opt('disabled', on);
			}
		}
	},
	
	setLabel: function(v) {
		this.content.opt('trail', v);
	},
	
	setName: function(v) {
		this.content.content.opt('name', v);
	}
	
	
}, 'bootstrap:form-radio');

