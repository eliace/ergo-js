
$.ergo({
  etype: 'box',
  renderTo: '.preview',
  cls: 'button-container',
  items: [{
    etype: 'button',
    innerText: 'Простая кнопка'
  }, {
    // iconL
    etype: 'text-button',
    icon: 'silk-icon-accept',
//    text: false
  }, {
    // iconR
    etype: 'text-button',
    xicon: 'silk-icon-cancel',
//    text: false
  }, {
    // iconL text iconR
    etype: 'text-button',
    icon: 'silk-icon-accept',
    text: 'OK/Cancel',
    xicon: 'silk-icon-cancel'
  }, {
    // iconL text
    etype: 'text-button',
    text: 'ОК',
    icon: 'silk-icon-accept'
  }, {
    // text iconR
    etype: 'text-button',
    text: 'Cancel',
    xicon: 'silk-icon-cancel'
  }, {
    // text
    etype: 'text-button',
    text: 'ОК'
  }, {
    // iconL iconR
    etype: 'text-button',
    icon: 'silk-icon-accept',
    xicon: 'silk-icon-cancel',
    text: ''
  }/*, {
    etype: 'icon-button',
    icon: 'led-icon-cog'
  }*/, {
//    etype: 'box',
//    content: {
    etype: 'icon-button',
    cls: 'ergo-corner-all',
    contentCls: 'icon48 icon-02',
//    icon: 'icon-01'//'led-icon-refresh'
//    }
  }, {
    etype: 'text-button',
    layout: 'plain',
    cls: 'icon48',
    icon: 'icon-01',
    text: 'Back'
  }, {
    etype: 'text-button',
    text: 'Chat',
    cls: 'icon48',
    xicon: 'icon-03'
  }]
});
