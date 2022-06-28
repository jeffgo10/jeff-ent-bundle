import logo from './logo.svg';
import './AnotherMfeConfig.css';

function AnotherMfeConfig({ config }) {
  const { params } = config;
  const fields = Object.keys(params || {})

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        MFE Form
      </header>
      {fields.map(field => (
        <div>{field}: <input name={field} defaultValue={params[field]} /></div>
      ))}
    </div>
  );
}

export default AnotherMfeConfig;
