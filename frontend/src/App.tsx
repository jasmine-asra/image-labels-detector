import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Results from './components/Results';

const App: React.FC = () => {
  const [labels, setLabels] = useState<any[]>([]);
  const [annotatedImage, setAnnotatedImage] = useState<string | null>(null);

  const handleDetect = (labels: any[], annotatedImage: string) => {
    setLabels(labels);
    setAnnotatedImage(annotatedImage);
  };

  return (
    <div className="App">
      <FileUpload onDetect={handleDetect} />
      {labels.length > 0 && (
        <Results labels={labels} annotatedImage={annotatedImage} />
      )}
    </div>
  );
};

export default App;
