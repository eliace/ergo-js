//import {h} from 'inferno-hyperscript'
import {defaultRender, defaultCompare, deepClone} from './Utils'
import Config from './Config'

function simple (html, props, components) {
  return Config.Renderer.h(html, props, components && components.map(defaultRender))
}

function sorted (html, props, components) {
  return Config.Renderer.h(html, props, components && components.sort(defaultCompare).map(defaultRender))
}

function passthru (html, props, components) {
  return components.map(defaultRender)
}

function wrapped (html, props, components, layout) {
  let wrapper = null
  const wrapped = components.filter(c => {
    if (c.props.key == 'wrapper') {
      wrapper = c
      return false
    }
    return true
  })

  // react is sicking if void components contain empty children
  const vnode = (layout || sorted)(html, props, wrapped.length ? wrapped : null)

  if (wrapper) {
    const fakeContent = {
      options: {},
      render: () => vnode
    }
    return (wrapper.layout || sorted)(
      wrapper._html, 
      deepClone({...wrapper.props, key: props.key}), 
      [fakeContent].concat(wrapper.children)
      ) // FIXME альтернатива wrapper.render(wrapped)
  }
  return vnode
}



export default {passthru, sorted, simple, wrapped}
