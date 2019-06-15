import {Html, Layouts, Tabs, Source, Button} from '../../src'

import {Mutate} from '../helpers'
import _ from 'lodash'
import axios from 'axios'


export default (projector) => {
  return {
    layout: Layouts.Rows,
    items: [{
      sources: {
        data: {
          message: 'Привет'
        }
      },
      $example: {
        id: 'example',
        $message: {
          html: 'p',
          dataChanged: Mutate.Text,
          dataId: 'message'
        }
      }
    }, {
      sources: {
        data: new Source({
          message: 'Привет'
        }, {
          computed: {
            reversedMessage: function (v) {
              return v.message.split('').reverse().join('')
            }
          }
        })
      },
      $example: {
        id: 'example',
        $message: {
          html: 'p',
          dataChanged: Mutate.Text,
          dataId: 'message',
          format: v => 'Изначальное сообщение: «'+v+'»'
        },
        $reversedMessage: {
          html: 'p',
          dataChanged: Mutate.Text,
          dataId: 'reversedMessage',
          format: v => 'Сообщение задом наперёд: «'+v+'»'
        }
      }
    }, {
      sources: {
        data: new Source({
        }, {
          computed: {
            now: function (v) {
              return Date.now()
            }
          }
        })
      },
      $example: {
        $button: {
          type: Button,
          text: 'Click me',
          onClick: function () {
            this.sources.data.update()
          }
        },
        $info: {
          html: 'p',
          dataChanged: Mutate.Text,
          dataId: 'now'
        }
      }
    }, {
      $example: {
        sources: {
          data: new Source({
            question: '',
            answer: 'Пока вы не зададите вопрос, я не могу ответить!'
          }, {
            methods: {
              getAnswer: function () {
                const v = this.get()
                if (v.question.indexOf('?') === -1) {
                  this.set('answer', 'Вопросы обычно заканчиваются вопросительным знаком. ;-)')
                  return
                }
                this.set('answer', 'Думаю...')
                var src = this
                axios.get('https://yesno.wtf/api')
                  .then(function (response) {
                    src.set('answer', _.capitalize(response.data.answer))
                  })
                  .catch(function (error) {
                    src.set('answer', 'Ошибка! Не могу связаться с API. ' + error)
                  })
              },
              updateQuestion (v) {
                if (!this.debouncedGetAnswer) {
                  this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
                }
                this.set('question', v)
                this.set('answer', 'Ожидаю, когда вы закончите печатать...')
                this.debouncedGetAnswer()
              }
            }
          })
        },
        binding: function () {
          projector.scheduleRender()
        },
        $input: {
          html: 'input',
          onInput: function (e) {
            this.sources.data.updateQuestion(e.target.value)//.getAnswer()//.entry('question').set(e.target.value)
          }
        },
        $info: {
          html: 'p',
          dataChanged: Mutate.Text,
          dataId: 'answer'
        }
      }
    }]
  }
}
