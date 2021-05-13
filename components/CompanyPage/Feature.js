import Image from "next/image"
import styles from "../../styles/Company.module.css"

const Feature = ({ dataObj }) => {
  return (
    <>
      {dataObj && (
        <div className={styles.feature + " " + styles[dataObj.classification]}>
          <div className={styles.iconFrame}>
            <Image
              src={`/${dataObj.classification}-icon.svg`}
              width={40}
              height={40}
            />
          </div>
          <div className={styles.text}>
            <div className={styles.title}>{dataObj.title}</div>
            <div>{dataObj.message}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default Feature
