import {Layout, defaultCompare, Config} from '../../src'

function itemRender (c) {
  return Config.Renderer.h('div.level-item'/*, {key: c.index || c.key}*/, [c.render()])
}

function LevelLayout (html, props, components) {
  const h = Config.Renderer.h
  let left = components.filter(c => c.options.level == LevelLayout.LEFT)
  let right = components.filter(c => c.options.level == LevelLayout.RIGHT)
  let center = components.filter(c => c.options.level != LevelLayout.LEFT && c.options.level != LevelLayout.RIGHT)

  if (left.length > 0) {
    left = h('div.level-left', {key: 'left'}, left.sort(defaultCompare).map(itemRender))
  }
  if (right.length > 0) {
    right = h('div.level-right', {key: 'right'}, right.sort(defaultCompare).map(itemRender))
  }

  center = center.sort(defaultCompare).map(itemRender)

  return h(html+'.level', props, [left, ...center, right])
}

LevelLayout.LEFT = 'left'
LevelLayout.RIGHT = 'right'
LevelLayout.CENTER = 'center'

export default LevelLayout