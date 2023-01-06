import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import SwiperCore, {
  Autoplay,
  Navigation,
  Scrollbar,
  Pagination,
  EffectFade,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./shop-main.scss";
import cover01desktop from "../../assets/shop/cover-desktop-01.jpg";
import cover02desktop from "../../assets/shop/cover-desktop-02.jpg";
import cover03desktop from "../../assets/shop/cover-desktop-03.jpg";
import cover01mobile from "../../assets/shop/cover-mobile-01.jpg";
import cover02mobile from "../../assets/shop/cover-mobile-02.jpg";
import cover03mobile from "../../assets/shop/cover-mobile-03.jpg";
import { MenuContext } from "../../contexts/menu-context";
import { useMediaQuery } from "@mui/material";

const ShopMain = () => {
  const { isMenuShown, setIsDark } = useContext(MenuContext);
  const divRef = useRef();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  SwiperCore.use([Autoplay]);

  useEffect(() => {
    if (isMenuShown) {
      divRef.current.classList.add("darken");
    } else {
      divRef.current.classList.remove("darken");
    }
  }, [isMenuShown]);

  useEffect(() => {
    setIsDark(true);

    const scrollHandler = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        setIsDark(false);
      } else {
        setIsDark(true);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      setIsDark(false);
    };
  }, []);

  return (
    <div className="shop" ref={divRef}>
      <div className="shop__hero">
        <Swiper
          modules={[Autoplay, Scrollbar, EffectFade]}
          effect={"fade"}
          scrollbar={{ hide: true }}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
        >
          <SwiperSlide>
            <div className="shop__hero__item">
              <img
                src={isMobile ? cover01mobile : cover01desktop}
                alt="tesla"
              />
              <div className="shop__hero__item__first">
                <p>WALL CONNECTOR</p>
                <h3>The fastest way to charge at home</h3>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="shop__hero__item">
              <img
                src={isMobile ? cover02mobile : cover02desktop}
                alt="tesla"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="shop__hero__item">
              <img
                src={isMobile ? cover03mobile : cover03desktop}
                alt="tesla"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="shop__title">
        <h3>BEST SELLERS</h3>
        <p>Shop All</p>
      </div>

      <div className="shop__products">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
          slidesPerGroup={isMobile ? 1 : isTablet ? 2 : 3}
          navigation={true}
          loop={true}
        >
          <SwiperSlide>
            <SliderItem
              img="slider-01.jpg"
              title="Wireless Portable Charger 2.0"
            />
          </SwiperSlide>
          <SwiperSlide>
            <SliderItem
              img="slider-02.jpg"
              title="Men's Raven Lightweight Bomber Jacket"
            />
          </SwiperSlide>
          <SwiperSlide>
            <SliderItem img="slider-03.png" title="Tesla Shop Gift Card" />
          </SwiperSlide>
          <SwiperSlide>
            <SliderItem
              img="slider-04.jpg"
              title="Men's Chill Crew Neck Sweatshirt"
            />
          </SwiperSlide>
          <SwiperSlide>
            <SliderItem
              img="slider-05.jpg"
              title="Model Y All-Weather Interior Liners"
            />
          </SwiperSlide>
          <SwiperSlide>
            <SliderItem
              img="slider-06.jpg"
              title="Model S Roof Rack - Glass Roof"
            />
          </SwiperSlide>
          <SwiperSlide>
            <SliderItem
              img="slider-07.jpg"
              title="Model 3 Illuminated Door Sills"
            />
          </SwiperSlide>
          <SwiperSlide>
            <SliderItem img="slider-08.jpg" title="Wall Connector" />
          </SwiperSlide>
        </Swiper>
      </div>

      <LongItem
        img={isMobile ? "models-mobile.jpg" : "models-desktop.jpg"}
        text="Model S Accessories"
      />

      <div className="shop__short">
        <ShortItem
          img={isMobile ? "model3-mobile.jpg" : "model3-desktop.jpg"}
          text="Model 3 Accessories"
        />

        <ShortItem
          img={isMobile ? "modelx-mobile.jpg" : "modelx-desktop.jpg"}
          text="Model X Accessories"
        />
      </div>

      <LongItem
        img={isMobile ? "modely-mobile.jpg" : "modely-desktop.jpg"}
        text="Model Y Accessories"
        order={1}
      />

      <div className="shop__short">
        <ShortItem
          img={isMobile ? "men-mobile.jpg" : "men-desktop.jpg"}
          text="Men's Apparel"
        />

        <ShortItem
          img={isMobile ? "women-mobile.jpg" : "women-desktop.jpg"}
          text="Women's Apparel"
          color="black"
        />
      </div>

      <LongItem
        img={isMobile ? "lifestyle-mobile.jpg" : "lifestyle-desktop.jpg"}
        text="Lifestyle"
        order={1}
      />
    </div>
  );
};

const SliderItem = ({ img, title }) => {
  return (
    <Link to="/shop/details">
      <div className="shop__products__item">
        <img src={require(`../../assets/shop/${img}`)} alt="slider img" />
        <h3>{title}</h3>
      </div>
    </Link>
  );
};

const LongItem = ({ img, text, order }) => {
  return (
    <Link to="/shop/details">
      <div
        className="shop__long"
        style={{
          backgroundImage: `url(${require(`../../assets/shop/${img}`)})`,
        }}
      >
        <div className="shop__long__fill" style={{ order: order }} />

        <div className="shop__long__info">
          <h3>{text}</h3>
        </div>
      </div>
    </Link>
  );
};

const ShortItem = ({ img, text, color }) => {
  return (
    <div
      className="shop__short__item"
      style={{
        backgroundImage: `url(${require(`../../assets/shop/${img}`)})`,
      }}
    >
      <Link to="/shop/details">
        <h3 style={{ color: color }}>{text}</h3>
      </Link>
    </div>
  );
};

export default ShopMain;
