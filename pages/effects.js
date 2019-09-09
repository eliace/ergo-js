

export const ShowAndHide = function (source, component) {
    const effects = () => {
      return new Promise((resolve) => {
        component.eff(() => {resolve()})
      })
    }

    const transition = () => {
      return new Promise(resolve => {
        component.use((el) => {
          const f = () => {
            el.removeEventListener('transitionend', f)
            resolve()
          }
          el.addEventListener('transitionend', f)
        })
      })
    }

    const name = 'fade'

    const show = source.$method('show', component, async () => {
      component.opt('classes', {[name+'-enter-active']: true, [name+'-enter']: true})
      await effects()
      component.opt('classes', {[name+'-enter']: false})
      await transition()
      component.opt('classes', {[name+'-enter-active']: false})
    }, 'g')

    const hide = source.$method('hide', component, async () => {
      component.opt('classes', {[name+'-leave-active']: true, [name+'-leave']: true})
      await effects()
      component.opt('classes', {[name+'-leave-to']: true, [name+'-leave']: false})
      await transition()
      component.opt('classes', {[name+'-leave-to']: false, [name+'-leave-active']: false})
    }, 'g')

    // source.$watch(e => e.name == 'init', this, () => {
    //   return show()
    // })
    // source.$watch(e => e.name == 'destroy', this, () => {
    //   return hide()
    // })
  }
