import {Layout} from '../../src'
//import {h} from 'maquette'

class ContentLayout extends Layout {

  render(html, props, children) {
    return Layout.h(html+'.content', props, this.combine(children.sort(this.compare)))
  }
}

export default ContentLayout
