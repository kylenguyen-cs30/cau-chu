import React from "react";
import styles from "./page.module.css";

interface Props {
  children?: React.ReactNode;
  onClick: React.ReactEventHandler;
}

const Button = ({ onClick, children }: Props) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
