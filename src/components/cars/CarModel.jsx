import React, { useContext, useEffect, useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import "./car-model.scss";
import Loading from "../loading/Loading";
import powetrainDesktop from "../../assets/cars/powertrain-desktop.jpg";
import powetrainMobile from "../../assets/cars/powertrain-mobile.jpg";
import anywhereVideo from "../../assets/cars/anywhere-video.mp4";
import safetyCar from "../../assets/cars/safety.JPG";
import autopilotVideo from "../../assets/cars/autopilot.mp4";
import autolaneVideo from "../../assets/cars/autolane.mp4";
import autosummonVideo from "../../assets/cars/autosummon.mp4";
import autoparkVideo from "../../assets/cars/autopark.mp4";
import interiorCover from "../../assets/cars/interior-cover.jpg";
import { ModelContext } from "../../contexts/model-context";
import { MenuContext } from "../../contexts/menu-context";

const autoSliders = [
  {
    id: 0,
    title: "Navigate on Autopilot",
    desc: "Active guidance from on-ramp to off-ramp",
    video: autopilotVideo,
  },
  {
    id: 1,
    title: "Auto Lane Change",
    desc: "Automatically change lanes while driving on the highway",
    video: autolaneVideo,
  },
  {
    id: 2,
    title: "Summon",
    desc: "Automatically retrieve your car",
    video: autosummonVideo,
  },
  {
    id: 3,
    title: "Autopark",
    desc: "Parallel and perpendicular parking with a single touch",
    video: autoparkVideo,
  },
];

const CarModel = () => {
  const { id } = useParams();
  const { model, isLoading, getModel } = useContext(ModelContext);
  const { setIsDark } = useContext(MenuContext);

  useEffect(() => {
    getModel(id);
    setIsDark(model.isDark);
    window.scrollTo({ left: 0, top: 0 });

    return () => {
      setIsDark(false);
    };
  }, [id, model.isDark]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && model.name && <CarModelItem model={model} />}
    </>
  );
};

