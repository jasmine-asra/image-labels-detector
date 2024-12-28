from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
from PIL import Image, ImageDraw
from io import BytesIO
import base64
import os

app = Flask(__name__)
CORS(app)

rekognition_client = boto3.client('rekognition', region_name='us-east-1')
s3_client = boto3.client('s3')

@app.route('/detect', methods=['POST'])
def detect_labels():
    if 'photo' not in request.files or 'bucket' not in request.form:
        return jsonify({"error": "No photo or bucket provided"}), 400

    photo = request.files['photo']
    bucket = request.form['bucket']
    filename = photo.filename
    photo.save(filename)

    try:
        # Upload the image to S3
        s3_client.upload_file(filename, bucket, filename)

        # Call Rekognition API
        response = rekognition_client.detect_labels(
            Image={'S3Object': {'Bucket': bucket, 'Name': filename}},
            MaxLabels=10
        )

        # Load the image from S3
        s3 = boto3.resource('s3')
        obj = s3.Object(bucket, filename)
        img_data = obj.get()['Body'].read()
        img = Image.open(BytesIO(img_data))

        # Annotate the image with bounding boxes
        draw = ImageDraw.Draw(img)
        for label in response['Labels']:
            for instance in label.get('Instances', []):
                bbox = instance['BoundingBox']
                left = bbox['Left'] * img.width
                top = bbox['Top'] * img.height
                width = bbox['Width'] * img.width
                height = bbox['Height'] * img.height
                draw.rectangle(
                    [left, top, left + width, top + height],
                    outline="red",
                    width=2
                )
                draw.text((left, top - 10), label['Name'], fill="red")

        # Save the annotated image to memory
        buffer = BytesIO()
        img.save(buffer, format="JPEG")
        buffer.seek(0)

        # Encode the image to base64
        encoded_image = base64.b64encode(buffer.getvalue()).decode('utf-8')

        # Clean up local file
        os.remove(filename)

        return jsonify({"labels": response['Labels'], "annotated_image": encoded_image})

    except Exception as e:
        return jsonify({"error": str(e)}), 500