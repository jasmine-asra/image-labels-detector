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
}

const Results: React.FC<ResultsProps> = ({ labels }) => {
  return (
    <div>
      <h2>Detected Labels</h2>
      {labels.length === 0 ? (
        <p>No labels detected.</p>
      ) : (
        <ul>
          {labels.map((label, index) => (
            <li key={index} style={{ marginBottom: '1rem' }}>
              <strong>Label: {label.Name}</strong> (Confidence: {label.Confidence.toFixed(2)}%)
              {label.Instances.length > 0 ? (
                <div>
                  <strong>Instances:</strong>
                  <ul>
                    {label.Instances.map((instance, i) => (
                      <li key={i}>
                        <div>
                          <strong>Bounding Box:</strong>
                          <ul>
                            <li>Top: {instance.BoundingBox.Top.toFixed(2)}</li>
                            <li>Left: {instance.BoundingBox.Left.toFixed(2)}</li>
                            <li>Width: {instance.BoundingBox.Width.toFixed(2)}</li>
                            <li>Height: {instance.BoundingBox.Height.toFixed(2)}</li>
                          </ul>
                        </div>
                        <div>Confidence: {instance.Confidence.toFixed(2)}%</div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p></p>
              )}
              {label.Parents.length > 0 ? (
                <div>
                  <strong>Parents:</strong>
                  <ul>
                    {label.Parents.map((parent, j) => (
                      <li key={j}>{parent.Name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No parent labels available.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;
