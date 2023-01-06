import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./products.scss";
import { getHomeData } from "../../api/api";
import Loading from "../loading/Loading";
import { MenuContext } from "../../contexts/menu-context";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      setProducts(await getHomeData());
      setIsLoading(false);
    };

    sendRequest();
  }, []);

  return (
    <>
      {(isLoading || products.length === 0) && <Loading />}
      {!isLoading && products.length > 0 && (
        <ProductsContainer products={products} />
      )}
    </>
  );
};

const ProductsContainer = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <ProductsContainerItem key={product.id} product={product} />
      ))}
    </>
  );
};

const ProductsContainerItem = ({ product }) => {
  const { isMenuShown } = useContext(MenuContext);
  const divRef = useRef();
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const img = isTablet ? product.img_mobile : product.img_desktop;

  useEffect(() => {
    if (isMenuShown) {
      divRef.current.classList.add("darken");
    } else {
      divRef.current.classList.remove("darken");
    }
  }, [isMenuShown]);

  return (
    <div
      id={product.id}
      ref={divRef}
      className="products"
      style={{
        backgroundImage: `url(${require("../../assets/home/" + img)})`,
      }}
    >
      <div className="products__info">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {product.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.75 }}
        >
          {product.description}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.75 }}
        className="products__actions"
      >
        <button className="btn-primary">Custom order</button>
        <button className="btn-secondary">See more info</button>
      </motion.div>
    </div>
  );
};

export default Products;
