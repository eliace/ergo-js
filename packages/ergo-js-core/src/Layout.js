//import {h} from 'inferno-hyperscript'
import {defaultRender, defaultCompare, deepClone} from './Utils'
import Config from './Config'

function simple (h, html, props, components) {
  return h(html, props, components && components.map(defaultRender))
}

function sorted (h, html, props, components) {
  return h(html, props, components && components.sort(defaultCompare).map(defaultRender))
}

function passthru (h, html, props, components) {
  return components.map(defaultRender)
}

function wrapped (h, html, props, components, layout) {
  let wrapper = null
  const wrapped = components.filter(c => {
    if (c.dom.props.key == 'wrapper') {
      wrapper = c
      return false
    }
    return true
  })

  // react sicks if void components contain empty children
  const vnode = (layout || sorted)(h, html, props, wrapped.length ? wrapped : null)

  if (wrapper) {
    const fakeContent = {
      options: {},
      render: () => vnode
    }
    return (wrapper.dom.layout || sorted)(
      h,
      wrapper.dom.html, 
      deepClone({...wrapper.dom.props, key: props.key}), 
      [fakeContent].concat(wrapper.children)
      ) // FIXME альтернатива wrapper.render(wrapped)
  }
  return vnode
}



export default {passthru, sorted, simple, wrapped}
