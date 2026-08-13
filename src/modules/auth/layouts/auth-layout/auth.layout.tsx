import { Outlet } from "@tanstack/react-router";
import styles from "./styles.module.css";
import { Logo } from "@/core/components/logo/logo";

export const AuthLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftContainer}>
          <div className={styles.logoContainer}>
            <Logo />
            <span>4.0</span>
          </div>
          <Outlet />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>
          Revolutionizing the way we build
          <span className={styles.decoration}></span>
        </h1>
      </div>
    </div>
  );
};
