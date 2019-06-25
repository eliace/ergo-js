import {Layout} from '../../src'

export default class PassThroughLayout extends Layout {

  render(html, props, children) {
    return this.combine(children)
  }

}
