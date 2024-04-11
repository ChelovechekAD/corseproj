import { makeAutoObservable } from "mobx";

export default class FunctionalStore {

    isLoading = false;

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }


}