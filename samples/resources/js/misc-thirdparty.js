

var acData = 'January February March April May June July August September November December'.split(' ')

$.ergo({
  renderTo: '.preview',
  etype: 'list',
  items: [{
    etype: 'box',
    cls: 'label-box',
    html: '<div>Autocomplete (<a href="https://github.com/agarzola/jQueryAutocompletePlugin">https://github.com/agarzola/jQueryAutocompletePlugin</a>)</div>'
  }, {
    etype: 'text-field',
    cls: 'dino-form-field',
    data: '',
    onCreated: function() {
      this.input.el.autocomplete(acData);
    },
    placeholder: 'Enter month'
  }, {
    etype: 'box',
    cls: 'label-box',
    html: '<div>Datepicker (<a href="http://keith-wood.name/datepick.html">http://keith-wood.name/datepick.html</a>)</div>'    
  }, {
    etype: 'text-field',
    cls: 'dino-form-field',
    data: '',
    components: {
      button: {
        role: 'actor',
        etype: 'icon-button',
        icon: 'silk-icon-date',
        onAction: function() {
          this.parent.input.el.datepick('show');
        }
      }
    },
    onCreated: function() {
      var self = this;
      this.input.el.datepick({
        defaultDate: new Date(),
//        showOnFocus: false,
        dateFormat: $.datepick.ISO_8601,
        onSelect: function(dates) {
          var date0 = dates[0];
          self.setValue($.datepick.formatDate($.datepick.ISO_8601, date0));
        }
      });      
    },
    placeholder: 'Select date'
  }]
});