
export const Mutate = {
  Text: function (v) {
    this.opt('text', v)
  },
  Items: function (v, k, s) {
    this.opt('items', s.$stream(k))
  },
  Components: function (v, k, s) {
    this.opt('components', s.$stream(k))
  }
}

export function getEl (el) {
  this.el = el
}