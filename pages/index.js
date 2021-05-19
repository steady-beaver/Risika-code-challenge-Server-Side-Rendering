import { useState, useEffect } from "react"
import axios from "axios"
import PuffLoader from "react-spinners/PuffLoader"
import styles from "../styles/Home.module.css"
import Link from "next/link"
import Head from "next/head"

const pattern = new RegExp(/^[a-zA-Z0-9/@. ]*$/)

const Home = () => {
  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (search === "") {
      setResult([])
      setLoading(false)
      return
    }

    if (pattern.test(search) === false) {
      setError(
        "Invalid input. Available characters are letters, numbers, empty space and '/' ",
      )
      setLoading(false)
      setResult([])
    }

    const fn = setTimeout(async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/search?query=${search}`,
        )
        const data = await res.data.data
        // console.log(data)
        setResult(data)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }, 500)

    return () => clearTimeout(fn)
  }, [search])

  const searchHandle = (val) => {
    if (val !== "") setLoading(true)
    setError("")
    setSearch(val)
  }

  return (
    <>
      <Head>
        <title>Search page</title>
      </Head>
      <div className={styles.home}>
        <div>
          <input
            type="text"
            placeholder="Company"
            value={search}
            onChange={(e) => searchHandle(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        {loading && (
          <div className={styles.loaderContainer}>
            <PuffLoader color={"#5BD0DF"} size={100} />
          </div>
        )}
        {result && !loading && (
          <div className={styles.companyList}>
            <ul>
              {result.map((company) => (
                <Link
                  // href={`company/${company.local_organization_id.id}`}
                  href={`/company/${company.local_organization_id.id}`}
                  key={company.local_organization_id.id}
                >
                  <div className={styles.companyItem}>
                    {company.company_name}
                  </div>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Home
