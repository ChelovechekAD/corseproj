import {Review} from "../Review";

export interface ProductReviewsResponse {
    reviewDTOList: Review[];
    countOfReviews: number;
}