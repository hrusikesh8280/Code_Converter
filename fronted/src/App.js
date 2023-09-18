import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import CodeEditor from './components/CodeEditor';
import Dropdown from './components/Dropdown';
import ConversionResult from './components/ConversionResult';

function App() {
  const [code, setCode] = useState('');
  const [targetLang, setTargetLang] = useState('');
  const [conversionResult, setConversionResult] = useState('');
  const [debugResult, setDebugResult] = useState('');
  const [qualityResult, setQualityResult] = useState('');

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleLangChange = (selectedOption) => {
    setTargetLang(selectedOption);
  };

  const handleConvert = async () => {
    try {
      const response = await axios.post('https://cautious-tan-top-hat.cyclic.app/convert', { code, targetLang: targetLang.value });
      setConversionResult(response.data.convertedCode);
      setDebugResult(''); // Clear previous debug result
      setQualityResult(''); // Clear previous quality result
    } catch (error) {
      console.error(error);
      setConversionResult('Error converting code');
    }
  };

  const handleDebug = async () => {
    try {
      const response = await axios.post('https://cautious-tan-top-hat.cyclic.app/debug', { code });
      setDebugResult(response.data.debugOutput);
      setConversionResult(''); // Clear previous conversion result
      setQualityResult(''); // Clear previous quality result
    } catch (error) {
      console.error(error);
      setDebugResult('Error debugging code');
    }
  };

  const handleQualityCheck = async () => {
    try {
      const response = await axios.post('https://cautious-tan-top-hat.cyclic.app/quality', { code });
      setQualityResult(response.data.qualityCheckOutput);
      setConversionResult(''); // Clear previous conversion result
      setDebugResult(''); // Clear previous debug result
    } catch (error) {
      console.error(error);
      setQualityResult('Error performing quality check');
    }
  };

  const languageOptions = [
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'C++', label: 'C++' },
    // Add more language options here
  ];

  return (
    <div className="App">
      <h1>Code Converter App</h1>
      <div className="top-container">
        <Dropdown options={languageOptions} selectedOption={targetLang} onOptionChange={handleLangChange} />
        <div className="buttons-container">
          <button onClick={handleConvert}>Convert</button>
          <button onClick={handleDebug}>Debug</button>
          <button onClick={handleQualityCheck}>Quality Check</button>
        </div>
      </div>
      <div className="main-container">
        <div className="input-container">
          <CodeEditor onCodeChange={handleCodeChange} />
        </div>
        <div className="output-container">
          {conversionResult && <ConversionResult title="Conversion" result={conversionResult} />}
          {debugResult && <ConversionResult title="Debugging" result={debugResult} />}
          {qualityResult && <ConversionResult title="Quality Check" result={qualityResult} />}
        </div>
      </div>
    </div>
  );
}

export default App;
