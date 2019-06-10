
const eventHandlers = {}

function on (event, callback, target) {
  if (!eventHandlers[event]) {
    eventHandlers[event] = []
    document.addEventListener(event, function (e) {emit_dom(e.type, e)})
  }
  eventHandlers[event].push({target, callback})
}


function off (event, callbackOrTarget) {
  let handlers = eventHandlers[event]
  if (handlers) {
    for (let i = handlers.length-1; i >= 0; i--) {
      if (handlers[i].target == callbackOrTarget || handlers[i].callback == callbackOrTarget) {
//        console.log('off', event, callbackOrTarget)
        handlers.splice(i, 1)
      }
    }
  }
}


function emit (name, data) {
  if (eventHandlers[name]) {
    for (let i = 0; i < eventHandlers[name].length; i++) {
      let handler = eventHandlers[name][i]
      handler.callback.call(handler.target, data)
    }
  }
}

function emit_dom (name, event) {
//  console.log('emit dom', event)
  if (eventHandlers[name]) {
    for (let i = 0; i < eventHandlers[name].length; i++) {
      let handler = eventHandlers[name][i]
      let target = handler.target
      if (!target || (target.vnode && target.vnode.domNode == event.target)) {
        handler.callback.call(target, event)
      }
    }
  }
}


//document.addEventListener('animationend', (e) => emit_dom(e.type, e))
//document.addEventListener('transitionend', (e) => emit_dom(e.type, e))


export default {
  on, off, emit
}
