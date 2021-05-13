import * as React from "react"
import { useRouter } from "next/router"
import Management from "@/components/Management"
import { companyRelations } from "@/requests"
import General from "@/components/CompanyPage/General"
import Highlights from "@/components/CompanyPage/Highlights"
import styles from "../../styles/Company.module.css"

export default function Company() {
  const router = useRouter()
  const { id } = router.query

  const [relations, setRelations] = React.useState(null)

  React.useEffect(() => {
    if (id != null) {
      companyRelations({ id }).then((res) => {
        setRelations(res)
      })
    }
  }, [id])

  return (
    <div className={styles.company}>
      <General id={id} />
      <Highlights id={id} />
      <div>{relations ? <Management relations={relations} /> : null}</div>
    </div>
  )
}
