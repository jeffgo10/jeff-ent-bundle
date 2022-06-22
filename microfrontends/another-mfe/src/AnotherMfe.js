import { useState } from 'react';
import './AnotherMfe.css';

const API_TIMESTAMP_PATH = '/api/timestamp'

function AnotherMfe({ config }) {
  const { api } = (config && config.systemParams) || {};

  const internalApiUrl = api && api['int-api'].url;
  const externalApiUrl = api && api['ext-api'].url;

  const [internalTimestamp, setInternalTimestamp] = useState(null);
  const [externalTimestamp, setExternalTimestamp] = useState(null);

  const fetchTimestamps = async () => {
    try {
      const internalApiResponse = await fetch(internalApiUrl + API_TIMESTAMP_PATH);

      if (internalApiResponse.ok) {
        setInternalTimestamp((await internalApiResponse.json())?.timestamp);
      } else {
        setInternalTimestamp('Server responded with an error');
      }
    } catch (error) {
      setInternalTimestamp(error.message)
    }


    try {
      const externalApiResponse = await fetch(externalApiUrl + API_TIMESTAMP_PATH);

      if (externalApiResponse.ok) {
        setExternalTimestamp((await externalApiResponse.json())?.timestamp);
      } else {
        setExternalTimestamp('Server responded with an error');
      }
    } catch(error) {
      setExternalTimestamp(error.message)
    }
    
  }

  const handleBtnClick = () => {
    fetchTimestamps()
  };

  return (
    <div className="App">
      <button onClick={handleBtnClick}>Get timestamps</button>
      {internalTimestamp && (
        <>
          <div>Internal timestamp: {internalTimestamp}</div>
          <div>External timestamp: {externalTimestamp}</div>
        </>
      )}
    </div>
  );
}

export default AnotherMfe;
