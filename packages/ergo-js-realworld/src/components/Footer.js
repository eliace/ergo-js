import {Html} from '../../src'


export default () => {
  return {
    html: 'footer',
    $container: {
      css: 'container',
      $logo: {
        html: 'a',
        css: 'logo-font',
        href: '/',
        text: 'conduit'
      },
      $attr: {
        html: 'span',
        css: 'attribution',
        items: [
          'An interactive learning project from ',
          {
            html: 'a',
            href: 'https://thinkster.io',
            text: 'Thinkster'
          },
          '. Code & design licensed under MIT.'
        ]
      }
    }
  }
}
