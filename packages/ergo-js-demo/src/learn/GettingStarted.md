#### Установка
Загружаем пакеты

    npm install ergo-js-core ergo-js-react

#### Рендерер

    import { Config } from 'ergo-js-core'
    import { ReactRenderer } from 'ergo-js-react'

    Config.use(ReactRenderer);

#### Компонент

    const app = new Html({
        css: 'application'
    });

#### DOM

    document.addEventListener('DOMContentLoaded', function () {
        Config.Renderer.append(app, document.getElementById('app'))
    });