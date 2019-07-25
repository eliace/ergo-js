import {Layout} from '../../src'
import {h} from 'maquette'


export default class PassThroughLayout extends Layout {

  render(html, props, children) {
    return this.combine(children)
  }

}
