import cloneDeep from "lodash.clonedeep"
import toWords from "split-camelcase-to-words"
import styles from "../../styles/Company.module.css"
// import { uid } from "uid"
import { setManagementData } from "./utils/setManagementData"
const managementRoles = [
  "MANAGEMENT",
  "ADMINISTRATION",
  "CHIEF EXECUTIVE OFFICER",
  "BOARD OF DIRECTORS",
  "CHAIRMAN",
  "DEPUTY CHAIRMAN",
  "DEPUTY",
  "STAKEHOLDER",
]

const formatSeniority = (data) => {
  let months
  let transformedData = cloneDeep(data)

  if (data.props.children[0].props.children[0])
    months = data.props.children[0].props.children[0]
  else return data

  if (months >= 12) {
    transformedData.props.children[0].props.children[0] = Math.round(
      months / 12,
    )
    transformedData.props.children[0].props.children[1] = " years"
  }

  return transformedData
}

const transformHeaderCell = (str) => {
  let newStr = toWords(str).toLowerCase()
  newStr = newStr[0].toLocaleUpperCase() + newStr.slice(1)
  return newStr
}

const Management = ({ relations }) => {
  const { management, boardOfDirectors } = relations

  const managementData = setManagementData(managementRoles, [
    ...management,
    ...boardOfDirectors,
  ])
  const keys = Object.keys(managementData[0])

  return (
    <div className={styles.management}>
      <h3>Management</h3>
      <div className={styles.frame}>
        <table className={styles.seniorityTable}>
          <thead>
            <tr>
              {keys.map((key) => (
                <th key={`only keys ${key}`}>{transformHeaderCell(key)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {managementData.map((data, i) => (
              <tr key={i}>
                {keys.map((key) => (
                  <th key={key}>
                    {/* {data[key]} */}
                    {key === "seniority"
                      ? formatSeniority(data[key])
                      : data[key]}
                  </th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Management
