
$.dino({
  dtype: 'box',
  renderTo: '.preview',
//  layout: 'column-layout',
  cls: 'button-container',
  items: [{
    dtype: 'button',
    innerText: 'Простая кнопка'
  }, {
    // iconL
    dtype: 'text-button',
    icon: 'led-icon-accept',
    text: false
  }, {
    // iconR
    dtype: 'text-button',
    xicon: 'led-icon-cancel',
    text: false
  }, {
    // iconL text iconR
    dtype: 'text-button',
    icon: 'led-icon-accept',
    text: 'OK/Cancel',
    xicon: 'led-icon-cancel'
  }, {
    // iconL text
    dtype: 'text-button',
    text: 'ОК',
    icon: 'led-icon-accept'
  }, {
    // text iconR
    dtype: 'text-button',
    text: 'Cancel',
    xicon: 'led-icon-cancel'
  }, {
    // text
    dtype: 'text-button',
    text: 'ОК'
  }, {
    // iconL iconR
    dtype: 'text-button',
    icon: 'led-icon-accept',
    xicon: 'led-icon-cancel',
    text: false
  }/*, {
    dtype: 'icon-button',
    icon: 'led-icon-cog'
  }*/, {
//    dtype: 'box',
//    content: {
    dtype: 'icon-button',
    cls: 'dino-corner-all',
    contentCls: 'icon48 icon-01',
//    icon: 'icon-01'//'led-icon-refresh'
//    }
  }]
});
