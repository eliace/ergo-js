
$.ergo({
  etype: 'list',
  renderTo: '.preview',
  layout: 'float',
  defaultItem: {
    etype: 'icon',
    baseCls: 'ui-icon'
  },
  items: [
    { cls: 'ui-icon-newwin' },
    { cls: 'ui-icon-refresh' },
    { cls: 'ui-icon-shuffle' },
    { cls: 'ui-icon-folder-open' },
    { cls: 'ui-icon-document' },
    { cls: 'ui-icon-note' },
    {
      etype: 'action-icon',
      baseCls: '',
      cls: 'icon32'
    }
  ]
});

    
