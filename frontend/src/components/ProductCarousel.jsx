import { Link } from 'react-router-dom';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';


import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";


const ProductCarousel = ({ autoplay = true }) => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + products.length) % products.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (

   <div className='bg-white p-4 rounded-xl my-4'>


  <div
    className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-8 ">
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
      <div>
        <div className="relative h-80 w-full">
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product.image}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index)
                    ? 999
                    : products.length + 2 - index,
                  y: isActive(index) ? [0, -80, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom">
                        <Link to={`/product/${product._id}`}>
                <img src={product.image} width='500' height="500" alt={product.name} className="h-full w-full rounded-3xl object-cover object-center absolute" />
                  </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex justify-between flex-col py-4">
        <motion.div
          key={active}
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -20,
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}>
          <h3 className="text-2xl font-bold dark:text-white text-black">
            {products[active].name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            {products[active].designation}
          </p>
          <motion.p className="text-lg text-gray-900 mt-8 ">
            {products[active].description.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{
                  filter: "blur(10px)",
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  filter: "blur(0px)",
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: 0.02 * index,
                }}
                className="inline-block">
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.p>
        </motion.div>
        <div className="flex gap-4 pt-12 md:pt-0">
          <button
            onClick={handlePrev}
            className="h-7 w-7 rounded-full :bg-neutral-800 flex items-center justify-center group/button">
            <IconArrowLeft
              className="h-5 w-5 text-black  group-hover/button:rotate-12 transition-transform duration-300" />
          </button>
          <button
            onClick={handleNext}
            className="h-7 w-7 rounded-full bg-neutral-200 flex items-center justify-center group/button">
            <IconArrowRight
              className="h-5 w-5 text-black  group-hover/button:-rotate-12 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  </div>
  </div> 
)
};

export default ProductCarousel;
