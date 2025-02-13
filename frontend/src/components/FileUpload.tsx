import React, { useState } from 'react';
import axios from 'axios';

interface FileUploadProps {
  onDetect: (labels: any[], annotatedImage: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDetect }) => {
  const [file, setFile] = useState<File | null>(null);
  const [bucket, setBucket] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) setFile(file);
  };

  const handleBucketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBucket(e.target.value);
  };

  const handleSubmit = async () => {
    if (!file || !bucket) {
      setError("Please provide both photo and bucket name.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('bucket', bucket);

    try {
      const response = await axios.post('http://localhost:5000/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onDetect(response.data.labels, response.data.annotated_image);
    } catch (error) {
      setError('Error detecting labels. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Upload Photo for Rekognition</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter S3 Bucket Name"
          value={bucket}
          onChange={handleBucketChange}
          style={{
            padding: '0.5rem',
            width: '80%',
            maxWidth: '300px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Processing...' : 'Detect Labels'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
