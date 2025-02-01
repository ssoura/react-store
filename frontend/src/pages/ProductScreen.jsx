import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { addToCart } from "../slices/cartSlice";


const Wrapper = styled.div`
  background-color: #FFF;
  padding: 1rem;
`;


// Styled Components
const BackButton = styled(Link)`
  display: inline-block;
  padding: 10px;
  margin: 10px 0;
  background-color: #f8f9fa;
  color: #000;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #e2e6ea;
    color: #000;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
`;

const ImageWrapper = styled.div`
  flex: 1;
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const Details = styled.div`
  flex: 1;
`;

const ReviewsSection = styled.div`
  margin-top: 20px;
`;

const Card = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListItem = styled.div`
  align-items: center;
  padding: 10px;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: #007bff;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 15px;
  cursor: pointer;
  width: 100%;

  &:disabled {
    background-color: #ccc;
      border: 1px solid #ccc;
  }
`;

const FormControl = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;


const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 0.5rem;
`;

const CounterInput = styled.span`
  min-width: 2rem;
  text-align: center;
  font-size: 1.2rem;
`;

const Label = styled.span`
  margin-right: 1rem;
  font-weight: bold;
`;

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const qtyHandler = (val) => {
    setQty(qty + val);
  };

  return (
    <>
    <Wrapper>
      <BackButton to="/">Go Back</BackButton>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Container>
            <ImageWrapper>
            <Zoom>
              <ProductImage src={product.image} alt={product.name} />
            </Zoom>
            </ImageWrapper>
            <Details>
              <List>

                  <h2>{product.name}</h2>

                  <h3 className="text-blue-700 m-0"> ₹{product.price}</h3>
                <div className="">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
                <div className="pb-2">{product.description}</div>
              </List>
              <Card>
                <List>
                  <ListItem>
                  <div className="flex gap-4">
                    <span>Price:</span>
                    <strong>₹{product.price}</strong>
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className="flex gap-4">
                    <span>Availability:</span>
                    <span
                      className={
                        product.countInStock > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </span>
                    </div>
                  </ListItem>

                  <ListItem className="flex gap-4">

                  {product.countInStock > 0 && (
                    <div className="flex">
                      <Label>Qty:</Label>
                      <CounterWrapper>
                        <div
                          onClick={() => qtyHandler(-1)}
                          disabled={qty <= 1}
                        >
                          -
                        </div>
                        <CounterInput>{qty}</CounterInput>
                        <div
                          onClick={() => qtyHandler(1)}
                          disabled={qty >= product.countInStock}
                        >
                          +
                        </div>
                      </CounterWrapper>
                    </div>
                  )}
                    <Button
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Details>
          </Container>
          <ReviewsSection>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <List>
              {product.reviews.map((review) => (
                <ListItem key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListItem>
              ))}
            </List>
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <FormControl
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </FormControl>
                <TextArea
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button type="submit" disabled={loadingProductReview}>
                  Submit
                </Button>
              </form>
            ) : (
              <Message>
                Please <Link to="/login">sign in</Link> to write a review
              </Message>
            )}
          </ReviewsSection>
        </>
      )}
      </Wrapper>
    </>
  );
};

export default ProductScreen;
