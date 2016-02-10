

Ergo.defineClass('Ergo.data.AjaxProvider', {

	extends: 'Ergo.core.Object',

	defaults: {
		dataType: 'json'
	},


	_initialize: function(url, o) {
		this._super(o || {});

		this._url = url;
	},


	findAll: function(ds, query) {
		return $.ajax({
			url: this._url,
			data: query,
			dataType: this.options.dataType
		});
	}


}, 'data:ajax-provider');
