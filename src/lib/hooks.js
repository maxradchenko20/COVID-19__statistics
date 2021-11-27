import {useEffect, useState} from 'react';

export const useGetCountries = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responce = await fetch("https://api.sampleapis.com/countries/countries")
        .then(res => res.json())
        .catch(err => console.log(err))

      setData(responce)
    }
    fetchData()
  }, [])

  return {
    data
  }
}

export const useGetStats = (country) => {

  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function pause() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000)
    })
  }


  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);
      setError('');

      await pause();

      const responce = await fetch(`https://covid19.mathdro.id/api/countries/${country}`)
        .then(res => res.json())
        .catch(err => console.log(err))

      if (!responce.error) {
        setData(responce)
      } else {
        setError(responce.error.message)
      }

      setLoading(false)

    }
    fetchData()
  }, [country])

  return {
    data,
    error,
    loading
  }
}