import {makeAutoObservable} from "mobx";

export default class FunctionalStore {

    isLoading = false;

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }


}