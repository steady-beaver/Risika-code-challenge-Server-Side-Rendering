import styles from "../../styles/Company.module.css"
import axios from "axios"
import General from "@/components/CompanyPage/General"
import Highlights from "@/components/CompanyPage/Highlights"
import Management from "@/components/Management"
import { companyRelations } from "@/requests"
import { useRouter } from "next/router"
import cloneDeep from "clone-deep"

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "37677892" } }],
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  let generalData
  let highlightsData
  let relations
  const id = params.id

  //get generalData
  try {
    const generalDataRes = await axios.get(
      `http://localhost:3000/api/company/basics/${id}`,
    )
    generalData = await generalDataRes.data.data
  } catch (error) {
    console.log("Problem with getting Basics data")
    console.log(error)
  }

  //get highlightsData
  try {
    const highlightsDataRes = await axios.get(
      `http://localhost:3000/api/company/highlights/${id}`,
    )
    highlightsData = await highlightsDataRes.data.data
  } catch (error) {
    console.log("Problem with getting Highlights data")
    console.log(error)
  }

  //get relations
  try {
    const res = await companyRelations({ id })
    relations = cloneDeep(res)
    // console.log(Object.keys(relations).length)
  } catch (error) {
    console.log("Problem with getting relations")
    console.log(error)
  }

  if (!generalData || !highlightsData || !relations) {
    return {
      notFound: true,
    }
  }

  return {
    props: { generalData, highlightsData, relations },
  }
}

const Company = ({ generalData, highlightsData, relations }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.company}>
      <General generalData={generalData} />
      <Highlights highlightsData={highlightsData} />
      <div>
        <Management relations={relations} />
      </div>
    </div>
  )
}

export default Company
