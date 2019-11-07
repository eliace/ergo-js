import {Html, Source} from 'chorda-core'
import {Layouts, Content, Image} from 'chorda-bulma'
import {Mutate} from '../helpers'

const api = {
  getComments: function (postId) {
    return fetch('https://jsonplaceholder.typicode.com/comments?postId='+postId)
       .then(response => response.json())
  },
  getPosts: function () {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
  }
}

export default () => {
  return {
    sources: {
      users: {}
    },
    allJoined: function ({data}) {

      const loadPosts = data.$method('loadPosts', this, async () => {
//        data.set('posts', [])
        const posts = await api.getPosts()
        const t0 = new Date().getTime()
        data.set('posts', posts)
        const t1 = new Date().getTime()
        console.log('T[posts]', t1 - t0)
      })

      loadPosts()
    },
    $list: {
      dataId: 'posts',
      dataChanged: function (v, s, k) {
        return {items: s.$iterator(k)}
      },
      dataEntryId: (v) => v.id,
//           binding: function (v, sources, key) {
//             console.log('binding posts', key)
// //            if (!key || key == 'state') {
// //              return {items: 'state'}
// //              debugger
//               this.opt('items', 'state')
// //            }
//           },
      // defaultItem: {
      //   layout: Layouts.Media,
      //   $content: {
      //     as: Content,
      //     $content: {
      //       html: 'p',
      //       $title: {
      //         html: 'strong',
      //       }
      //     }
      //   }
      // },
      // dynamic: {
      //   state: {id: 'posts', items: Custom.All}
      // },
      defaultItem: {
        sources: {
          page: {
            showComments: false
          }
        },
        allJoined: function ({data, page}) {

          const loadComments = data.$method('loadComments', this, async () => {
            data.set('comments', await api.getComments(data.get('id')))
          })

          page.$prop('comments', null, v => v.showComments)

//          loadComments()
        },
        // styles: {
        //   marginBottom: '2rem'
        // },
        layout: Layouts.Media,
        $content: {
          as: Content,
          pageChanged: function (v, key, src) {
            this.opt('components', src.$stream(key))
              // this.opt('components', new Source({comments: v.showComments === true}))
              //
              // if (v.comments == null && !v.loadingComments) {
              //   v.loadingComments = true // это значение не связывается с компонентами
              //   const loadComments = (id) => {
              //     return fetch('https://jsonplaceholder.typicode.com/comments?postId='+id)
              //       .then(response => response.json())
              //       .then(json => {return {comments: json}})
              //   }
              //   const effects = [{
              //     name: 'fetch',
              //     resolver: loadComments,
              //     mode: 'pre'
              //   }]
              //   this.sources[key].wait(effects).emit('mergeWith', {data: v.id})
              // }
          },
          components: {
            comments: false
          },
//           dataEffects: function (event) {
// //                console.log(event)
//             if (event.name == 'fetch:done') {
//               projector.scheduleRender()
//             }
//           },
          // stateEffects: function (effect) {
          //   if (effect.context) {
          //     let baseName = 'on'+effect.context.substr(0, 1).toUpperCase()+effect.context.substr(1)
          //     if (this.options[baseName] && effect.status == 'wait') {
          //       this.options[baseName].call(this)
          //     }
          //     if (this.options[baseName+'Done'] && effect.status == 'done') {
          //       this.options[baseName+'Done'].call(this)
          //     }
          //   }
//                 if (effect.context == 'fetch_comments') {
//                   if (effect.status == 'wait') {
//                     console.log('start loading', effect.context)
//                   }
//                   else if (effect.status == 'done') {
//                     console.log('end loading', effect.context)
//                     projector.scheduleRender()
//                   }
//                   else {
//                     console.log('effect', effect)
//                   }
// //                  console.log('effect', effect)
//                 }
//              },
          // onFetch: function () {
          //   console.log('fetch begin')
          // },
          // onFetchDone: function () {
          //   console.log('fetch end')
          // },
          $content: {
            html: 'p',
            $title: {
              html: 'strong',
              dataId: 'title',
              dataChanged: function (v) {
                return {text: v}
              }
              // dynamic: {
              //   state: {id: 'title', options: Bindings.Text}
              // }
            },
            $content: {
              dataId: 'body',
              dataChanged: function (v) {
                return {text: v}
              }
              // dynamic: {
              //   state: {id: 'body', options: Bindings.Text}
              // }
            },
            $actions: {
              html: 'small',
//                  layout: Layouts.Level,
              items: [{
                html: 'a',
                binding: function ({page, data}, key) {
//                  const {page, data} = this.sources
//                      console.log('bind actions', v.showComments)
//                      const post = v.state
//                  const comments = data.get('comments')
                  if (data.comments) {
                    return {text: page.showComments ? 'Hide comments' : ('Show '+data.comments.length+' comments')}
//                        console.log('post', v)
                    // if (v.showComments) {
                    //   this.opt('text', 'Hide comments')
                    // }
                    // else {
                    //   this.opt('text', 'Show '+post.comments.length+' comments')
                    // }
                  }
                },
//                     stateOptions: function(v) {
//                       if (v.comments) {
// //                        console.log('post', v)
//                         if (v.showComments) {
//                           this.opt('text', 'Hide comments')
//                         }
//                         else {
//                           this.opt('text', 'Show '+v.comments.length+' comments')
//                         }
//                       }
//                     },
                onClick: function(e) {
                  this.sources.page.$toggle('showComments')
//                      this.sources.state.set('showComments', !this.sources.state.get('showComments'))
                }
//                    text: 'Show comments',
//                    levelLeft: true
              }]
            }
          },
          $comments: {
            weight: 10,
            layout: Layouts.PassThrough,
            dataId: 'comments',
            dataChanged: Mutate.Items,
            // dynamic: {
            //   state: {id: 'comments', items: Custom.All}
            // },
            defaultItem: {
              layout: Layouts.Media,
              $content: {
                as: Content,
                $content: {
                  html: 'p',
                  $title: {
                    html: 'strong',
                    dataId: 'name',
                    dataChanged: Mutate.Text
                    // dynamic: {
                    //   state: {id: 'name', options: Bindings.Text}
                    // }
                  },
                  $email: {
                    html: 'small',
                    styles: {marginLeft: '0.5rem'},
                    dataId: 'email',
                    dataChanged: Mutate.Text
                  },
                  $content: {
                    dataId: 'body',
                    dataChanged: Mutate.Text
                  }
                }
              }
            }
          }
        },
        $avatar: {
          allJoined: function ({users, user}) {

          },
          as: Image,
          css: 'is-64x64',
          mediaLeft: true,
          userChanged: function (v) {
            return {src: v.avatar}
          },
          // user: {
          //   key: 'avatar',
          //   bindTo: 'src'
          // },
//              dynamic: {
          dataChanged: function (post, key) {
            const {users} = this.sources
            let user = this.sources.users.get(post.userId)

//                console.log('user', user)
            if (user == null) {
              console.log('start loading user...')
              users.set(post.userId, {loading: true})
              fetch('https://reqres.in/api/users/'+post.userId)
                .then(response => response.json())
                .then(json => {
                  console.log('end loading user.')
                  users.set(json.data.id, json.data)
//                  projector.scheduleRender()
                })
            }
            if (this.sources.user == null) {
              this.opt('sources', {user: users.$entry(post.userId)})
              // FIXME здесь должен вызываться метод this.opt({sources: {user: ?}})
              // this.options.sources.user = this.sources.users.entry(post.userId)
              // this.bind(this.options.sources.user, 'user')
              // if (user) {
              //   this.rebind(this.sources.user.get(), 'user', this.sources.user)
              // }
            }

          },
//             user: {
//               id: 'avatar',
//               options: Custom.Src
//             },
//             state: {
//               options: function (v) {
//                 let user = this.sources.users.get(v.userId)
// //                console.log('user', user)
//                 if (user == null/* || !user.id*/) {
//                   console.log('start loading user...')
//                   this.sources.users.set(v.userId, {loading: true})
//                   fetch('https://reqres.in/api/users/'+v.userId)
//                     .then(response => response.json())
//                     .then(json => {
//                       console.log('end loading user.')
//                       this.sources.users.set(json.data.id, json.data)
//                       projector.scheduleRender()
//                     })
//                 }
//                 if (this.sources.user == null) {
//                   this.options.sources.user = this.sources.users.entry(v.userId)
//                   this.bind(this.options.sources.user, 'user')
//                   if (user) {
//                     this.rebind(this.sources.user.get(), 'user', this.sources.user)
//                   }
//                 }
//               }
//             }
          // }
        }
      }
    }
  }
}
