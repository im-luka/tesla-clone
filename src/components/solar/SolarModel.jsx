import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { getSolarModel } from "../../api/api";
import Loading from "../loading/Loading";
import "./solar-model.scss";
import { MenuContext } from "../../contexts/menu-context";

const Solar = () => {
  const { setIsDark } = useContext(MenuContext);
  const [solar, setSolar] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      setSolar(await getSolarModel(id));
      setIsLoading(false);
    };
    sendRequest();

    setIsDark(solar.isDark);

    return () => {
      setIsDark(false);
    };
  }, [id, solar.isDark]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && solar.name && <SolarItem solar={solar} />}
    </>
  );
};

const SolarItem = ({ solar }) => {
  const { isMenuShown } = useContext(MenuContext);
  const divRef = useRef();
  const isTablet = useMediaQuery("(max-width: 825px)");
  const imgHero = isTablet ? solar.hero_img_mobile : solar.hero_img_desktop;

  useEffect(() => {
    if (isMenuShown) {
      divRef.current.classList.add("darken");
    } else {
      divRef.current.classList.remove("darken");
    }
  }, [isMenuShown]);

  return (
    <div className="solar" ref={divRef}>
      <div
        className="solar__hero"
        style={{
          backgroundImage: `url(${require("../../assets/solar/" + imgHero)})`,
        }}
      >
        <div
          className="solar__hero__info"
          style={solar.isDark ? { color: "#fff" } : {}}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {solar.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.75 }}
          >
            {solar.description}
          </motion.p>
        </div>

        <div className="solar__hero__specs">
          <SpecsItem title="⚡" label="Convert Sunlight to Energy" delay={0} />
          <SpecsItem
            title="💲"
            label="Guaranteed Lowest Price for Solar"
            delay={0.33}
          />
          <SpecsItem title="🛡️" label="Protection & Monitoring" delay={0.67} />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="solar__hero__specs__item"
          >
            <button className="btn-primary">ORDER NOW</button>
          </motion.div>
        </div>
      </div>

      <div className="solar__section">
        <div
          className="solar__section__cover"
          style={{
            backgroundImage: `url(${require("../../assets/solar/cover-desktop.jpg")})`,
          }}
        ></div>

        <SectionSpecs
          about="Design"
          title={`A Beautiful ${solar.name}`}
          description={`Install Solar Roof and power your home with a fully integrated solar and storage system. With a seamless design, each tile looks great up-close or from the street. Chat with an energy advisor to ask any questions about going solar with Tesla.`}
        />
      </div>

      <div className="solar__about">
        <div className="solar__about__media" style={{ order: 1 }}>
          <img
            src={require(`../../assets/solar/${
              isTablet ? solar.about_img_mobile : solar.about_img_desktop
            }`)}
            alt="about"
          />
        </div>

        <motion.div
          className="solar__about__info"
          initial={{
            y: "20%",
            opacity: 0,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="solar__about__info__text">
            <h3>{solar.about_type}</h3>
            <h2>{solar.about_title}</h2>
            <p>{solar.about_info}</p>
          </div>

          <div className="solar__about__info__btn">
            <button className="btn-secondary">ORDER NOW</button>
          </div>
        </motion.div>
      </div>

      <div className="solar__about">
        <div className="solar__about__media">
          <video autoPlay loop>
            <source
              src={require(`../../assets/solar/${solar.protection_video}`)}
            />
          </video>
        </div>

        <motion.div
          className="solar__about__info"
          initial={{
            y: "20%",
            opacity: 0,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="solar__about__info__text">
            <h3>{solar.protection_type}</h3>
            <h2>{solar.protection_title}</h2>
            <p>{solar.protection_info}</p>
          </div>

          <div className="solar__about__info__btn">
            <button className="btn-secondary">ORDER NOW</button>
          </div>
        </motion.div>
      </div>

      <div className="solar__section">
        <div
          className="solar__section__cover"
          style={{
            backgroundImage: `url(${require("../../assets/solar/battery-desktop.jpg")})`,
          }}
        ></div>

        <SectionSpecs
          about="Powerwall"
          title="Home Battery Backup"
          description="Powerwall is bundled with every Tesla solar purchase, allowing you to store your solar energy for use anytime—at night or during an outage."
        />
      </div>

      <div className="solar__about">
        <div className="solar__about__media" style={{ order: 1 }}>
          <img
            src={require(`../../assets/solar/${
              isTablet ? "efficiency-mobile.jpg" : "efficiency-desktop.jpg"
            }`)}
            alt="about"
          />
        </div>

        <motion.div
          className="solar__about__info"
          initial={{
            y: "20%",
            opacity: 0,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="solar__about__info__text">
            <h3>Efficiency</h3>
            <h2>Maximum Solar Production</h2>
            <p>
              Generate the most energy possible, even on roofs with complicated
              angles and intermittent sunlight. Combined with Tesla Solar
              Inverter, your fully integrated system is safe, reliable and
              outage ready. With built-in connectivity, Tesla Solar Inverter
              will continue to improve with each over-the-air software update.
            </p>
          </div>

          <div className="solar__about__info__btn">
            <button className="btn-secondary">ORDER NOW</button>
          </div>
        </motion.div>
      </div>

      <div className="solar__section">
        <div
          className="solar__section__cover"
          style={{
            backgroundImage: `url(${require(`../../assets/solar/${solar.control_img}`)})`,
          }}
        ></div>

        <SectionSpecs
          about={solar.control_type}
          title={solar.control_title}
          description={solar.control_info}
        />
      </div>

      <div className="solar__about">
        <div className="solar__about__media" style={{ order: 1 }}>
          <img
            src={require(`../../assets/solar/${
              isTablet ? "electricity-mobile.jpg" : "electricity-desktop.jpg"
            }`)}
            alt="about"
          />
        </div>

        <motion.div
          className="solar__about__info"
          initial={{
            y: "20%",
            opacity: 0,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="solar__about__info__text">
            <h3>Value</h3>
            <h2>Pay Less for Electricity</h2>
            <p>
              {solar.name} is the only roof that can help pay for itself with
              the energy you produce. Power your home at the lowest price per
              watt of any national provider and take control of your monthly
              electricity bill.
            </p>
          </div>

          <div className="solar__about__info__btn">
            <button className="btn-secondary">ORDER NOW</button>
          </div>
        </motion.div>
      </div>

      <div className="solar__specs">
        <div className="solar__specs__container">
          <div className="solar__specs__container__img">
            <img
              src={require(`../../assets/solar/${solar.specs_img}`)}
              alt="solar item"
            />
          </div>

          <motion.div
            className="solar__specs__container__specs"
            initial={{
              y: "50%",
              opacity: 0,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="solar__specs__container__specs__title">
              <h2>
                {solar.name} <span>Specs</span>
              </h2>
            </div>

            <div className="solar__specs__container__specs__details">
              <SpecsDetailsItem title="Wattage" specs={solar.wattage} />
              <SpecsDetailsItem
                title="Operating Temperature"
                specs={solar.temperature}
              />
              <SpecsDetailsItem title="Dimensions" specs={solar.dimensions} />
              <SpecsDetailsItem title="Design" specs={solar.design} />
              <SpecsDetailsItem title="Warranty" specs={solar.warranty} />
              <SpecsDetailsItem
                title="Certifications"
                specs={solar.certification}
              />
              <SpecsDetailsItem title="Inverter Power" specs={solar.power} />
              <SpecsDetailsItem title="Fire Rating" specs={solar.fire} />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="solar__footer">
        <div className="solar__footer__container">
          <h2>{solar.footer_title}</h2>
          <p>Order now or talk to a Tesla Advisor if you have any questions</p>
          <div className="solar__footer__container__btns">
            <button className="btn-primary">ORDER NOW</button>
            <br />
            <button className="btn-primary">CHAT WITH ENERGY ADVISOR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecsDetailsItem = ({ title, specs }) => {
  return (
    <div className="solar__specs__container__specs__details__item">
      <p className="heading">{title}</p>
      <p>{specs}</p>
    </div>
  );
};

const SectionSpecs = ({ about, title, description, divStyle }) => {
  return (
    <div className="solar__section__specs" style={divStyle}>
      <motion.div
        className="solar__section__specs__div"
        initial={{
          y: "100%",
          opacity: 0,
        }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="solar__section__specs__div__main">
          <p>{about}</p>
          <h2>{title}</h2>
          <button className="btn-secondary">ORDER NOW</button>
        </div>

        <div className="solar__section__specs__div__secondary">
          <p>{description}</p>
        </div>
      </motion.div>
    </div>
  );
};

const SpecsItem = ({ title, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: delay }}
      className="solar__hero__specs__item"
    >
      <h2>{title}</h2>
      <p>{label}</p>
    </motion.div>
  );
};

export default Solar;
