import {Html, Layouts, Title} from '../../src'

export default (projector) => {
  return {
    layout: Layouts.Rows,
    items: [{
      $title: {
        type: Title,
        text: 'Title',
        html: 'h1'
      },
      $subtitle: {
        type: Title.Subtitle,
        text: 'Subtitle',
        html: 'h2'
      }
    }, {
      defaultItem: {
        type: Title
      },
      items: [1,2,3,4,5,6].map(i => {return {text: 'Title '+i, html: 'h'+i, as: 'is-'+i}})
    }, {
      defaultItem: {
        type: Title.Subtitle
      },
      items: [1,2,3,4,5,6].map(i => {return {text: 'Subtitle '+i, html: 'h'+i, as: 'is-'+i}})
    }, {
      defaultItem: {
        $title: {
          type: Title,
          html: 'p'
        },
        $subtitle: {
          type: Title.Subtitle,
          html: 'p'
        },
        styles: {
          'margin-bottom': '1rem'
        }
      },
      items: [
        {$title: {text: 'Title 1', as: 'is-1'}, $subtitle: {text: 'Subtitle 3', as: 'is-3'}},
        {$title: {text: 'Title 2', as: 'is-2'}, $subtitle: {text: 'Subtitle 4', as: 'is-4'}},
        {$title: {text: 'Title 3', as: 'is-3'}, $subtitle: {text: 'Subtitle 5', as: 'is-5'}},
        {$title: {text: 'Title 4', as: 'is-4'}, $subtitle: {text: 'Subtitle 6', as: 'is-6'}},
      ]
    }]
  }
}
