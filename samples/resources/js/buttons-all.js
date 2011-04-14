
$.dino({
  dtype: 'box',
  renderTo: '.preview',
  cls: 'button-container',
  items: [{
    dtype: 'button',
    innerText: 'Простая кнопка'
  }, {
    // iconL
    dtype: 'text-button',
    icon: 'silk-icon-accept',
//    text: false
  }, {
    // iconR
    dtype: 'text-button',
    xicon: 'silk-icon-cancel',
//    text: false
  }, {
    // iconL text iconR
    dtype: 'text-button',
    icon: 'silk-icon-accept',
    text: 'OK/Cancel',
    xicon: 'silk-icon-cancel'
  }, {
    // iconL text
    dtype: 'text-button',
    text: 'ОК',
    icon: 'silk-icon-accept'
  }, {
    // text iconR
    dtype: 'text-button',
    text: 'Cancel',
    xicon: 'silk-icon-cancel'
  }, {
    // text
    dtype: 'text-button',
    text: 'ОК'
  }, {
    // iconL iconR
    dtype: 'text-button',
    icon: 'silk-icon-accept',
    xicon: 'silk-icon-cancel',
//    text: false
  }/*, {
    dtype: 'icon-button',
    icon: 'led-icon-cog'
  }*/, {
//    dtype: 'box',
//    content: {
    dtype: 'icon-button',
    cls: 'dino-corner-all',
    contentCls: 'icon48 icon-02',
//    icon: 'icon-01'//'led-icon-refresh'
//    }
  }, {
    dtype: 'text-button',
    layout: 'plain',
    cls: 'icon48',
    icon: 'icon-01',
    text: 'Back'
  }, {
    dtype: 'text-button',
    text: 'Chat',
    cls: 'icon48',
    xicon: 'icon-03'
  }]
});
