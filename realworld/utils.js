
export const Mutate = {
  Text: function (v) {
    this.opt('text', v)
  },
  Items: function (v, k) {
    this.opt('$items', k)
  },
  Components: function (v, k) {
    this.opt('$components', this.sources[k])
  }
}
