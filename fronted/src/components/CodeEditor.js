import React, {useState, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';

const CodeEditor = ({ onCodeChange }) => {
  const defaultCode = "// Write your code here...";
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const handleEditorChange = (value) => {
    setCode(value);
    onCodeChange(value);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    // Add more language options here
  ];

  const languageConfig = {
    javascript: {
      language: 'javascript',
      theme: 'vs-dark',
    },
    python: {
      language: 'python',
      theme: 'vs-dark',
    },
    // Add more language configurations here
  };

  const editorRef = useRef(null);

  return (
    <div>
      <div>
        <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <MonacoEditor
        height="500px"
        {...languageConfig[selectedLanguage]}
        value={code}
        defaultValue={defaultCode}
        onChange={handleEditorChange}
        editorDidMount={(editor, monaco) => {
          editorRef.current = editor;
        }}
      />
    </div>
  );
};

export default CodeEditor;
