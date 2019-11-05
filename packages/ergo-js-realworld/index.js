import { Config } from 'ergo-js-core'
import * as ReactRenderer from 'ergo-js-react'
import {createApp} from './src'

Config.use(ReactRenderer.Context)

const app = createApp()

document.addEventListener('DOMContentLoaded', function () {
    Config.Renderer.append(app, document.getElementById('app'))
})
