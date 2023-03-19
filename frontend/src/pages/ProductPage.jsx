import React, { useState, useEffect } from "react";
import { HiHome } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Image, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { productDetails, productReviewCreate } from "../store";

const ProductPage = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    // if (successProductReview) {
    //   setRating(0);
    //   setComment("");
    // }
    if (!product._id || product._id !== id) {
      // console.log(id);
      dispatch(productDetails(id));
      // dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, id]);

  const productsData = useSelector((state) => state.product);
  const { loading, error, product } = productsData;

  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productsData.reviewCreate;
  console.log("product", product);

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const addToCartHandler = () => {
    history(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productReviewCreate(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Meta title={product.name} />
      <h3 className="text-4xl p-1">{product.name}</h3>
      <div className="flex my-3 text-lg">
        <HiHome className="my-1" />
        {" / "}
        <Link className="mx-3" to="/">
          Home
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="flex">
            <div className="flex-auto w-32">
              <Image src={product.image} alt={product.name} fluid />
            </div>
            <div className="flex-auto w-40">
              <ul variant="flush">
                <li>Description: {product.description}</li>
                <li>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </li>
                <li>Price: Rs. {product.price}</li>
              </ul>
            </div>
            <div className="flex-auto space-y-4 mx-2 w-20 border-solid border-1 p-2 m-2 border-gray-150">
              <flex>
                <div>
                  <div>Price:</div>
                  <div>
                    <strong>₹{product.price}</strong>
                  </div>
                </div>
              </flex>

              <flex>
                <div>
                  <div>Status:</div>
                  <div>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </div>
                </div>
              </flex>

              {product.countInStock > 0 && (
                <flex>
                  <div>
                    <div>Qty</div>
                    <div>
                      <select
                        className="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </flex>
              )}

              <flex>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </flex>
            </div>
          </div>

          <div className="flex">
            <div className="flex-auto w-64">
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <h2>No Reviews</h2>}
              <ul>
                {product.reviews.map((review) => (
                  <li key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}
                <li>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;
