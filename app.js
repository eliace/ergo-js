import {init, Html} from './src'
import {createProjector} from 'maquette'
import {Layouts, Section, ContainerLayout, Notification, MediaLayout, Image, Button, Delete, LevelLayout, Icon} from './src/bulma'

const projector = createProjector()

let showHeart = true

const Bindings = {
  Text: function(v) {this.opt('text', v)}
}

const app = new Html({
//  components: {
    $header: {
      type: Section,
      layout: Layouts.Container,
      data: {x: 'pushed'},
      dataBinding: function(v) {
        console.log('extra binding')
      },
//      components: {
      $content: {
        type: Notification,
        items: [
          'This container is ',
          {html: 'strong', text: 'centered', class: 'aaa', dataId: 'x', dataBinding: Bindings.Text},
          ' on desktop.'
        ]
      }
    },
    $media: {
      type: Section,
      layout: Layouts.Container,
      $content: {
        html: 'article',
        layout: Layouts.Media,
        $avatar: {
          type: Image,
          as: 'is-64x64',
          src: 'https://bulma.io/images/placeholders/128x128.png'
        },
        $content: {
          class: 'content',
          $content: {
            html: 'p',
            items: [
              {html: 'strong', text: 'John Smith'},
              ' ',
              {html: 'small', text: '@johnsmit'},
              ' ',
              {html: 'small', text: '31m'},
              {html: 'br'},
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.'
            ]
          },
          $nav: {
            html: 'nav',
            layout: Layouts.Level,
            defaultItem: {
              type: Icon.Fa,
              html: 'a',
              as: 'is-small',
              level: 'left'
            },
            items: [
              'reply',
              'retweet',
              'heart'
            ]
          }
        },
        $deleteBtn: {
          type: Delete,
          html: 'button',
          onClick: (e) => {console.log('delete')}
        }
      }
    }
//      }
//  }
})

console.log(app)

setTimeout(() => {
  const c = app.child('header.content.item-1')
  c.opt('html', 'i')
  c.set('test')
  c.data.set('some text')
  projector.scheduleRender()
}, 3000)

/*
const c = new Html({
  components: {
    before: {
      text: '[',
      weight: -10
    },
    after: {
      text: ']',
      weight: 10
    },
    content: {
      defaultItem: {
        styles: {
          color: '#ff0000'
        }
      },
      items: [{
        text: 'Alice'
      }, {
        text: 'Bob'
      }, {
        text: 'Charlie',
        styles: {
          color: '#0000ff'
        }
      }]
    },
    button: {
      html: 'button',
      as: 'button is-primary',
      text: 'Press me',
      weight: 11,
      onClick: (e, comp) => {
        c.get('before').opt('text', '(')
        c.$after.opt('text', ')')
      }
    }
  }
})


setTimeout(() => {
  c.$content.add({
    text: 'Dave',
    styles: {
      fontSize: '2rem'
    }
  })
  projector.scheduleRender()
}, 3000)
*/

const render = () => {
  return app.render()
}

document.addEventListener('DOMContentLoaded', function () {
  projector.append(document.body, render);
});
