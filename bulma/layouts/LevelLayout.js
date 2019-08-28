import {Layout, defaultCompare, Config} from '../../src'

function itemRender (c) {
  return Config.Renderer.h('div.level-item', [c.render()])
}

export default function (html, props, components) {
  let left = components.filter(c => c.options.levelLeft)
  let right = components.filter(c => c.options.levelRight)
  let center = components.filter(c => !c.options.levelRight && !c.options.levelLeft)

  if (left.length > 0) {
    left = Config.Renderer.h('div.level-left', left.sort(defaultCompare).map(itemRender))
  }
  if (right.length > 0) {
    right = Config.Renderer.h('div.level-right', right.sort(defaultCompare).map(itemRender))
  }

  center = center.sort(defaultCompare).map(itemRender)

  return Config.Renderer.h(html+'.level', props, [left, ...center, right])
}
