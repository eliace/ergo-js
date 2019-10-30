## Область видимости и контекст

#### Область видимости (скоуп)

Область видимости (скоуп) объекта формируется из контекста. В свою очередь контекст дочерних объектов формируется из области видимости родительского. Таким образом получается каскадируемый контекст, похожий по своему поведению на прототипное наследование javascript.

```javascript
new Html({
    scope: {
        // добавляя переменную в скоуп мы делаем ее доступной всем дочерним элементам на всех уровнях
        title: 'Coffee'
    },
    $header: {
        $title: {
            $link: {
                // здесь значение переменной title можно получить через скоуп
            }
        }
    }
});
```
Каждый компонент имеет свой объект `scope`. Скоупы компонентов `$header` и `$link` не равны друг другу, но содержат те же переменные. Это означает, что доабвление новых переменных в скоупах потомков не влияет на родительский скоуп.

#### Иерархия областей видимости
```javascript
new Html({
    // вэтом скоупе только description
    scope: {
        description: 'Hello'
    },
    $image: {
        // этот скоуп содержит и image, и description
        scope: {
            image: 'mountains.jpg'
        },
        html: 'img',
        src: $value('image'),
        alt: $value('description'),
    }
});
```

#### Область видимости класса
Как только мы выносим некоторый функционал в отдельный класс, вместе с ним можно вынести и определения области видимости. Нюанс только в том, что данные на уровне класса не известны. Мы можем, к примеру, выставить значения по умолчанию.

```javascript
class Image extends Html {
    config () {
        return {
            // описываем скоуп пустыми значениями
            scope: {
                image: ''
                description: ''
            },
            html: 'img',
            src: $value('image'),
            alt: $value('description'),
        }
    }
}

new Html({
    $image: {
        as: Image,
        // перекрываем скоуп компонента image своими значениями
        scope: {
            description: 'Hello',
            image: 'mountains.jpg'
        }
    }
});
```

#### Контекст
Задавая скоуп в каждом отдельном компоненте мы быстро превратим наш код в спагетти. Гораздо удобнее управлять всем из одного корневого скоупа, которому потомки "делегируют" свои переменные (если мы смотрим на проблему со стороны компонентов-потомков). Но для этого скоуп класса должен понимать, что данные нужно откуда-то взять. Откуда? Конечно из контекста, который по сути является скоупом родителя.
```javascript
class Image extends Html {
    config () {
        return {
            scope: {
                image: (ctx) => ctx.image || '', // переменная скоупа может быть задана как функция инициализации
                description: (ctx) => ctx.image || ''
            }
        }
    }
}
new Html({
    scope: {
        image: 'sunflower.jpg'
    },
    $content: {
        $image: {
            as: Image
        }
    }
})
```

Итак, мы создали отдельный класс, в котором есть переменная скоупа `image` и через которую задается url картинки. А что, если таких картинок несколько и в корневом скоупе они, естественно, называются по-разному?
```javascript
new Html({
    scope: {
        image1: 'sunflower.jpg',
        image2: 'mountains.jpg'
    },
    $header: {
        // здесь мы можем ввести в скоуп переменную image, которая будет использована дочерним Image
        scope: {
            image: (ctx) => ctx.image1
        },
        $image: {
            as: Image
        }
    },
    $footer: {
        scope: {
            image: (ctx) => ctx.image2
        },
        $image: {
            as: Image
        }
    }
})
```
<div class="alert is-info">
Пирведенный выше пример искуственный, нужный только для демонстрации работы с областями видимости. Простые значения лучше всего связывать через опции.
</div>

## Реактивность
Для того, чтобы возникала реакция, компонент должен подписаться на изменения переменной (связывание). Это происходит в случаях, когда среди опций есть:
* реактивная функция (`changed`) с именем переменной
* реактивные значения, связанные с именем переменной
* функции согласования (`joined`) с именем переменной
* общая функция согласования `allJoined`

#### Реактивная функция
```javascript
new Html({
    scope: {
        data: 100,
        title: 'Hello'
    },
    $content: {
        dataChanged: function (v) {
            // v == 100
            // здесь мы можем изменить свойства компонента
        }
    },
    $description: {
        titleChanged: function (v) {
            // v == 'Hello'
            // изменим свойство text
            this.opt('text', v)
        }
    }
});
```

