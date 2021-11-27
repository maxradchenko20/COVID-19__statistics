import React from 'react';
import {useGetStats} from "../../lib/hooks";

const CountryData = ({country}) => {

  const {data, error, loading} = useGetStats(country);

  return (
    <div className="container-data">
      {error && <p className='message error'>Error...</p>}
      {loading && <p className='message'>Loading...</p>}
      {data && !!Object.keys(data).length && !error && !loading && (
        <>
          <h2>Статистика</h2>
          <div className='stats'>
            <p>
              <span>Total cases: </span> {data.confirmed.value}
            </p>
            <p>
              <span>Killed: </span> {data.deaths.value}
            </p>
            <p>
              <span>Recovered: </span> {data.recovered.value}
            </p>
          </div>
        </>
      )}

    </div>
  )
}
export default CountryData;