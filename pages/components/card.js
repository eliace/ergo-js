import {Html, Layouts, Domain, Card, Image} from '../../src'

import imgUrl from '../img/Yosemite 3.jpg'

export default () => {
  return {
    layout: Layouts.Row,
    items: [{
      base: Card,
      width: 512,
      components: {
        image: true,
        content: true,
        header: false,
        footer: false
      },
      $image: {
        $content: {
          base: Image,
          src: imgUrl
        }
      },
      $content: {
        $content: {
          layout: Layouts.Content,
          text: 'Yosemite National Park (/joʊˈsɛmɪti/ yoh-SEM-i-tee) is an American national park located in the western Sierra Nevada of Central California, bounded on the southeast by Sierra National Forest and on the northwest by Stanislaus National Forest.',
          $wiki: {
            weight: 10,
            as: 'has-text-right',
            styles: {
              'margin-top': '0.6rem'
            },
            $link: {
              html: 'a',
              text: 'Wikipedia',
              href: 'https://en.wikipedia.org/wiki/Yosemite_National_Park'
            }
          }
        }
      }
    }]
  }
}
