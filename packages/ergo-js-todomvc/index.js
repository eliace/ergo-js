//import {createProjector} from 'maquette'
import createApp from './src/app'
import {Router} from 'director/build/director'
import { Config } from 'ergo-js-core'
import * as ReactAdapter from 'ergo-js-react'

Config.use(ReactAdapter.Context)

const app = createApp()

const router = new Router({
  '/': () => {
    app.scope.view.$set('filter', 'all')
  },
  '/active': () => {
    app.scope.view.$set('filter', 'active')
  },
  '/completed': () => {
    app.scope.view.$set('filter', 'completed')
  }
})


document.addEventListener('DOMContentLoaded', function () {
  Config.Renderer.append(app, document.getElementById('app'))
})

router.init()

