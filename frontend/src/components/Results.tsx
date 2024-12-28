import React from 'react';

interface BoundingBox {
  Top: number;
  Left: number;
  Width: number;
  Height: number;
}

interface Instance {
  BoundingBox: BoundingBox;
  Confidence: number;
}

interface Parent {
  Name: string;
}

interface Label {
  Name: string;
  Confidence: number;
  Instances: Instance[];
  Parents: Parent[];
}

interface ResultsProps {
  labels: Label[];
  annotatedImage: string | null;
}

const Results: React.FC<ResultsProps> = ({ labels, annotatedImage }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Detected Labels</h2>
      {annotatedImage && (
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            maxWidth: '600px',
            margin: '0 auto',
            border: '1px solid #ccc',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <img
            src={`data:image/jpeg;base64,${annotatedImage}`}
            alt="Annotated"
            style={{
              width: '100%',
              display: 'block',
            }}
          />
          {labels.map((label, index) =>
            label.Instances.map((instance, i) => {
              const bbox = instance.BoundingBox;
              const left = bbox.Left * 100 + '%';
              const top = bbox.Top * 100 + '%';
              const width = bbox.Width * 100 + '%';
              const height = bbox.Height * 100 + '%';

              return (
                <div
                  key={`${index}-${i}`}
                  style={{
                    position: 'absolute',
                    left,
                    top,
                    width,
                    height,
                    border: '2px solid red',
                    boxSizing: 'border-box',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '-1.5em',
                      left: '0',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      color: 'red',
                      fontSize: '0.75em',
                      padding: '2px 4px',
                      borderRadius: '3px',
                      pointerEvents: 'none',
                    }}
                  >
                    {label.Name} ({label.Confidence.toFixed(2)}%)
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}
      {labels.length === 0 && <p style={{ marginTop: '1rem' }}>No labels detected.</p>}
    </div>
  );
};

export default Results;
