import React, {Component} from 'react';
import Items from './components/Items';
import Categories from './components/Categories';
import {catalogStore, Context, State, store} from './Context';
import PaginationBlock from './fragments/PaginationBlock';


class Page extends Component {
    static contextType = Context; // Assign the context to contextType property
    context!: State;

    componentDidMount() {
        catalogStore.getAllCategories();
        catalogStore.getAllProductsPage(1);
        // orderCartStore.getCart(parseInt(store.user.id));
        store.setPath("/")
    }

    render() {
        return (
            <div>
                <Categories/>
                <Items/>
                <PaginationBlock/>
            </div>
        );
    }

}

export default Page;
