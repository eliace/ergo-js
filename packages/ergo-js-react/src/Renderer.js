import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

const _TYPES = {}

window.Chorda = function (props) {
  const {_type, children, _props} = props
  return React.createElement(_type, _props, children)
}

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

  if (props._owner) {
    const name = props._owner.constructor.name == 'Html' ? type : props._owner.constructor.name
    if (!_TYPES[name]) {
      _TYPES[name] = new Function('return function '+name+' (props) {return Chorda(props)}')()
    }
    const {_owner, key, ...newProps} = props//_type: type, _props: props, key: props.key}
    props = {_type: type, _props: newProps, key}
    type = _TYPES[name]
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
