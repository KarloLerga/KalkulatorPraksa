import { useState } from 'react';
import './index.css'; // Import the external CSS file

const App = () => {
  const [input, setInput] = useState('');

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        const result = eval(input);
        setInput(result.toString());
      } catch {
        setInput('Error');
      }
    } else if (value === 'C') {
      setInput('');
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <div className="calculator-container">
      {/* Display */}
      <div className="display">{input || '0'}</div>
      {/* Buttons */}
      <div className="buttons-container">
        {['C', '+/-', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map(
          (item) => (
            <button
              key={item}
              className={`button ${item === '=' ? 'button-equals' : ''}`}
              onClick={() => handleButtonClick(item)}
            >
              {item}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default App;
