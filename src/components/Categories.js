import React, { Component } from 'react'

export class Categories extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories : [
                {
                    id: 1,
                    name: 'Всё'
                }, 
                {
                    id: 2,
                    name: 'Стулья'
                },
                {
                    id: 3,
                    name: 'Столы'
                }
            ]
        }
    }

  render() {
    return (
      <div className='categories'>
        {this.state.categories.map(el => (
            <div key={el.id} onClick={() => this.props.chooseCategory(el.id)}>{el.name}</div>
        ))}
      </div>
    )
  }
}

export default Categories