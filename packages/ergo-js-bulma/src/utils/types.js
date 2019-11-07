import { Domain } from "chorda-core"

export class Collection extends Domain {

    remove (id) {
        const v = this.get()
        const del = v.splice(id, 1)
        this.set(v)
        return del
    }

    add (v) {
        const arr = this.get()
        arr.push(v)
        this.set(arr)
    }

}
