
/**
 * Эксклюзивное отображение одного из дочерних виджетов
 *
 * Опции:
 * 	`active`
 *
 * @mixin Ergo.mixins.Pageable
 */
Ergo.alias('includes:pageable', {

	defaults: {
		as: 'pageable'
	},

	overrides: {

		set active(i) {

			var child = (i instanceof Ergo.core.Widget) ? i : this.children.find( Ergo.by_widget(i) );

			// this.children.each(function(c){
				// (c != child) ? c.hide() : c.show();
			// });

			if(child) {
				child._layoutChanged();
			}

//			var promise = $.when(true);

			if(this._active) {
				this._active.unset('active');
				promise = this._active.hide();
			}

			this._active = child;

//			promise.then(function(){

				this._active.set('active');
				this._active.show();

//			}.bind(this));


			return child;
		},


		get active() {
			return this._active;
		}


	}


});
