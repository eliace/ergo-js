import Source from './Source'

const Config = {
    HTML_OPTIONS: {},
    HTML_EVENTS: {},
    Renderer: {},
    defaultSource: Source,
    use: function (plugin) {
        plugin(this)
    }
}

export default Config