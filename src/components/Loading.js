import React from "react";
import { FaCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export const Loading = () => {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const loadingContainer = {
    width: "1rem",
    height: "100vh",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "0 auto",
  };

  const loadingCircle = {
    display: "block",
    width: "1rem",
    height: "1rem",
    backgroundColor: "black",
    borderRadius: "0.5rem",
  };

  const loadingCircleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const loadingCircleTransition = {
    duration: 0.4,
    yoyo: Infinity,
    ease: "easeInOut",
  };
  return (
    <motion.div
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
      style={loadingContainer}
    >
      <motion.span
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      >
        <FaCircle />
      </motion.span>
      <motion.span
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      >
        <FaCircle />
      </motion.span>
      <motion.span
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      >
        <FaCircle />
      </motion.span>
      {/* <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      /> */}
    </motion.div>
  );
};
