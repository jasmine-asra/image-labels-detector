from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)  # To allow cross-origin requests from the frontend

# Rekognition client
rekognition_client = boto3.client('rekognition', region_name='us-east-1')

# S3 client
s3_client = boto3.client('s3')

@app.route('/detect', methods=['POST'])
def detect_labels():
    # Check if the request contains files
    if 'photo' not in request.files or 'bucket' not in request.form:
        return jsonify({"error": "No photo or bucket provided"}), 400
    
    photo = request.files['photo']
    bucket = request.form['bucket']

    # Save the photo temporarily to upload to S3
    filename = secure_filename(photo.filename)
    photo.save(filename)

    try:
        # Upload the file to S3
        s3_client.upload_file(filename, bucket, filename)

        # Call Rekognition's DetectLabels API
        response = rekognition_client.detect_labels(
            Image={'S3Object': {'Bucket': bucket, 'Name': filename}},
            MaxLabels=10
        )

        # Clean up the uploaded file from the local server
        os.remove(filename)

        # Return the labels as a JSON response
        return jsonify({"labels": response['Labels']})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
