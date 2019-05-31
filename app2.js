import {createProjector} from 'maquette'
import {Html, State, Source, Bindings, Layouts, Section, ContainerLayout, Notification, Menu, MediaLayout,
  Image, Button, Delete, LevelLayout, Icon, Navbar, Content} from './src'

const projector = createProjector()

const render = () => {
  return app.render()
}

document.addEventListener('DOMContentLoaded', function () {
  projector.append(document.body, render);
});

const TRUE = function (v) {
  return []
}

const app = new Html({
  sources: {
    data: ['Alice', 'Bob', 'Charlie']
  },
  bindTo: 'data',
  items: ['1', '2'],
  dataItems: TRUE,
  dataOptions: function (v, source) {
    this.opt('items', itemStream(v, 'data', source))
    return {
    }
  },
  defaultItem: {
    dataOptions: function (v) {
      return {text: v}
    }
  }
})


function itemStream(v, key, source) {

  const items = []
  source.stream((entry, i) => {
    items.push({key: i, sources: {[key]: entry}})
  })

  return items
}


// app.opt('items', itemStream(null, 'data', app.sources.data))
//
// projector.scheduleRender()
