import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <Container>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <GoBackButton to="/">Go Back</GoBackButton>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Meta />
          <Title>Latest Products</Title>
          <ProductGrid>
            {data.products.map((product) => (
                <Product product={product} key={product._id}/>
            ))}
          </ProductGrid>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </Container>
  );
};

export default HomeScreen;

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const GoBackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #f8f9fa;
  color: #000;
  text-decoration: none;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:hover {
    background-color: #e9ecef;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
  font-size: 2rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  background: white;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;
