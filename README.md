

## Сборка проекта и документации


Собираем **js** и **css** файлы, готовим дистрибутив
```bash
grunt
```

Генерируем документацию
```bash
grunt docs
```


## Быстрый старт


Скачиваем дистрибутив ErgoJS

Подключаем сценарии ядра и виджетов
```html
<script src="lib/ergojs-core.js" type="text/javascript"></script>
<script src="lib/ergojs-widgets-all.js" type="text/javascript"></script>
```

Подключаем стили
```html
<link href='lib/ergojs.css' rel='stylesheet' type='text/css'>
```

Самый лучший момент для создания виджетов - после загрузки страницы, поэтому воспользуемся обработчиком события jQuery.ready

```javascript
$(document).ready(function(){

    // создаем простой виджет и добавляем его в <body/>
    $.ergo({
        etype: 'box',
        renderTo: 'body'
    });

});

```

## Road Map
* Bower dependency management
* Migration to jQuery 2 (no more IE8 support)
* Using ES5 getters and setters instead of get_*/set_* properties
* Plugins and mixins will be the same thing as they have to
* CSS animations
* Flex layout
* Performance optimization

and more new widgets :)