import useHighlights from "./useHighlights"
import Feature from "./Feature"
import styles from "../../styles/Company.module.css"

const Highlights = ({ highlightsData }) => {
  const [positive, negative, neutral] = useHighlights(highlightsData)

  return (
    <section>
      <h3>Highlights</h3>
      <div className={styles.frame}>
        {positive && <Feature dataObj={positive} />}
        {negative && <Feature dataObj={negative} />}
        {neutral && <Feature dataObj={neutral} />}
      </div>
    </section>
  )
}

export default Highlights
