import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

// Styled components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const LeftSection = styled.div`
  flex: 2;
`;

const RightSection = styled.div`
  flex: 1;
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListItem = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SectionHeading = styled.h2`
  margin-bottom: 1rem;
`;

const Text = styled.p`
  margin: 0.5rem 0;
`;

const SummaryCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StyledButton = styled.button`
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 50px;
  border-radius: 5px;
`;

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err.data?.message || err.message);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Container>
        <LeftSection>
          <StyledList>
            <ListItem>
              <SectionHeading>Shipping</SectionHeading>
              <Text>
                <strong>Address:</strong> {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </Text>
            </ListItem>
            <ListItem>
              <SectionHeading>Payment Method</SectionHeading>
              <Text>
                <strong>Method:</strong> {cart.paymentMethod}
              </Text>
            </ListItem>
            <ListItem>
              <SectionHeading>Order Items</SectionHeading>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <StyledList>
                  {cart.cartItems.map((item, index) => (
                    <ListItem key={index}>
                      <Container>
                        <StyledImage src={item.image} alt={item.name} />
                        <div>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <Text>
                            {item.qty} x ${item.price} = $
                            {((item.qty * item.price * 100) / 100).toFixed(2)}
                          </Text>
                        </div>
                      </Container>
                    </ListItem>
                  ))}
                </StyledList>
              )}
            </ListItem>
          </StyledList>
        </LeftSection>
        <RightSection>
          <SummaryCard>
            <SectionHeading>Order Summary</SectionHeading>
            <StyledList>
              <SummaryRow>
                <span>Items</span>
                <span>${cart.itemsPrice.toFixed(2)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Shipping</span>
                <span>${cart.shippingPrice.toFixed(2)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Tax</span>
                <span>${cart.taxPrice.toFixed(2)}</span>
              </SummaryRow>
              <SummaryRow>
                <strong>Total</strong>
                <strong>${cart.totalPrice.toFixed(2)}</strong>
              </SummaryRow>
              {error && (
                <Message variant="danger">{error.data.message}</Message>
              )}
              <StyledButton
                type="button"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </StyledButton>
              {isLoading && <Loader />}
            </StyledList>
          </SummaryCard>
        </RightSection>
      </Container>
    </>
  );
};

export default PlaceOrderScreen;
