import {createProjector} from 'maquette'
import createApp from './js/app'
import {Router} from 'director/build/director'

const projector = createProjector()

const app = createApp(projector)

const router = new Router({
  '/': () => {
    app.$body.domains.data.set('filter', 'all')
  },
  '/active': () => {
    app.$body.domains.data.set('filter', 'active')
  },
  '/completed': () => {
    app.$body.domains.data.set('filter', 'completed')
  }
})

const render = () => {
  return app.render()
}

document.addEventListener('DOMContentLoaded', function () {
  projector.append(document.body, render);
});

router.init()

//export default () => {
//  return {projector}
//}
