import { Config } from 'chorda-core'
import * as ReactRenderer from 'chorda-react'
import {createApp} from './src'

Config.use(ReactRenderer.Context)

const app = createApp()

document.addEventListener('DOMContentLoaded', function () {
    Config.Renderer.append(app, document.getElementById('app'))
})
