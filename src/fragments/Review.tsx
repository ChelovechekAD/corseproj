import React, {useState} from 'react';
import {AiFillStar} from "react-icons/ai";
import {Review} from "../models/Review";

interface Props {
    review: Review
}

function ReviewBlock(props: Props) {

    return (
        <div className="review">
            <div className="title">
                <p className="full-name">{props.review.name} {props.review.surname}</p>
                <p className='rating'>{props.review.rating}
                    <AiFillStar className='rating-icon'/>
                </p>
            </div>
            <div className="review-content">
                <div className="review-description">{props.review.description}</div>
            </div>
        </div>
    );
}

export default ReviewBlock;