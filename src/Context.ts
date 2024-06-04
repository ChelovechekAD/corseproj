import {createContext} from "react";
import Store from "./store/Store";
import CatalogStore from "./store/CatalogStore";
import FunctionalStore from "./store/FunctionalStore";
import OrderCartStore from "./store/OrderCartStore";
import AdminStore from "./store/AdminStore";

export interface State {
    store: Store,
    catalogStore: CatalogStore,
    functionalStore: FunctionalStore,
    orderCartStore: OrderCartStore,
    adminStore: AdminStore,
}

export const adminStore = new AdminStore();
export const catalogStore = new CatalogStore();
export const store = new Store();
export const orderCartStore = new OrderCartStore();
export const functionalStore = new FunctionalStore();

export const Context = createContext<State>({
    store,
    catalogStore,
    functionalStore,
    orderCartStore,
    adminStore,
})
  