const CarModelItem = ({ model }) => {
  const { isMenuShown } = useContext(MenuContext);
  const divRef = useRef();
  const autoVideoRef = useRef();
  const [autoVideoActive, setAutoVideoActive] = useState(0);
  const isTablet = useMediaQuery("(max-width: 825px)");
  const imgHero = isTablet ? model.img_hero_mobile : model.img_hero_desktop;
  const [autopilot, setAutopilot] = useState(autopilotVideo);

  useEffect(() => {
    if (isMenuShown) {
      divRef.current.classList.add("darken");
    } else {
      divRef.current.classList.remove("darken");
    }
  }, [isMenuShown]);

  return (
    <div className="model" ref={divRef}>
      <div
        className="model__hero"
        style={{
          backgroundImage: `url(${require("../../assets/cars/" + imgHero)})`,
        }}
      >
        <div
          className="model__hero__info"
          style={model.isDark ? { color: "#fff" } : {}}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {model.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.75 }}
          >
            {model.about}
          </motion.p>
        </div>

        <div className="model__hero__specs">
          <SpecsItem title={model.range} label="Range (EPA est.)" delay={0} />
          <SpecsItem title={model.mph60} label="0-60 mph*" delay={0.25} />
          <SpecsItem title={model.top_speed} label="Top Speed+" delay={0.5} />
          <SpecsItem title={model.peak_power} label="Peak Power" delay={0.75} />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="model__hero__specs__item"
          >
            <button className="btn-primary">ORDER NOW</button>
          </motion.div>
        </div>
      </div>

      <div className="model__label">
        <motion.h2
          initial={{
            y: "100%",
            opacity: 0,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          Interior of the Future
        </motion.h2>
        <img src={interiorCover} alt="interior cover" />
      </div>

      <div className="model__interior">
        <InteriorItem
          img={model.interior_img_01}
          title={model.interior_title_01}
          description={model.interior_description_01}
          order={0}
        />
        <InteriorItem
          img={model.interior_img_02}
          title={model.interior_title_02}
          description={model.interior_description_02}
          order={isTablet ? 0 : 1}
        />
        <InteriorItem
          img={model.interior_img_03}
          title={model.interior_title_03}
          description={model.interior_description_03}
          order={0}
        />
      </div>

      <div className="model__section">
        <SectionCover
          img={isTablet ? model.section_img_mobile : model.section_img_desktop}
        >
          <SpecsItem title={model.peak_power} label="Peak Power" delay={0.25} />
          <SpecsItem title={model.weight} label="Weight" delay={0.5} />
          <SpecsItem title={model.mph60} label="0-60 mph*" delay={0.75} />
        </SectionCover>

        <SectionSpecs
          about={model.about}
          title={model.section_title}
          description={model.section_description}
        />
      </div>

      <div className="model__powertrain">
        <div className="model__powertrain__container">
          <motion.div
            className="model__powertrain__container__info"
            initial={{
              y: "100%",
              opacity: 0,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2>Electric Powertrain</h2>
            <p>
              Model S platforms unite powertrain and battery technologies for
              unrivaled performance, range and efficiency. New module and pack
              thermal architecture allows faster charging and gives you more
              power and endurance in all conditions.
            </p>
          </motion.div>

          <div className="model__powertrain__container__image">
            <img
              src={isTablet ? powetrainMobile : powetrainDesktop}
              alt="powetrain"
            />
          </div>

          <div className="model__powertrain__container__price">
            <h3>{model.name}</h3>
            <p>
              Dual Motor All-Wheel Drive unlocks more range than any other
              vehicle in our current lineup, with insane power and maximum
              control.
            </p>
            <div className="model__powertrain__container__price__specs">
              <SpecsItem title={model.mph60} label="0-60 mph" delay={0.25} />
              <SpecsItem
                title={model.range}
                label="Range (EPA est.)"
                delay={0.25}
              />
              <SpecsItem
                title={model.peak_power}
                label="Peak Power"
                delay={0.25}
              />
            </div>
          </div>

          <motion.div
            className="model__powertrain__container__quote"
            initial={{
              y: "100%",
              opacity: 0,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            * With rollout subtracted
          </motion.div>
        </div>
      </div>

      <div className="model__exterior">
        <SectionCover
          img={
            isTablet ? model.img_exterior_mobile : model.img_exterior_desktop
          }
        >
          <SpecsItem title={model.powertrain} label="Powertrain" delay={0.25} />
          <SpecsItem
            title={model.wheels}
            label="Wheels Compatibility"
            delay={0.5}
          />
          <SpecsItem title={model.cargo} label="Loading Cargo" delay={0.75} />
        </SectionCover>

        <SectionSpecs
          about="Exterior"
          title="Designed for Efficiency"
          description={model.about_exterior}
          divStyle={{ backgroundColor: "#000", color: "#fff" }}
        />
      </div>

      <div className="model__interior" style={{ fontSize: ".8rem" }}>
        <InteriorItem
          img={model.exterior_img_01}
          title={model.exterior_title_01}
          description={model.exterior_description_01}
          order={1}
        />
        <InteriorItem
          img={model.exterior_img_02}
          title={model.exterior_title_02}
          description={model.exterior_description_02}
          order={isTablet ? 1 : 0}
        />
        <InteriorItem
          img={model.exterior_img_03}
          title={model.exterior_title_03}
          description={model.exterior_description_03}
          order={1}
        />
      </div>

      <div className="model__anywhere">
        <div className="model__anywhere__video">
          <video autoPlay loop>
            <source src={anywhereVideo} />
          </video>
          <div className="model__anywhere__video__specs">
            <SpecsItem
              title="405 mi"
              label="Go anywhere with up to 405 miles of estimated range on a single charge"
              delay={0.25}
            />
            <SpecsItem
              title="15 min"
              label="Recharge up to 200 miles in 15 minutes at Supercharger locations"
              delay={0.25}
            />
            <SpecsItem
              title="30,000 +"
              label="Superchargers placed along popular routes"
              delay={0.25}
            />
          </div>
        </div>

        <motion.div
          className="model__anywhere__info"
          initial={{
            y: "20%",
            opacity: 0,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="model__anywhere__info__text">
            <h3>Range</h3>
            <h2>Go Anywhere</h2>
            <p>
              Travel farther on a single charge than any other electric
              vehicle—and keep going with access to 30,000+ Superchargers
              globally. By combining up to 405 miles of estimated range with
              Tesla fast charging technology, you’ll spend less time charging
              and even more time on the road.
            </p>
          </div>

          <div className="model__anywhere__info__btn">
            <button className="btn-secondary">ORDER NOW</button>
          </div>
        </motion.div>
      </div>

      <div className="model__anywhere">
        <div
          className="model__anywhere__video"
          style={{ order: isTablet ? 0 : 1, paddingLeft: "5rem" }}
        >
          <motion.img
            src={safetyCar}
            alt="safety car"
            initial={{
              x: "-10%",
              opacity: 0,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
          />
        </div>

        <motion.div
          className="model__anywhere__info"
          style={{ width: isTablet ? "100%" : "40%" }}
          initial={{
            y: "20%",
            opacity: 0,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="model__anywhere__info__text">
            <h3>Safety</h3>
            <h2>High Impact Protection</h2>
            <p>
              {model.name} is built from the ground up as an electric vehicle,
              with a high-strength architecture and floor-mounted battery pack
              for incredible occupant protection and low rollover risk. Every
              new {model.name} includes Tesla’s latest active safety features.
            </p>
          </div>

          <div className="model__anywhere__info__btn">
            <button className="btn-secondary">ORDER NOW</button>
          </div>
        </motion.div>
      </div>

      <div className="model__autopilot">
        <div className="model__autopilot__video">
          <motion.video
            key={autopilot}
            autoPlay
            loop
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <source src={autopilot} />
          </motion.video>

          <div className="model__autopilot__video__container">
            {autoSliders.map((elem) => (
              <div
                key={elem.id}
                ref={autoVideoRef}
                className={`model__autopilot__video__container__item ${
                  autoVideoActive === elem.id ? "active" : ""
                }`}
                onClick={() => {
                  setAutoVideoActive(elem.id);
                  setAutopilot(elem.video);
                }}
              >
                <h3>{elem.title}</h3>
                <p>{elem.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <SectionSpecs
          about="Autopilot"
          title="Future of Driving"
          description="Autopilot enables your car to steer, accelerate and brake automatically within its lane under your active supervision, assisting with the most burdensome parts of driving. With over-the-air software updates, the latest enhancements are available instantly."
        />
      </div>

      <div className="model__specs">
        <div className="model__specs__container">
          <div className="model__specs__container__img">
            <img
              src={require(`../../assets/cars/${
                isTablet ? model.specs_img_mobile : model.specs_img_desktop
              }`)}
              alt="model front view"
            />
          </div>

          <motion.div
            className="model__specs__container__specs"
            initial={{
              y: "50%",
              opacity: 0,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="model__specs__container__specs__title">
              <h2>
                {model.name} <span>Specs</span>
              </h2>
            </div>

            <div className="model__specs__container__specs__details">
              <SpecsDeatilsItem title="Range (EPA est.)" specs={model.range} />
              <SpecsDeatilsItem title="Mode" specs={model.about} />
              <SpecsDeatilsItem
                title="Acceleration"
                specs={`${model.mph60} mph*`}
              />
              <SpecsDeatilsItem
                title="Top Speed"
                specs={`${model.top_speed}+`}
              />
              <SpecsDeatilsItem title="Peak Power" specs={model.peak_power} />
              <SpecsDeatilsItem title="Wheels" specs={model.wheels} />
              <SpecsDeatilsItem title="Cargo" specs={model.cargo} />
              <SpecsDeatilsItem title="Powertrain" specs={model.powertrain} />
              <SpecsDeatilsItem title="Weight" specs={model.weight} />
              <SpecsDeatilsItem
                title="Supercharging Max"
                specs={model.supercharging}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="model__footer"
        style={model.isDark ? { background: "#000", color: "#fff" } : {}}
      >
        <div className="model__footer__info">
          <div className="model__footer__info__title">
            <h2>{model.name}</h2>
          </div>

          <motion.div
            className="model__footer__info__btns"
            initial={{
              y: "50%",
              opacity: 0,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <button className={`btn-secondary ${model.isDark ? "dark" : ""}`}>
              ORDER NOW
            </button>
            <button className={`btn-secondary ${model.isDark ? "dark" : ""}`}>
              COMPARE
            </button>
          </motion.div>
        </div>

        <div className="model__footer__img">
          <img
            src={require(`../../assets/cars/${model.footer_img}`)}
            alt="model"
          />
        </div>
      </div>
    </div>
  );
};

const SpecsDeatilsItem = ({ title, specs }) => {
  return (
    <div className="model__specs__container__specs__details__item">
      <p className="heading">{title}</p>
      <p>{specs}</p>
    </div>
  );
};

const SectionCover = ({ children, img }) => {
  return (
    <div
      className="model__section__cover"
      style={{
        backgroundImage: `url(${require("../../assets/cars/" + img)})`,
      }}
    >
      {children}
    </div>
  );
};

const SectionSpecs = ({ about, title, description, divStyle }) => {
  return (
    <div className="model__section__specs" style={divStyle}>
      <motion.div
        className="model__section__specs__div"
        initial={{
          y: "100%",
          opacity: 0,
        }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="model__section__specs__div__main">
          <p>{about}</p>
          <h2>{title}</h2>
          <button className="btn-secondary">ORDER NOW</button>
        </div>

        <div className="model__section__specs__div__secondary">
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
      className="model__hero__specs__item"
    >
      <h2>{title}</h2>
      <p>{label}</p>
    </motion.div>
  );
};

const InteriorItem = ({ img, title, description, order }) => {
  return (
    <motion.div
      className="model__interior__item"
      initial={{
        y: "20%",
        opacity: 0,
      }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.5 }}
    >
      <div className="model__interior__item__img" style={{ order: order }}>
        <img src={require("../../assets/cars/" + img)} alt="interior" />
      </div>
      <div className="model__interior__item__info">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

export default CarModel;
