import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

export function createVNode (type, props, children) {
  if (Array.isArray(props)) {
    children = props
    props = null
  }
  const type_a = type.split('.')
  if (type_a.length > 1) {
    type = type_a[0]
    if (props == null) {
      props=  {}
    }
    props.className = classnames(props.className, type_a.slice(1))
  }
  return React.createElement(
    type,
    props,
    children
  )
}

export function renderVNode (vnode, dom) {
  return ReactDOM.render(vnode, dom)
}
