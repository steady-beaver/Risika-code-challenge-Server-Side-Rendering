import { useState, useEffect } from "react"
import axios from "axios"

const useHighlights = (id) => {
  const [highlightsData, setHighlightsData] = useState({})
  const [positiveSorted, setPositiveSorted] = useState(undefined)
  const [negativeSorted, setNegativeSorted] = useState(undefined)
  const [neutralSorted, setNeutralSorted] = useState(undefined)
  const [error, setError] = useState("")

  useEffect(() => {
    const getHighlights = async () => {
      try {
        setError("")
        const res = await axios.get(
          `http://localhost:3000/api/company/highlights/${id}`,
        )
        const data = await res.data.data
        setHighlightsData(data)
      } catch (err) {
        setError(err.message)
      }
    }
    getHighlights()
  }, [id])

  useEffect(() => {
    if (highlightsData && Object.keys(highlightsData).length > 0) {
      const [pos, neg, neu] = digest(highlightsData)
      setPositiveSorted(pos)
      setNegativeSorted(neg)
      setNeutralSorted(neu)
    }
  }, [highlightsData])

  const digest = (highlightsObj) => {
    let positive = new Array()
    let negative = new Array()
    let neutral = new Array()

    for (let key in highlightsObj) {
      switch (highlightsObj[key].classification) {
        case "positive":
          positive.push(highlightsObj[key])
          break
        case "negative":
          negative.push(highlightsObj[key])
          break
        case "neutral":
          neutral.push(highlightsObj[key])
          break
      }
    }
    const weightComparisonRule = (a, b) => {
      return a.weight - b.weight
    }

    const positiveSorted = positive.sort(weightComparisonRule)
    const negativeSorted = negative.sort(weightComparisonRule)
    const neutralSorted = neutral.sort(weightComparisonRule)

    return [positiveSorted[0], negativeSorted[0], neutralSorted[0]]
  }

  return [positiveSorted, negativeSorted, neutralSorted, error]
}

export default useHighlights
