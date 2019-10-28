
export class Html {
    opt (name: string, value: any) : void
    components: {
        [key: string]: Html
    }
}

interface IConfig {
    use (callback?: () => void) : void
}

export const Config: IConfig

export interface IOptions {
    mix (options: any) : IOptions
}