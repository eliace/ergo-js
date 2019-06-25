import {Html} from '../../src'


export default () => {
  return {
    html: 'footer',
    $container: {
      as: 'container',
      $logo: {
        html: 'a',
        as: 'logo-font',
        href: '/',
        text: 'conduit'
      },
      $attr: {
        html: 'span',
        as: 'attribution',
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
