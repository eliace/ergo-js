import {Domain, Layout, Context} from '../src'

export default class InfernoContext extends Context {

  constructor (o={}) {
    this.defaultLayout = o.defaultLayout || Layout
    this.projector = o.projector
    this.defaultSource = o.defaultSource || Domain
  }

}