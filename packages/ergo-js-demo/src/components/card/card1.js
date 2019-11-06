import { Card, Image, Layouts } from 'chorda-bulma'
import imgUrl from '../../img/Yosemite 3.jpg'

export default () => {
    return {
        as: Card,
        width: 512,
        styles: {
            boxShadow: '2px 3px 8px #ddd'
        },
        components: {
          image: true,
          header: false
        },
        $image: {
          $content: {
            as: Image,
            src: imgUrl
          }
        },
        $content: {
          $content: {
            layout: Layouts.Content,
            $cut: {
              html: 'p',
              text: 'Yosemite National Park (/joʊˈsɛmɪti/ yoh-SEM-i-tee) is an American national park located in the western Sierra Nevada of Central California, bounded on the southeast by Sierra National Forest and on the northwest by Stanislaus National Forest.',
            },
            $wiki: {
              html: 'p',
              css: 'has-text-right',
              $link: {
                html: 'a',
                text: 'Wikipedia',
                href: 'https://en.wikipedia.org/wiki/Yosemite_National_Park'
              }
            }
          }
        }  
    }
}