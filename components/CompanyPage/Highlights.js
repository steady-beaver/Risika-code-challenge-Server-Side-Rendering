import useHighlights from "./useHighlights"
import Feature from "./Feature"
import styles from "../../styles/Company.module.css"

const Highlights = ({ id }) => {
  const [positive, negative, neutral, error] = useHighlights(id)

  return (
    <section>
      <h3>Highlights</h3>
      {error && <div className="error">{error}</div>}
      <div className={styles.frame}>
        {positive && <Feature dataObj={positive} />}
        {negative && <Feature dataObj={negative} />}
        {neutral && <Feature dataObj={neutral} />}
      </div>
    </section>
  )
}

export default Highlights
