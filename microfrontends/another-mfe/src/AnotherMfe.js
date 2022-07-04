import { useState } from 'react';
import logo from './react-logo.svg';
import './AnotherMfe.css';

const API_TIMESTAMP_PATH = '/api/timestamp'

function AnotherMfe({ config }) {
  const { systemParams, contextParams, params } = config;
  const { api } = systemParams || {};

  const { username, description } = params;

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <button onClick={handleBtnClick}>Get timestamps</button>
      {internalTimestamp && (
        <>
          <div>Internal timestamp: {internalTimestamp}</div>
          <div>External timestamp: {externalTimestamp}</div>
        </>
      )}
      <br />
      {
        contextParams && (
          <>
            <div>Page Code: <strong>{contextParams.page_code}</strong></div>
          </>
        )
      }
      <br />
      {
        params && (
          <>
            <div>Username: <strong>{username}</strong></div>
            <div>Description <strong>{description}</strong></div>
          </>
        )
      }
    </div>
  );
}

export default AnotherMfe;
