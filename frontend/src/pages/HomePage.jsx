import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { productList } from "../store";

const HomePage = () => {
  const { keyword, pageNumber: pn } = useParams;
  const pageNumber = pn || 1;

  const dispatch = useDispatch();

  const product = useSelector((state) => state.product);
  const { loading, error, products, page, pages } = product;

  useEffect(() => {
    dispatch(productList({ keyword, pageNumber }));
  }, [dispatch, keyword, pageNumber]);
  // console.log(products);
  // return (
  //   <>
  //     <h1>Latest Products</h1>
  //     {loading ? <Loader /> : error ? { error } : <></>}
  //   </>
  // );

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
