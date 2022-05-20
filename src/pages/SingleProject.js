import React, { useState } from "react";
import { FaGlobe, FaAward, FaLaptop } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { useEffect } from "react";
import { Loading } from "../components/Loading";
import { Link } from "react-router-dom";

export const SingleProject = () => {
  const { postId } = useParams();
  const { fetchData } = useAppContext();
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getSingleProject = async () => {
      const data = await fetchData(
        `http://hkportfolio.local/wp-json/api/projects/?post_id=${postId}`
      );
      setProject(data[0]);
      console.log(project);
      setIsLoading(false);
    };

    getSingleProject();
  }, []);

  useEffect(() => {
    console.log(project);
  }, [isLoading == false]);

  return (
    <div className="container">
      {/* BreadCrumbs  */}
      <div className="row">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb px-4">
            <li className="breadcrumb-item">
              {/* <a href="/">Home</a> */}
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Project Detail
            </li>
          </ol>
        </nav>
      </div>

      {/* Content  */}
      <div className="row">
        {isLoading && (
          <div className="col-sm-6 mx-auto">
            <Loading />
          </div>
        )}
        {!isLoading && (
          <>
            <div className="col-sm-6 col-xs-12">
              <div className="cover-image p-4" style={{ marginTop: "20px" }}>
                <img src={project.full_image} className="img-fluid" />
              </div>
            </div>
            <div className="col-sm-6 col-xs-12 project-details p-4">
              <div className="project-title">
                <div className="icon">
                  <FaGlobe />
                </div>
                <h3>Project Title</h3>
                <p className="lead text-gray">{project.title}</p>
              </div>
              <div className="used-technologies">
                <div className="icon">
                  <FaAward />
                </div>
                <h3>Used Technologies</h3>
                <p className="lead text-gray">
                  {project.technologies.map((item, index) => {
                    return index == project.technologies.length - 1
                      ? `${item.label}`
                      : `${item.label},  `;
                  })}
                </p>
              </div>
              <div className="project-detail">
                <div className="icon">
                  <FaLaptop />
                </div>
                <h3>Project Detail</h3>
                <p className="lead text-gray">{project.details}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
