import React, { useContext, useEffect, useRef } from "react";
import { MenuContext } from "../../contexts/menu-context";
import "./shop-details.scss";

const ShopDetails = () => {
  const { isMenuShown } = useContext(MenuContext);
  const divRef = useRef();

  useEffect(() => {
    if (isMenuShown) {
      divRef.current.classList.add("darken");
    } else {
      divRef.current.classList.remove("darken");
    }
  }, [isMenuShown]);

  return (
    <div className="details" ref={divRef}>
      <div className="details__title">
        <h1>Accessories</h1>
      </div>

      <div className="details__subtitle">
        <h2>Best sellers</h2>
      </div>

      <div className="details__products">
        <ShopItem
          imgCover="item-01-main.jpg"
          imgHover="item-01-sec.jpg"
          text="Cyberquad for Kids"
          price="1,900"
        />
        <ShopItem
          imgCover="item-02-main.jpg"
          imgHover="item-02-sec.jpg"
          text="Model X/Y Hitch Rack"
          price="540"
        />
        <ShopItem
          imgCover="item-03-main.jpg"
          imgHover="item-03-sec.jpg"
          text="Model S/3/Y Pet Liner"
          price="145"
        />
        <ShopItem
          imgCover="item-04-main.jpg"
          imgHover="item-04-sec.jpg"
          text="Model S/3 Car Cover"
          price="350"
        />
        <ShopItem
          imgCover="item-05-main.jpg"
          imgHover="item-05-sec.jpg"
          text="Men's Cybertruck Owl Tee"
          price="35"
        />
        <ShopItem
          imgCover="item-06-main.jpg"
          imgHover="item-06-sec.jpg"
          text="Wall Connector Pedestal"
          price="425"
        />
      </div>
    </div>
  );
};

const ShopItem = ({ imgCover, imgHover, text, price }) => {
  return (
    <div className="details__products__item">
      <div className="details__products__item__main">
        <img src={require(`../../assets/shop/${imgCover}`)} alt="shop item" />
        <div className="details__products__item__main__hover">
          <img src={require(`../../assets/shop/${imgHover}`)} alt="shop item" />
          <h2>View Details</h2>
        </div>
      </div>
      <p>{text}</p>
      <p>$ {price}</p>
    </div>
  );
};

export default ShopDetails;
