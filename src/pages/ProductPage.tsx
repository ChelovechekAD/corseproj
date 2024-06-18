import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {orderCartStore, productPageStore} from "../Context";
import "../static/styles/product-page.css"
import {useNavigate, useParams} from "react-router-dom";
import {IMG_NOT_FOUND_PATH} from "../utils/Constants";
import {AiFillStar} from "react-icons/ai";
import Counter from "../fragments/Counter";
import ReviewsBlock from "../fragments/ReviewsBlock";
import UserReviewBlock from "../fragments/UserReviewBlock";
import "../static/styles/review.css"
import { IoIosArrowDown } from "react-icons/io";
import {Pagination} from "@mui/material";


function ProductPage() {

    const navigate = useNavigate();
    const {id} = useParams();

    const [state, setState] = useState({
        count: 1,
    });
    const [initC, setInitC] = useState({
        ready: false
    });

    const [reviewBlockVisible, toggleReviewBlockVisible] = useState({
        visible: false
    });

    const toggleReviews = () => {
        toggleReviewBlockVisible({visible: !reviewBlockVisible.visible});
    }

    useEffect(() => {
        console.log(initC.ready)
        if (!id) {
            navigate("/not-found");
            return;
        }
        const idInt = Number.parseInt(id);
        if (!productPageStore.product || productPageStore.product.id !== idInt) {
            productPageStore.product = null;
            productPageStore.newProduct = true;
            productPageStore.tryToFetchProduct(idInt)
                .then(elem => {
                    setInitC({ready: true});
                    productPageStore.product = elem
                })
                .catch(e => {
                    console.log(e)
                    navigate("/not-found");
                });
        } else {
            productPageStore.newProduct = false;
            setInitC({ready: true});
        }
    }, [id, navigate, initC.ready]);

    const addToCart = () => {
        if (productPageStore.product) {
            orderCartStore.saveItem(productPageStore.product, state.count)
                .then(() => {
                    console.log("%s successfully added to cart. Total price: %d", productPageStore.product?.name,
                        (productPageStore.product?.price || 0) * state.count);
                });
        } else {
            console.log("Something went wrong during 'Add to cart' process.")
        }
    }

    return (
        <>
            {initC.ready &&
                <div className="product-page">
                    <div className="product">
                        <div className="product-image">
                            <img src={"./img/" + (productPageStore.product?.imageLink ?? IMG_NOT_FOUND_PATH)} alt=""/>
                            <p className='rating'>{productPageStore.product?.rating}<AiFillStar
                                className='rating-icon'/>
                            </p>
                        </div>
                        <div className="product-block">
                            <div className="product-block-info">
                                <h2>{productPageStore.product?.name}</h2>
                                <p>{productPageStore.product?.description}</p>
                            </div>
                            <div className="product-block-util">
                                <div className='add-to-cart'
                                     onClick={addToCart}>
                                    ADD TO CART
                                </div>
                                <Counter onValueChange={(e: number) => {
                                    setState({count: e})
                                }}/>
                                <p className="price">{Intl.NumberFormat().format((productPageStore.product?.price || 0)
                                    * state.count)}$</p>
                            </div>
                        </div>
                    </div>
                    <p className="title-b" onClick={() => toggleReviews()}>Отзывы <IoIosArrowDown
                        className={`title-b-arrow ${reviewBlockVisible.visible && 'rotate'}`}/></p>
                    <div className={`reviews-block ${reviewBlockVisible.visible ? 'show' : 'hidden'}`}>
                        <UserReviewBlock/>
                        <ReviewsBlock/>
                        {productPageStore.pageNum > 1 && <Pagination
                            className='pagination-block'
                            count={productPageStore.maxCountOfReviewsPage}
                            page={productPageStore.pageNum}
                            onChange={(_, num) => {
                                productPageStore.pageNum = num
                            }}
                        />}
                    </div>
                    <p className="title-b" >Магазины <IoIosArrowDown
                        className={`title-b-arrow`}/></p>
                </div>}
        </>
    );
}

export default observer(ProductPage);