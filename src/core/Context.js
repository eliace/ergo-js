import Layout from './Layout'
import Domain from './Domain2'

export default class Context {

  constructor (o={}) {
    this.defaultLayout = o.defaultLayout || Layout
    this.projector = o.projector
    this.defaultSource = o.defaultSource || Domain
  }

}
