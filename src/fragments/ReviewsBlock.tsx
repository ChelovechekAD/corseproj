import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {productPageStore, store} from "../Context";
import ReviewBlock from "./Review";

const showReviews = () => {
    return <>

        {productPageStore.reviews?.map((review) => {
            if (review.userId !== store.user.id) {
                return <ReviewBlock review={review} key={review.userId}/>
            }
        })}
    </>
}

const showNothing = () => {
    return <p className="no-reviews">Отзывов нет.</p>
}

function ReviewsBlock() {
    const [state, setState] = useState({
        init: false
    })

    useEffect(() => {
        if (!state.init && productPageStore.newProduct) {
            productPageStore.tryToFetchProductReviews()
                .then(() => setState({init: true}))
        }
    }, [state.init, productPageStore.newProduct]);

    return (
        <div className="reviews">
            {productPageStore.reviewCount > 0 ? showReviews() : showNothing()}
        </div>
    );
}

export default observer(ReviewsBlock);