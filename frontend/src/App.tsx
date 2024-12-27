import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Results from './components/Results';

const App: React.FC = () => {
  const [labels, setLabels] = useState<any[]>([]);

  const handleDetect = (newLabels: any[]) => {
    setLabels(newLabels);
  };

  return (
    <div className="App">
      <FileUpload onDetect={handleDetect} />
      {labels.length > 0 && <Results labels={labels} />}
    </div>
  );
};

export default App;
