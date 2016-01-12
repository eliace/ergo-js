/*
Ergo.defineMixin('Ergo.mixins.Draggable', function(o) {

	o.events = Ergo.smart_override({
		'jquery:mousedown': function(e) {

			if( e.button == 0 ) {

				var self = this;

				var offset = this.el.offset();

				var drag = {
					dx: e.pageX - offset.left,
					dy: e.pageY - offset.top,
				};

				// добавляем компенсацию прокрутки
				this.el.parents().each(function(i, p){
					drag.dy += $(p).scrollTop() || 0;
					drag.dx += $(p).scrollLeft() || 0;
				});


				// добавляем "стекло"
				var glass = $('<div class="glass"/>');
				$('body').append(glass);

				glass.on('mousemove', function(e) {

					if(drag) {
						self.events.rise('drag', {x: e.pageX, y: e.pageY, dx: drag.dx, dy: drag.dy, target: self});
					}


				});

				glass.on('mouseup', function(e) {

					glass.remove();

					self.events.rise('dragEnd', {x: e.pageX, y: e.pageY, dx: drag.dx, dy: drag.dy, target: self});
				});



				this.events.rise('dragStart', {x: e.pageX, y: e.pageY, dx: drag.dx, dy: drag.dy});

				e.preventDefault();
			}

		}
	}, o.events);



}, 'mixins:draggable');

*/
