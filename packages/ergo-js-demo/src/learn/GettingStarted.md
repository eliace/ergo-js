#### Установка
Загружаем пакеты

    npm install chorda-core chorda-react

#### Рендерер

    import { Config } from 'chorda-core'
    import { ReactRenderer } from 'chorda-react'

    Config.use(ReactRenderer);

#### Компонент

    const app = new Html({
        css: 'application'
    });

#### DOM

    document.addEventListener('DOMContentLoaded', function () {
        Config.Renderer.append(app, document.getElementById('app'))
    });