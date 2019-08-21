import {h} from 'inferno-hypertext'
import {defaultRender, defaultCompare, deepClone} from './Utils'

function simple (html, props, components) {
  return h(html, props, components.map(defaultRender))
}

function sorted (html, props, components) {
  return h(html, props, components.sort(defaultCompare).map(defaultRender))
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

  const vnode = (layout || sorted)(html, props, wrapped)

  if (wrapper) {
    return (wrapper.layout || simple)(wrapper.html, deepClone(wrapper.props), [vnode]) // FIXME альтернатива wrapper.render(wrapped)
  }
  return vnode
}



export default {h, passthru, sorted, simple, wrapped}
