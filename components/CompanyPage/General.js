import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import styles from "../../styles/Company.module.css"

const General = ({ id }) => {
  const [data, setData] = useState({})
  const [error, setError] = useState("")
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getGeneralInfo = async () => {
      try {
        setError("")
        const res = await axios.get(
          `http://localhost:3000/api/company/basics/${id}`,
        )
        const data = await res.data.data
        console.log(data)
        setData({ ...data })
      } catch (err) {
        setError(err.message)
      }
    }

    getGeneralInfo()
  }, [id])

  return (
    <>
      {Object.keys(data).length > 0 && (
        <section className={styles.general}>
          <h3>{data.company_name}</h3>
          {error && <div className="error">{error}</div>}
          <div className={styles.frame}>
            <div className={styles.field}>
              <span>VAT registration </span>
              <span>{data.vat ? "yes" : "no"}</span>
            </div>
            <div className={styles.field}>
              <span>Email </span>
              <span>{data.email.hidden ? "hidden" : data.email.email}</span>
            </div>
            <div className={styles.field}>
              <span>Phone </span>
              <span>
                {data.phone.hidden ? "hidden" : data.phone.phone_number}
              </span>
            </div>
            <div className={styles.field}>
              <span>Score </span>
              <span>{data.score}</span>
            </div>
            <div className={styles.field}>
              <span>Address </span>
              <div className={styles.rows}>
                <span>{`${data.address.number} ${data.address.street}, ${data.address.postdistrict}`}</span>
                <span> {`${data.address.zipcode}, ${data.address.city}`}</span>
                <span>{`${data.address.municipality} ${data.address.country}`}</span>
              </div>
            </div>
            <div className={styles.field}>
              <span>Status </span>
              <span>{data.status}</span>
            </div>
            <div className={styles.field}>
              <span>Type </span>
              <span>{`${data.company_type.long} (${data.company_type.short}) `}</span>
            </div>
            <div className={styles.field}>
              <span>Main industry </span>
              <div className={styles.rows}>
                <div>{`${data.main_industry_code.description}`}</div>
                <div>{`${data.main_industry_code.code}`}</div>
              </div>
            </div>
            <div className={styles.field}>
              <span>Registered capital </span>
              <span>{`${data.registered_capital.value} ${data.registered_capital.currency}`}</span>
            </div>
            <div className={styles.field}>
              <span>Date of incorporation </span>
              <span>{data.date_of_incorporation}</span>
            </div>
            <div className={styles.field}>
              <span>Local organization ID </span>
              <span>{`${data.local_organization_id.id} ${data.local_organization_id.country}`}</span>
            </div>
            <div className={styles.field}>
              <span>Company secondary names:</span>
              <div className={styles.rows}>
                {data.company_secondary_names ? (
                  data.company_secondary_names.map((record, i) => (
                    <div key={i}>
                      <div>{record.name}</div>
                      <div>
                        {record.valid_from} / {record.valid_to}
                      </div>
                    </div>
                  ))
                ) : (
                  <span>None</span>
                )}
              </div>
            </div>
            <div className={styles.field}>
              <span>Risk assessment </span>
              <span>{data.risk_assessment}</span>
            </div>
          </div>
          <Link href="/">
            <button className={styles.backBtn}>Back</button>
          </Link>
        </section>
      )}
    </>
  )
}

export default General
