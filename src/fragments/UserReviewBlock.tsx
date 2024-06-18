import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {AiFillStar} from "react-icons/ai";
import {productPageStore, store} from "../Context";
import {FaTrash} from "react-icons/fa6";
import {Review} from "../models/Review";
import {CreateReviewRequest} from "../models/request/CreateReviewRequest";
import UserService from "../services/UserService";

function UserReviewBlock() {

    const [reviewDescription, setReviewDescription] = useState({
        message: ""
    });
    const [rating, setRating] = useState({
        value: 0
    });

    const [state, setState] = useState({
        init: false
    })

    const showUserReview = () => {

        return (
            <div className="user-review">
                <div className="title">
                    <p>Ваш отзыв</p>
                    <p className="rating">
                        {productPageStore.userReview?.rating || 0}
                        <AiFillStar className='rating-icon'/>
                    </p>
                    <p>
                        <FaTrash className='delete-icon' onClick={()=>tryToDeleteReview()}/>
                    </p>
                </div>
                <div className="review-content">
                    <p className="review-description">
                        {productPageStore.userReview?.description}
                    </p>
                </div>
            </div>
        )
    }

    const tryToCreateReview = () => {
        if (productPageStore.product?.id) {
            const review = {
                description: reviewDescription.message,
                rating: rating.value
            } as CreateReviewRequest
            UserService.createProductReviewOnProduct(productPageStore.product?.id, review)
                .then(() => {
                     const review1 = {
                        userId: store.user.id,
                        name: store.user.name,
                        surname: store.user.surname,
                        description: review.description,
                        rating: review.rating,
                    } as Review;
                    productPageStore.userReview = review1;
                    if (productPageStore.reviews) {
                        productPageStore.reviews.push(review1);
                        productPageStore.reviewCount += 1;
                    }else {
                        productPageStore.reviews = [];
                        productPageStore.reviews.push(review1);
                        productPageStore.reviewCount = 1;
                    }
                    console.log(productPageStore.reviews);
                })
                .catch(err => {
                    console.log("Error during review creation process: %s", err)
                })
        }
    }

    const tryToDeleteReview = () => {
        if (productPageStore.userReview) {
            productPageStore.tryToDeleteUserReview()
                .then(() => console.log("User review successfully deleted"))
            productPageStore.tryToFetchProductReviews();
        }
    }

    const updateRatingValue = (value: any) => {
        if (value < 0 || value > 10) {
            return
        }
        setRating({value: value});
    }

    const showCreateReview = () => {
        return (
            <div className="create-review">
                <p>Создание отзыва</p>
                <textarea title="Description"
                          value={reviewDescription.message}
                          onChange={event => {
                              setReviewDescription({message: event.target.value});
                          }}>
                </textarea>
                <p className="rating">Rating:
                    <input type="number" value={rating.value} onChange={event => {
                        updateRatingValue(Number.parseInt(event.target.value));
                    }}/>
                </p>
                <button onClick={() => {
                    tryToCreateReview();
                }}>Create
                </button>
            </div>
        )
    }

    useEffect(() => {
        if (!state.init && productPageStore.newProduct) {
            productPageStore.tryToFetchUserReview()
                .then(() => setState({init: true}))
        }
    }, [state.init, productPageStore.newProduct]);

    return (
        <div>
            {productPageStore.userReview ? showUserReview() : showCreateReview()}
        </div>
    );
}



export default observer(UserReviewBlock);