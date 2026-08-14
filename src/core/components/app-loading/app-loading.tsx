import { Spinner } from "@/core/components/spinner/spinner";
import { Logo } from "@/core/components/logo/logo";

import styles from "./styles.module.css";

export const AppLoading = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.background}>
        <div className={styles.left}>
          <div className={styles.leftContainer}>
            <div className={styles.logoContainer}>
              <Logo />
              <span>4.0</span>
            </div>

            <div className={styles.formSkeleton}>
              <div className={styles.titleSkeleton}>
                <span />
                <span />
              </div>

              <div className={styles.fields}>
                <div className={styles.field}>
                  <span className={styles.labelSkeleton} />
                  <span className={styles.inputSkeleton} />
                </div>

                <div className={styles.field}>
                  <span className={styles.labelSkeleton} />
                  <span className={styles.inputSkeleton} />
                </div>

                <div className={styles.field}>
                  <span className={styles.labelSkeleton} />
                  <span className={styles.inputSkeleton} />
                </div>

                <div className={styles.field}>
                  <span className={styles.labelSkeleton} />
                  <span className={styles.inputSkeleton} />
                </div>
              </div>

              <span className={styles.buttonSkeleton} />

              <div className={styles.navigationSkeleton}>
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <h1 className={styles.title}>
            Revolutionizing the way we build
            <span className={styles.decoration}></span>
          </h1>
        </div>
      </div>

      <div className={styles.loader}>
        <Spinner size="large" />

        <div className={styles.content}>
          <span className={styles.loaderTitle}>Loading</span>
          <span className={styles.description}>Preparing your workspace...</span>
        </div>
      </div>
    </div>
  );
};
