import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import Loader from './Loader';
import { listTopProducts } from '../actions/productActions';

const ProductCarousal = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Carousel pause='hover' className='bg-dark' indicators={true}>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/products/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className='carousel-caption'>
                <h2>
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ProductCarousal;
