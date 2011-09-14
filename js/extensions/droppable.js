
//= require <core/widget>



Ergo.extension('Ergo.extensions.Droppable', function(o) {
	
	o.state = o.state ? o.state + ' droppable' : 'droppable';
	
//	this.states.set('droppable');
//	this.droppable = true;
//	Ergo.droppableList.push(this);
}, 'droppable');
