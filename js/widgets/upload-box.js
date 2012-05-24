
//= require <widgets/natives/box>

Ergo.declare('Ergo.widgets.UploadBox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-upload-box',
		style: {'position': 'relative', 'display': 'inline-block'},
		events: {
			'mousedown': function(e, w) { w.content.states.set('clicked'); },
			'mouseup': function(e, w) { w.content.states.clear('clicked'); },
			'mouseenter': function(e, w) { w.content.states.set('hovered'); },
			'mouseleave': function(e, w) { w.content.states.clear('hovered'); }
		},
		
		components: {
			content: {	
			},
			_uploader: {
				opacity: 0,
				html: '<form name="file-uploader" target="uploader-target" method="POST" enctype="multipart/form-data"/>',
				style: {'overflow': 'hidden', 'position': 'absolute', 'left': 0, 'top': 0, 'right': 0, 'bottom': 0},
				content: {
					etype: 'file',
					html: '<input name="file" type="file" size="1">',
					style: {'font-size': 300, 'right': 0, 'top': 0, 'position': 'absolute', 'cursor': 'pointer'},
					events: {
						'change': function(e, w) {
							w.events.bubble('action', {file: $(this).val()}, e);
						}
					}
				}
			},
			_target: {
				html: '<iframe name="uploader-target" frameborder="no"/>',
				height: 0,
				width: 0,
				events: {
					'load': function(e, w) {
						//FIXME это работает не для всех браузеров
						var text = w.el[0].contentWindow.document.body.innerHTML;
						if(text) {
							text = text.substring(5, text.length-6);
							w.events.bubble('upload', {textData: text});
						}
					}
				}
			}
		}		
	},
	
	
	upload: function(path) {
		
		this._uploader.el.attr('action', path);
		this._uploader.el.submit();
		
	}
	
}, 'upload-box');
