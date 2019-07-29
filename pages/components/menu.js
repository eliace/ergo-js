import {Html, Domain, Layout} from '../../src'
import {Layouts, Menu, List} from '../../bulma'


export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      base: Menu,
      $general: {
        layout: Layout.passthru,
        $label: {
          base: Menu.Label,
          text: 'General'
        },
        $list: {
          base: Menu.List,
          items: [
            { text: 'Dashboard' },
            { text: 'Customers' }
          ]
        }
      },
      $administration: {
        layout: Layout.passthru,
        $label: {
          base: Menu.Label,
          text: 'Administration'
        },
        $list: {
          base: Menu.List,
          items: [
            { text: 'Team Settings' },
            {
              text: 'Manage Your Team',
              selected: true,
              $list: {
                base: Menu.SubList,
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
          base: Menu.Label,
          text: 'Transactions'
        },
        $list: {
          base: Menu.List,
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
