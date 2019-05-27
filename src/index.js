import {createProjector} from 'maquette'
import {Html, State, Options, Source, Bindings} from './core'
//import {Section} from './bulma'

const projector = createProjector()

function init(target, root) {
  projector.append(target, root)
}

export {init, Html, State, Options, Source, Bindings}
