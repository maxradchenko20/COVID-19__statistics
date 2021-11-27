import {useGetCountries} from "../../lib/hooks";
import {useState} from "react";
import CountryData from "../CountryData/CountryData";

const Countries = () => {
  const [country, setCountry] = useState('');
  const [countrySelected, setCountrySelected] = useState('');
  const [countryOptions, setCountryOptions] = useState([]);
  const {data: countries} = useGetCountries();

  const handleClick = (name) => {
    setCountry(name);
    setCountryOptions([]);
    setCountrySelected(name);
  }

  const handleInput = (e) => {
    if (e.target.value) {
      setCountry(e.target.value);
      const options = countries.filter(res => {
        const regex = new RegExp(e.target.value, 'gi');
        return res.name.match(regex);
      });
      setCountryOptions(options);
    } else {
      setCountry('');
      setCountryOptions([]);
    }
  }

  const renderCountry = (flagUrl, name, id) => {
    return flagUrl ? (
      <div className='option' key={id} onClick={() => handleClick(name)}>
        <img src={flagUrl} alt={name}/>
        <span>{name}</span>
      </div>
    ) : null;
  }


  return (
    <div className="container">
      <div className='form'>
        <h2>Countries</h2>
        <input type='text' value={country} onChange={handleInput} placeholder="Enter the country name"/>
        {!!countryOptions.length && (
          <div>
            {countryOptions
              .map(res => renderCountry(res.media.flag, res.name, res.id))
              .slice(0, 10)}
          </div>
        )}
      </div>
      {countrySelected && <CountryData country={countrySelected}/>}
    </div>
  );
};

export default Countries;