import { Layouts, Field, Input, Button } from 'chorda-bulma'
import { Domain, joint as bind } from 'chorda-core'

function check (v, rules = []) {
    return rules.map(rule => rule(v)).filter(r => r !== true)
}

function Checkable (mixer) {
    mixer.mix({
        properties: {
            errors: function (v) {
                return check(v, this.src.options.rules)
            },
            isValid: function (v) {
                return check(v, this.src.options.rules).length > 0
            }
        }
    })
}

export default () => {
    return {
        layout: Layouts.Rows,
        items: [{
            sources: {
                data: () => new Domain({
                    name: 'Alice'
                }, {
                    properties: {
                        name: {
                            mix: { Checkable },
                            rules: [
                                (v) => !!v || 'Name should not be empty',
                                (v) => v.length > 4 || 'Name should be more than 4 symbols'
                            ]
                        },
                        isOk: {
                            calc: function () {
                                const c = ['name'].map((k) => this.src.$entry(k).isValid).filter(r => !!r)
                                return c.length == 0
                            }
                        }
                    }
                })
            },
            items: [{
                sources: {
                    data: (ctx) => ctx.data.$entry('name'),
                    invalid: (ctx) => ctx.data.$entry('name').$entry('isValid')
                },
                as: Field,
                label: 'Name',
                name: 'name',
                control: {
                    as: Input,
                    dataChanged: function (v) {
                        this.opt('value', v)
                    },
                    invalidChanged: function (v) {
                        this.opt('classes', {'is-danger': !!v})
                    },
                    onChange: function (e, {data}) {
                        data.$value = e.target.value
                    }
                },
                help: {
                    dataId: 'errors',
                    dataChanged: function (v, s) {
                        this.opt('text', v.join(', ') || 'User name')
                    },
                    invalidChanged: function (v) {
                        this.opt('classes', {'is-danger': !!v})
                    },
                },
                $label: {
                    invalidChanged: function (v) {
                        this.opt('classes', {'has-text-danger': !!v})
                    },
                }
                // dataChanged: function (v, s) {
                //     this.opt('components', {help: s.$props.isValid})
                // },
                // options: {
                //     invalid: {
                //         initOrSet: function (v) {
                //             this.sources.invalid.$value = v
                //         }
                //     }
                // }
            }],
            $footer: {
                weight: 10,
                $content: {
                    $tools: {
                        $submitBtn: {
                            as: Button,
                            text: 'Submit',
                            css: 'is-primary',
                            dataChanged: function (v, s) {
                                this.opt('disabled', !s.isOk)
                            }
                        }
                    }
                }
            }
        }]
    }
}