
class Event {
  constructor (name, data, options, owner, channel) {
    this.name = name
    this.options = options || {}
    this.data = data
    this.owner = owner
    this.channel = channel

    Object.assign(this, options)
    Object.freeze(this)
  }

  // get key () {
  //   return this.channel == CH_DEFAULT ? this.name : this.name+':'+this.channel
  // }
}


export default Event
