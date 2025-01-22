import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <CardImage src={product.image} alt={product.name} />
      </Link>

      <CardBody>
        <Link to={`/product/${product._id}`}>
          <CardTitle>{product.name}</CardTitle>
        </Link>

        <CardText>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </CardText>

        <PriceText>₹{product.price}</PriceText>
      </CardBody>
    </Card>
  );
};


const Card = styled.div`
  margin: 1rem 0.5rem;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
    transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1rem;
  object-fit: cover;
`;

const CardTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
  &:hover {
    text-decoration: underline;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CardText = styled.div`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #666;
`;

const PriceText = styled.h3`
  color: #333;
  margin-top: 1rem;
`;

export default Product;
