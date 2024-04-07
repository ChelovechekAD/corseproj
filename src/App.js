import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Items from './components/Items';
import Categories from './components/Categories';
import ShowFullItem from './components/ShowFullItem';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      currentItems: [

      ],
      items: [
        {
          id: 1,
          title: 'Стул серый ddddddddssssss asdas dasdasdadda sdfaasdads',
          img: 'table-white.jpg',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
          category: 2,
          price: '49.99'
        },
        {
          id: 2,
          title: 'Стул серый ddddddddssss',
          img: 'table-white.jpg',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
          category: 2,
          price: '549.99'
        },
        {
          id: 3,
          title: 'Стол белый',
          img: 'table-white.jpg',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
          category: 3,
          price: '349.99'
        },
        {
          id: 4,
          title: 'Стул серый',
          img: 'table-white.jpg',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
          category: 2,
          price: '249.99'
        },
        {
          id: 5,
          title: 'Стул серый',
          img: 'table-white.jpg',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
          category: 2,
          price: '149.99'
        }
      ],
      showFullItem: false, 
      fullItem: {}
    };
    this.state.currentItems = this.state.items;
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
  }
  
  render(){ 
    return (
      <div className='wrapper'>
        <Header orders={this.state.orders} onDelete={this.deleteOrder}/>
        <Categories chooseCategory={this.chooseCategory}/>
        <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder} />

        {this.state.showFullItem && <ShowFullItem item={this.state.fullItem} onAdd={this.addToOrder} onShowItem={this.onShowItem} />}
        <Footer />

      </div>
    );
  }

  onShowItem(item) {
    this.setState({fullItem: item})
    this.setState({showFullItem: !this.state.showFullItem})
  }

  chooseCategory(category){
    if (category === 1) {
      this.setState({currentItems: this.state.items});
      return;
    };

    this.setState({
      currentItems: this.state.items.filter(el => el.category === category)
    });
    
  }

  deleteOrder(id){
    this.setState({orders: this.state.orders.filter(el => el.id !== id)});
  }

  addToOrder(item){
    let isInArray = false;
    this.state.orders.forEach(el => {
      if (el.id === item.id){
        isInArray = true;
      }
    })
    if (!isInArray){
      this.setState({orders: [...this.state.orders, item]});
    }
  }
}

export default App;
