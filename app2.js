import {createProjector} from 'maquette'
import {}
import {Html, State, Source, Bindings, Layouts, Section, ContainerLayout, Notification, Menu, MediaLayout,
  Image, Button, Delete, LevelLayout, Icon, Navbar, Content, Tabs, IconBox} from './bulma'


const projector = createProjector()

const render = () => {
  return app.render()
}

document.addEventListener('DOMContentLoaded', function () {
  projector.append(document.body, render);
});

const app = new Html({
  sources: {
    data: ['Alice', 'Bob', 'Charlie'],
    selection: 'Bob'
  },
  dataChanged: function (v) {
    console.log('data', this.opt('selected'))
  },
  selectionChanged: function (v) {
    console.log('selection')
    this.opt('value')
    this.opt('selected', true)
  },
  selectionEffects: function (event, data) {
    if (event == 'init' || event == 'set') {
      this.options.onSelected && this.options.onSelected.call(this, data)
    }
  },
  onSelected: function (v) {
    console.log('onselected', v)
  }
})
