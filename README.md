# Amazon Rekognition Label Detection Script

This Python script uses the Amazon Rekognition service to detect labels (objects, scenes, or activities) in an image stored in an Amazon S3 bucket. The script interacts with AWS Rekognition's `detect_labels` API and outputs detailed information about the detected labels, confidence levels, bounding boxes (for labeled instances), and parent labels.

## Prerequisites

1. **AWS Account**: You must have an AWS account with access to Amazon Rekognition and S3.
2. **IAM Permissions**: The IAM user or role executing this script must have the following permissions:
   - `rekognition:DetectLabels`
   - `s3:GetObject`
3. **AWS SDK for Python (`boto3`)**: This script requires the `boto3` library to interact with AWS services.
4. **S3 Bucket**: The image you want to analyze must be stored in an Amazon S3 bucket. The script will ask for the bucket name and the photo file name (S3 object key).

## Installation

1. **Install `boto3`**: If you haven't already installed `boto3`, you can do so using pip:
   ```bash
   pip install boto3
   ```

2. **Configure AWS Credentials**: Before running the script, ensure that your AWS credentials are configured:
   - Run `aws configure` in the command line and provide your AWS Access Key ID, Secret Access Key, and the default region (e.g., `us-east-1`).
   
   Alternatively, you can use environment variables or IAM roles if running the script on AWS services (EC2, Lambda, etc.).

## Script Overview

### `detect_labels(photo, bucket)`

This function sends the image stored in the specified S3 bucket to Amazon Rekognition's `detect_labels` API. It processes the response, which includes the labels detected in the image, the confidence level for each label, and the bounding box for labeled instances. It also lists parent labels for each detected label.

#### Parameters:
- `photo`: The name (key) of the image file in the S3 bucket.
- `bucket`: The name of the S3 bucket that contains the image.

#### Returns:
- The number of labels detected by Rekognition.

### `main()`

This is the entry point of the script. It prompts the user to input the S3 bucket name and the photo name (S3 object key), and then it calls the `detect_labels` function with those inputs.

## Usage

1. **Run the script**:
   ```bash
   python main.py
   ```

2. **Provide Input**:
   - The script will prompt you to enter the S3 bucket name where the image is stored.
   - The script will also ask for the name of the image (S3 object key).
   
   Example:
   ```
   Enter the name of the photo (S3 object key): myphoto.jpg
   Enter the name of the S3 bucket: my-bucket-name
   ```

3. **Output**:
   After processing, the script will print the detected labels, confidence levels, and information about the bounding boxes for labeled instances. It will also list the parent labels for each detected label.

   Example Output:
   ```
   Detected labels for myphoto.jpg

   Label: Person
   Confidence: 98.7
   Instances:
     Bounding box
       Top: 0.1
       Left: 0.3
       Width: 0.5
       Height: 0.4
     Confidence: 98.0

   Parents:
     Human
   ----------
   
   Labels detected: 5
   ```

## Error Handling

- Ensure the S3 bucket and photo name are correct.
- The script assumes that the image is publicly accessible or the IAM user has the correct permissions to access the S3 object.
- If there are issues with the AWS credentials or region, the script will raise an error. Make sure to configure your AWS credentials correctly using the `aws configure` command.

## Notes

- **Region**: The script uses the `us-east-1` region for Rekognition. You can change this by modifying the `region_name` parameter in the `boto3.client()` initialization if you're using a different region.
- **Max Labels**: The `MaxLabels` parameter is set to 10, meaning the script will only return the top 10 labels. You can modify this value based on your needs.
- **Cost**: Using Amazon Rekognition might incur costs, depending on the number of API calls and the size of the images being processed. Check the [Amazon Rekognition pricing](https://aws.amazon.com/rekognition/pricing/) for more information.

## License

This script is licensed under the MIT-0 license. See the [LICENSE](https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE) for details.
