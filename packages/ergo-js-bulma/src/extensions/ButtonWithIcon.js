import { Button, IconBox } from '../elements'

export default class ButtonWithIcon extends Button {
    config () {
      return {
        // $icon: {
        //   as: IconBox,
        //   css: 'is-small',
        // },
        // $content: {
        //   html: 'span',
        //   renderIfEmpty: false
        // }
      }
    }
    // options () {
    //   return {
    //     icon: {
    //       initOrSet: function (v) {
    //         this.$icon.opt('icon', v)
    //       }
    //     }
    //   }
    // }  
}
  