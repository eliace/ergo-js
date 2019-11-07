import { Html } from "chorda-core";


export default class Loader extends Html {
    config () {
        return {
            $spinner: {
                css: 'loader',
                styles: {
                    fontSize: '3em'
                }    
            },
            $content: {
                css: 'loader-label'
            }
        }
    }
}
