# Amazon Rekognition Label Detection Application

This application uses the Amazon Rekognition service to detect labels (objects, scenes, or activities) in an image. It consists of two components:
1. A **React frontend** for uploading images and interacting with the application.
2. A **Flask backend** that handles image uploads, interacts with AWS Rekognition, and returns the detected labels.

---

## Prerequisites

### AWS Configuration
1. **AWS Account**: Ensure you have an AWS account with access to Amazon Rekognition and S3.
2. **IAM Permissions**: The IAM user or role must have the following permissions:
   - `rekognition:DetectLabels`
   - `s3:PutObject`
   - `s3:GetObject`
3. **S3 Bucket**: The images must be uploaded to an Amazon S3 bucket.

### Install Dependencies
1. **Backend**: Python 3.8+ and `pip` are required. Install the backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. **Frontend**: Node.js 16+ and npm are required. Install the frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

---

## Running the Application

### Flask Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Start the Flask backend:
   ```bash
   python run.py
   ```
3. The backend server will be available at `http://localhost:5000`.

### React Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Start the React development server:
   ```bash
   npm start
   ```
3. The frontend will be available at `http://localhost:3000`.

---

## Features

### Frontend
- Users can upload an image file and specify an S3 bucket name via the React interface.
- Displays the detected labels, confidence levels, and other details returned from the Flask backend.

### Backend
- Handles image uploads and uploads the image to the specified S3 bucket.
- Calls Amazon Rekognition’s `detect_labels` API and processes the response.
- Returns the detected labels in JSON format to the frontend.

---

## API Endpoints

### `POST /detect`
Handles the label detection process.

#### Request
- `photo`: The image file to analyze.
- `bucket`: The name of the S3 bucket to upload the image to.

#### Response
- JSON object with the detected labels and their details.

Example response:
```json
{
  "labels": [
    {
      "Name": "Person",
      "Confidence": 98.7,
      "Instances": [
        {
          "BoundingBox": {
            "Top": 0.1,
            "Left": 0.3,
            "Width": 0.5,
            "Height": 0.4
          },
          "Confidence": 98.0
        }
      ],
      "Parents": ["Human"]
    }
  ]
}
```

---

## Error Handling
- Ensure AWS credentials are correctly configured.
- Verify the S3 bucket name and permissions.
- The Flask backend will return appropriate error messages for issues like missing files or invalid S3 configurations.

---

## Notes

### Configuration
- **Region**: The backend uses the `us-east-1` region for Rekognition. Update this in `src/app.py` if needed.
- **Max Labels**: The `MaxLabels` parameter is set to 10 in Rekognition. You can adjust this in `app.py`.

### Cost
Using Amazon Rekognition may incur costs. Refer to [Amazon Rekognition Pricing](https://aws.amazon.com/rekognition/pricing/) for details.

## License

This script is licensed under the MIT-0 license. See the [LICENSE](https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE) for details.
