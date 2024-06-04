import React, {Component} from 'react'

interface ShowFullItemProps {
    item: any;
    onShowItem: (item: any) => void;
}


export class ShowFullItem extends Component<ShowFullItemProps, {}> {
    render() {
        return (
            <div className='full-item'>
                <div>
                    <img src={"./img/" + this.props.item.img} alt='TEXT'
                         onClick={() => this.props.onShowItem(this.props.item)}/>
                    <h2>{this.props.item.title}</h2>
                    <p>{this.props.item.desc}</p>
                    <b>{this.props.item.price}$</b>
                    <div className='add-to-cart'>+</div>
                </div>
            </div>
        )
    }
}

export default ShowFullItem