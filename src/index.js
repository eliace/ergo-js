import {createProjector} from 'maquette'
import {Html} from './core'
//import {Section} from './bulma'

const projector = createProjector()

function init(target, root) {
  projector.append(target, root)
}

export {init, Html}
