import {createProjector} from 'maquette'
import {Html} from '../src'

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


const app = new Html({
  $header: Header(),
  $article: Article(),
//  $edit: Edit(),
//  $settings: Settings(),
//  $profile: Profile(),
//  $home: Home(),
//  $auth: Auth(),
  $footer: Footer()
}, {
  projector
})
