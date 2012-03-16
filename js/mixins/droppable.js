
//= require <core/widget>



Ergo.declare_mixin('Ergo.mixins.Droppable', function(o) {
	
	o.state = o.state ? o.state + ' droppable' : 'droppable';
	
//	this.states.set('droppable');
//	this.droppable = true;
//	Ergo.droppableList.push(this);
}, 'droppable');