#### Реактивное значение
```javascript
new Html({
    scope: {
        pic: 'sunflower.jpg',
        title: 'Hello'
    },
    $header: {
        text: $value('title') // связываем опцию text со значением переменной скоупа title
    },
    $image: {
        src: $value('pic')
    }
});
```


## Объекты и массивы
До этого мы рассматривали простые типы данных. Они несвязанны и иммутабельны, т.е. их можно спокойно копировать и изменять не беспокоясь о сайд-эффектах. А что со сложными типами вроде `Object` и `Array`?

#### Создание элементов с items и components
В простых случаях все то же самое
```javascript
new Html({
    scope: {
        list: ['Coffee', 'Tea', 'Milk'],
        map: {
            header: true,
            content: true,
            footer: false
        }
    },
    $header: {},
    $content: {
        items: $value('list')
    },
    $footer: {},
    components: $value('map')
})
```
А если мы возьмем более сложный пример?
```javascript
new Html({
    scope: {
        users: [{
            id: 1,
            name: 'Alice',
            login: 'alice7',
            roles: ['admin']
        }, {
            id: 2,
            name: 'Bob',
            login: 'froggy',
            roles: ['user', 'test']
        }]
    },
    $content: {
        items: $value('list') // каждый item будет имеет тот же скоуп, что и родитель. Проблема!
    }
});
```
Выходом является использование итератора `$iterator`. Кроме того, что итератор пройдет по списку всех элементов `Object` или `Array`, он еще и свяжет эти элементы с соответсвующими дочерними компонентами.
```javascript
...
$content: {
    defaultitem: {
        // данные нашего элемента мы теперь можем получить из переменной скоупа user
    },
    items: $iterator('users', 'user')
}
...
```
<div class="alert is-info">
Поведение components аналогично поведению items
</div>

#### Совместное использование данных

```javascript
new Html({
    scope: {
        num: 0
    },
    $form: {
        $input: {
            html: 'input',
            numChanged: function (v) {
                this.opt('value', v)
            }
        },
        $result: {
            numChanged: function (v) {
                this.opt('text', v)
            }
        }
    }
})
```





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

Область видимости можно рассмотреть как один объект с множеством свойств, каждое из которых можно связать с опциями самого компонента или его дочерними компонентами.   
С другой стороны область видимости можно представить как каскад потоков данных (каналов), которые распространяются от одного общего источника. Данные в этих потоках объединяются по степени связности.

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
Из контейнера извлекаются "сырые" данные и применяются в качестве значения

```javascript
new Html({
    scope: {
        data: {
            label: 'Coffee',
            temperature: 'hot'
        }
    },
    components: $value('data'),
    $label: {
        //  в канале доступны label и temperature
    },
    $temperature: {
        // в канале доступны label и temperature
    },
});
```

#### Iterator
Каждый элемент (`entry`) данных, полученный при итерации, связывается с соответствующим дочерним элементом компонента

```javascript
new Html({
    scope: {
        data: {
            label: 'Coffee',
            temperature: 'hot'
        }
    },
    components: $iterator('data'),
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
    items: $iterator('list', 'item') // в дочерние скоупы элементы list будут доступны как item
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

> В синтаксисе шаблонов Vue это выглядело бы так:
> ```html
    <ul>
        <li v-for="item in list">
            {{ item }}
        </li>
    </ul>
>```


## Модель данных

Рассмотрим пример с компонентом `Card`, состоящий из элементов: `header`, `content`, `footer`.
```javascript
{
    $header: {},
    $content: {},
    $footer: {}
}
```
 Данные для нашей карточки будут иметь такой вид
 ```javascript
 const product = {
     title: 'Backback Osprey Raptor',
     image: 'http://all-backpacks.shop.com',
     cost: 1 // распродажа
 };
 ```
Описание карточки может выглядеть так:
```javascript
class Card extends Html {
    config () {
        return {
            scope: {
                title: String,
                image: String,
                cost: Number
            },
            $header: {
                text: $value('title')
            },
            $content: {
                html: 'img',
                src: $value('image')
            },
            $footer: {
                text: $value('cost')
            }
        }
    }
    options () {
        return {
            title: {/**/},
            image: {/**/},
            cost: {/**/}
        }
    }
};
```
Создадим карточку
```javascript
// Вариант 1 (маппинг свойств - для этого они должны быть определены в классе)
new HtmlList({
    defaultItem: {
        title: $value('card', 'title'),
        image: $value('card', 'image'),
        cost: $value('card', 'cost')
    },
    items: $iterator('cards', 'card')
});

