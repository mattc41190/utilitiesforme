// Proposal Only! Not in use!

import { useState, useEffect } from 'react'

// Options:
// fetchFn (required): the function to execute to get data
// loadOnMount (optional): load the data on component mount
// clearDataOnLoad (opt): clear old data on new load regardless of success state
const useAsyncData = ({
  loadOnMount = false,
  clearDataOnLoad = false,
  fetchFn = null
} = {}) => {
  // Our data fetching state variables
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  // A function to handle all the data fetching logic
  const loadData = async (event) => {
    setIsLoading(true)
    setError()
    if (clearDataOnLoad === true) {
      setData()
    }

    try {
      const resp = await fetchFn(event)
      setData(resp)
      setIsLoading(false)
    } catch (e) {
      setError(e)
      setIsLoading(false)
    }
  }

  // 'onMount'
  // maybe load the data if required
  useEffect(() => {
    if (loadOnMount && fetchFn !== null) {
      loadData()
    }
  }, [])

  // Return the state and the load function to the component
  return { data, isLoading, error, loadData }
}

export default useAsyncData
