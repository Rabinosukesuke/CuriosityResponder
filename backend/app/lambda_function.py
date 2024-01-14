import os
import json


def lambda_handler(event, context):
    # env
    aws_region: str = os.environ["AWS_REGION"]
    aws_access_key_id: str = os.environ["AWS_ACCESS_KEY_ID"]
    aws_secret_access_key: str = os.environ["AWS_SECRET_ACCESS_KEY"]
    dynamodb_qa_table_name: str = os.environ["DYNAMODB_QA_TABLE_NAME"]

    return {"statusCode": 200, "body": json.dumps("Hello from Lambda!")}
