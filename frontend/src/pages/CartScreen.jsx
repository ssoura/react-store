import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Container>
      <CartSection>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ItemList>
            {cartItems.map((item) => (
              <Item key={item._id}>
                <ImageWrapper>
                  <img src={item.image} alt={item.name} />
                </ImageWrapper>
                <ItemDetails>
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                  <Price>${item.price}</Price>
                </ItemDetails>
                <QuantitySelect
                  value={item.qty}
                  onChange={(e) =>
                    addToCartHandler(item, Number(e.target.value))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </QuantitySelect>
                <DeleteButton onClick={() => removeFromCartHandler(item._id)}>
                  <FaTrash />
                </DeleteButton>
              </Item>
            ))}
          </ItemList>
        )}
      </CartSection>
      <Summary>
        <SummaryCard>
          <h2>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
          </h2>
          <Total>
            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
          </Total>
          <CheckoutButton
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </CheckoutButton>
        </SummaryCard>
      </Summary>
    </Container>
  );
};

export default CartScreen;

// Styled Components
const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;
`;

const CartSection = styled.div`
  flex: 2;
  h1 {
    margin-bottom: 20px;
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;

const ImageWrapper = styled.div`
  flex: 1;
  img {
    width: 100px;
    height: auto;
    border-radius: 5px;
  }
`;

const ItemDetails = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 5px;
  a {
    text-decoration: none;
    color: #007bff;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Price = styled.div`
  font-size: 1.1rem;
  color: #333;
`;

const QuantitySelect = styled.select`
  flex: 1;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Summary = styled.div`
  flex: 1;
`;

const SummaryCard = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
`;

const Total = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px 0;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;
