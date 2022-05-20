import React, { useEffect, useState } from "react";
import PortfolioCard from "./PortfolioCard";
import CategoryList from "../CategoryList/CategoryList";
import axios from "axios";
import { useAppContext } from "../../AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { Loading } from "../Loading";

function PortfolioList() {
  const url = "http://hkportfolio.local/wp-json/api/projects";
  const [isLoading, setIsLoading] = useState(true);
  const { fetchData, currentCatId } = useAppContext();
  const [portfolios, setPortfolios] = useState([]);

  // const fetchPortfolios = async () => {
  //   const data = await fetchData(
  //     `http://hkportfolio.local/wp-json/api/projects/?cat_id=${currentCatId}`
  //   );

  //   setPortfolios(data);
  // };

  useEffect(() => {
    setIsLoading(true);
    console.log(currentCatId);
    const getPortfolios = async () => {
      if (currentCatId !== 0) {
        console.log("executing....");
        const data = await fetchData(
          `http://hkportfolio.local/wp-json/api/projects/?cat_id=${currentCatId}`
        );
        setPortfolios([...data]);
        console.log(portfolios);
      } else {
        // get all projects
        const data = await fetchData(
          `http://hkportfolio.local/wp-json/api/projects`
        );
        setPortfolios([...data]);
      }
    };

    setIsLoading(false);
    getPortfolios();
  }, [currentCatId]);

  console.log("redering portfolios");

  if (isLoading) {
    return (
      <section id="portfolio">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-6 mx-auto">
              <h1 class="text-center">Our Portfolios</h1>
            </div>
          </div>
          <CategoryList />
          <div className="row">
            <Loading></Loading>
          </div>
        </div>
      </section>
    );
  } else if (!portfolios.length > 0) {
    <section id="portfolio">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-6 mx-auto">
            <h1 class="text-center">Our Portfolios</h1>
          </div>
        </div>
        <CategoryList />
        <div className="row">
          <h1 className="text-center">No projects found!</h1>
        </div>
      </div>
    </section>;
  }
  return (
    <section id="portfolio">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-6 mx-auto">
            <h1 class="text-center">Our Portfolios</h1>
          </div>
        </div>
        <CategoryList />

        <div className="row">
          <AnimatePresence initial={false}>
            {portfolios.map((portfolio, index) => {
              return (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="col-md-4 col-sm-6 col-xs-12 mb-3"
                  key={index}
                >
                  <PortfolioCard {...portfolio} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default PortfolioList;
