// import React from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

let defaultImage;
// no siteVar in react app, this will work

export default function PortfolioCard({
  post_id,
  title,
  categories,
  details,
  permalink,
  technologies,
  image,
  fallback_image,
}) {
  const navigate = useNavigate();
  return (
    <div
      className="hk-card p-3"
      onClick={() => navigate(`single-project/${post_id}`)}
    >
      <div className="image-wrapper mb-4">
        <img
          className="img-fluid"
          src={!image ? fallback_image : image}
          alt=""
        />
      </div>
      <div className="hk-card-content">
        <div className="tags-wrapper mb-3">
          {categories.map((category) => {
            return (
              <button className="btn btn-warning mb-2">
                <a href="#" class="text-secondary">
                  {category.name}
                </a>
              </button>
            );
          })}
        </div>
        <h3 className="hk-card-title">{title}</h3>
        <p className="lead text-secondary">
          {details.length > 100 && `${details.substring(0, 100)} ...More`}
        </p>
      </div>
    </div>
  );
}
