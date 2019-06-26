import {createProjector} from 'maquette'
import {Html, Source as Domain} from '../src'
import {Router} from 'director/build/director'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Edit from './pages/Edit'
import Article from './pages/Article'


const projector = createProjector()

const render = () => {
  return app.render()
}

document.addEventListener('DOMContentLoaded', function () {
  projector.append(document.body, render);
});

const routes = {
  '/': function () {page.set('current', 'home')}
}

const router = new Router(routes)


const page = new Domain({
  current: 'home'
}, {
  computed: {
    home: v => v.current == 'home'
  }
})

const app = new Html({
  sources: {
    page
  },
  dynamic: {
    header: Header(),
  //  $article: Article(),
  //  $edit: Edit(),
  //  $settings: Settings(),
  //  $profile: Profile(),
    home: Home(),
  //  $auth: Auth(),
    footer: Footer()
  },
  pageChanged: function (v, k) {
    this.opt('$components', this.sources[k])
  }
}, {
  projector
})

router.init()
