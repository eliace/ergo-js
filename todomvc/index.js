//import {createProjector} from 'maquette'
import createApp from './js/app'
import {Router} from 'director/build/director'
import Context from '../src/react/Context'
import {Config} from '../src'

//const projector = createProjector()

const app = createApp()//projector)

const router = new Router({
  '/': () => {
    app.$body.sources.data.set('filter', 'all')
  },
  '/active': () => {
    app.$body.sources.data.set('filter', 'active')
  },
  '/completed': () => {
    app.$body.sources.data.set('filter', 'completed')
  }
})

// const render = () => {
//   return app.render()
// }

// document.addEventListener('DOMContentLoaded', function () {
//   projector.append(document.body, render);
// });

document.addEventListener('DOMContentLoaded', function () {
  Config.Renderer.append(app, document.getElementById('app'))
})

router.init()

//export default () => {
//  return {projector}
//}
