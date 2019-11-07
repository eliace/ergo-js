import {Html, Domain, Layout} from 'chorda-core'
import {Layouts, Menu, List} from 'chorda-bulma'


export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      as: Menu,
      $general: {
        layout: Layout.passthru,
        $label: {
          as: Menu.Label,
          text: 'General'
        },
        $list: {
          as: Menu.List,
          items: [
            { text: 'Dashboard' },
            { text: 'Customers' }
          ]
        }
      },
      $administration: {
        layout: Layout.passthru,
        $label: {
          as: Menu.Label,
          text: 'Administration'
        },
        $list: {
          as: Menu.List,
          items: [
            { text: 'Team Settings' },
            {
              text: 'Manage Your Team',
              selected: true,
              $list: {
                as: Menu.SubList,
                items: [
                  { text: 'Members' },
                  { text: 'Plugins' },
                  { text: 'Add a member' }
                ]
              }
            },
            { text: 'Invitations' },
            { text: 'Cloud Storage Environment Settings' },
            { text: 'Authentication' }
          ]
        }
      },
      $transactions: {
        layout: Layout.passthru,
        $label: {
          as: Menu.Label,
          text: 'Transactions'
        },
        $list: {
          as: Menu.List,
          items: [
            { text: 'Payments' },
            { text: 'Transfers' },
            { text: 'Balance' }
          ]
        }
      },
    }]
  }
}
