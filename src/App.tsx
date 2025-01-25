import { useState, useEffect } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(true);

  // Handle button click
  const handleButtonClick = (value: string) => {
    if (value === '←') {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === '=') {
      try {
        const result = eval(input);
        setHistory((prev) => [...prev, `${input} = ${result}`]);
        setInput(result.toString());
      } catch {
        setInput('Error');
      }
    } else if (value === 'C') {
      setInput('');
    } else if (value === '√') {
      setInput(Math.sqrt(parseFloat(input)).toString());
    } else if (value === '^') {
      setInput((prev) => prev + '**'); // Exponentiation
    } else if (value === 'sin') {
      setInput(Math.sin(parseFloat(input) * (Math.PI / 180)).toString());
    } else if (value === 'cos') {
      setInput(Math.cos(parseFloat(input) * (Math.PI / 180)).toString());
    } else if (value === 'log') {
      setInput(Math.log10(parseFloat(input)).toString());
    } else if (value === 'ln') {
      setInput(Math.log(parseFloat(input)).toString());
    } else if (value === 'e^x') {
      setInput(Math.exp(parseFloat(input)).toString());
    } else {
      setInput((prev) => prev + value);
    }
  };

  // Handle key press
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleButtonClick('=');
    } else if (event.key === 'Backspace') {
      handleButtonClick('←');
    } else {
      handleButtonClick(event.key);
    }
  };

  // Add event listener for key press
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Handle result click
  const handleResultClick = (result: string) => {
    setInput(result.split(' = ')[1]); // Use the result from history
  };

  return (
    <div
      className={`flex h-screen ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* Sidebar for history */}
      <div
        className={`w-1/4 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
        } p-4 overflow-y-auto`}
      >
        <h2 className="text-lg font-bold mb-4">History</h2>
        <ul className="text-sm">
          {history.map((item, index) => (
            <li
              key={index}
              className="mb-2 cursor-pointer hover:underline"
              onClick={() => handleResultClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Calculator */}
      <div className="flex flex-col items-center flex-grow p-4">
        {/* Toggle Dark/Light Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="self-end mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* Display */}
        <div
          className={`w-full max-w-md h-24 ${
            darkMode ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'
          } text-right text-4xl p-5 rounded-lg border border-gray-700`}
        >
          {input || '0'}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-5 w-full max-w-md">
          {[
            'C',
            '←',
            '%',
            '/',
            '7',
            '8',
            '9',
            '*',
            '4',
            '5',
            '6',
            '-',
            '1',
            '2',
            '3',
            '+',
            '0',
            '.',
            '=',
            '√',
            '^',
            'sin',
            'cos',
            'log',
            'ln',
            'e^x',
          ].map((item) => (
            <button
              key={item}
              className={`h-16 rounded-lg font-bold transition transform hover:scale-105 ${
                item === '='
                  ? 'col-span-1 row-span-2 bg-orange-500 text-white'
                  : item === 'C' || item === '←' || item === '%'
                  ? 'bg-gray-400 text-black'
                  : item === '/' ||
                    item === '*' ||
                    item === '-' ||
                    item === '+' ||
                    item === '√' ||
                    item === '^' ||
                    item === 'sin' ||
                    item === 'cos' ||
                    item === 'log' ||
                    item === 'ln' ||
                    item === 'e^x'
                  ? 'bg-orange-500 text-white'
                  : darkMode
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={() => handleButtonClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
