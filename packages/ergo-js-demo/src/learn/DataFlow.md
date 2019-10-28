## Область видимости и контекст

Область видимости объекта формируется из контекста. В свою очередь контекст дочерних объектов формируется из области видимости родительского. Таким образом получается каскадируемый контекст, похожий по своему поведению на прототипное наследование javascript.

```javascript
new Html({
    scope: {
        title: 'Coffee',
        color: 'red'
    },
    $header: {
        $title: {
            text: $value('title'), // связывание свойства
            colorChanged: function (v) {
                this.opt('styles': {color: v}) // связывание канала
            }
        }
    }
});
```

Область видимости можно рассмотреть как один объект с множеством свойств, каждое из которых можно связать с опциями самого компонента или эго дочерними компонентами.   
С другой стороны область видимости можно представить как каскад потоков данных (каналов), которые распространяются от одного общего источника. Данный в этих потоках объединяются по степени связности.

```javascript
new Html({
    scope: {
        // title и color выставляются один раз при создании компонента, значит их можно объединить в один канал data
        data: {
            title: 'Coffee',
            color: 'red'
        }
    },
    $header: {
        $title: {
            dataChanged: function (v) {
                this.opt('text', v.text)
                this.opt('styles', {color: v.color})
            }
        }
    }
});
```


## Компоненты и элементы
`components` и `items` для работы с данными поддерживают два типа значения:
* `Source`
* `Iterator`

#### Source
Значение из контейнера извлекается и применяетя как обычно

```javascript
new Html({
    scope: {
        data: {
            label: 'Coffee',
            temperature: 'hot'
        }
    },
    dataChanged: function (value, data) {
        this.opt('components', data)
    },
    $label: {
        //  в канале доступны label и temperature
    },
    $temperature: {
        // в канале доступны label и temperature
    },
});
```

#### Iterator
Каждый элемент данных, полученный при итерации, связывается с дочерним элементом в указанном канале

```javascript
new Html({
    scope: {
        data: {
            label: 'Coffee',
            temperature: 'hot'
        }
    },
    dataChanged: function (value, data) {
        this.opt('components', data.$iterator('data')) // целевым каналом указываем тот же канал data
    },
    $label: {
        // значением канала является значение label
    },
    $temperature: {
        // значением канала является значение temperature
    },
});
```

В случае `items` ситуация интересна тем, что необходимости в шаблонах нет, а для конфигурации достаточно использовать `defaultItem`

```javascript
new HtmlList({
    scope: {
        list: ['Coffee', 'Tea', 'Milk']
    },
    defaultItem: {
        text: $value('item')
    },
    items: $iterator('list', 'item') // создаем дополнительный канал item в скоупах дочерних элементов
});

// получим в итоге:
// <ul>
//   <li>Coffee</li>
//   <li>Tea</li>
//   <li>Milk</li>
// </ul>
```

<div class="alert is-info">
С помощью итератора реализуется конструкция [for-each item in list]
</div>


## Каналы и каскадирование

>При декларативном использовании итераторов в javascript очень тяжело следить за появлением новых переменных скоупа, гораздо лучше описанную выше технику использовать в html-шаблонах. В синтаксисе Vue это будет выглядеть так:
> ```html
    <ul>
        <li v-for="item in list">
            {{ item }}
        </li>
    </ul>
>```

При работе с каналами запись менее компактна, но лучше отражает работу механизма каскадирования
```javascript
new HtmlList({
    scope: {
        data: ['Coffee', 'Tea', 'Milk']
    },
    defaultItem: {
        dataChanged: function (v) {
            this.opt('text', v)
        }
    },
    dataChanged: function (v, data) {
        this.opt('items', data.$iterator('data'))
    }
})
```