// Вариант 2 (маппинг скоупа - свойства здесь не нужны)
new HtmlList({
    defaultItem: {
        scope: {
            title: ctx => ctx.card.title,
            image: ctx => ctx.card.image,
            cost: ctx => ctx.card.cost,
        }
    },
    items: $iterator('cards', 'card')
});
```
Вариант 1 можно упростить (спорное утверждение!), используя html-шаблоны, например:
```html
<ul>
    <li v-for="card in cards">
        <div>{{ card.title }}</div>
        <img v-bind:src="image">
        <div>{{ cost }}</div>
    </li>
</ul>
```

Все хорошо.   
А теперь пусть заголовок карточки отрисовывается с помощью компонента `Title`.
```javascript
...
$header: {
    as: Title,
    text: $value('title')
}
...
```
Возникает пара проблем, связанных общей причиной - опция `title` или переменная скоупа `title` не имеет для типа `Title` смысла - в другом контексте в заголовке может понадобится выодить, к примеру дату или группу товаров. Здесь нам придется найти компромисс - создать некоторый API, например:
* ограничить набор опций (так, как мы их заводили в классе `Card`)
* ограничить скоуп моделью (так, как мы сделали в классе `Card`)
* или использовать переменную контекста как модель (рассмотрим ниже)

## Каналы и каскадирование
Перепишем наш пример с заголовком, чтобы количество вложений увеличилось
```javascript
const config = {
    as: Card,
    $header: {
        as: Header,
        $title: {
            as: Title
        }
    }
});
```
Предположим, что мы определили внешний API для `Card`, и этот компонент теперь можно встраивать в другие компоненты. Теперь посмотрим на `Card` как на элемент структуры, а не на сложный компонент и зададимся вопросом - имеют ли для уровня `Card` какой-то смысл переменные скоупа (или опции) `title`, `image` или `cost`? Вроде как нет. А для `Header`? Хм, тоже нет. А вот для `Title` совсем другое дело - переменная контекста `title` вся суть заголовка. Зачем тогда мы предоставляем "ненужную" информацию промежуточным элементам структуры, если для них она не несет особого смысла? Попробуем обезличить наши данные, объединив их в одну переменную скоупа/контекста и передать их в таком виде до заголовка
```javascript
const config = {
    scope: {
        data: {
            title: 'Thermo Cup',
            image: 'cup.jpg',
            cost: 100,
        }
    },
    as: Card,
    $header: {
        as: Header,
        $title: {
            as: Title,
            text: $value('data', 'title') // все, что остается - извлечь нужное свойство из обезличенной переменной контекста
        }
    }
});
```
<div class="alert is-info">
Канал - это обезличенная переменная контекста, которая содержит связанный набор данных и служит для их доставки к 
вложенным компонентам
</div>

<div class="alert is-warning">
Дальнейшее изложение будет идти только с точки зрения канального подхода к данным, но канал всегда можно представить как примитивный тип данных и свести управление данными к моделированию скоупа.
</div>

#### Каскад данных
Ранее в качестве аналогий приводились конструкции for-each и область видимости javascript. Но это не совсем правильное сравнение. Так JS запрещает перекрытие (shadow) переменных родительской области видимости переменными в дочерней, т.е. в 
каждом вложенном блоке должны порождаться новые переменные
```javascript
for (let i in data) {
    const a = data[i]
    for (let j in a) {
        const b = a[j]
        for (let k in b) {
            const c = b[k]
            result += c // в области видимости теперь есть a, b, c и data (хорошо, если они все нам нужны!)
        }
    }
}

for (let i in data) {
    for (let j in data[i]) {
        for (let k in data[i][j]) {
            result += data[i][j][k] // это все та же переменная data (+ составной ключ)
        }
    }
}
```

#### Разделение каналов

#### Согласование каналов
join all

#### Настройка канала
в том числе адаптация канала