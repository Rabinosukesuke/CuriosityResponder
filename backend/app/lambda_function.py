import os
import boto3
from datetime import datetime
from boto3.dynamodb.conditions import Key
from aws_lambda_context import LambdaContext


def is_isoformat(date_string):
    try:
        datetime.fromisoformat(date_string)
        return True
    except ValueError:
        return False


def lambda_handler(event: dict, context: LambdaContext) -> dict:
    aws_region: str = os.environ["AWS_REGION"]
    aws_access_key_id: str = os.environ["AWS_ACCESS_KEY_ID"]
    aws_secret_access_key: str = os.environ["AWS_SECRET_ACCESS_KEY"]
    dynamodb_qa_table_name: str = os.environ["DYNAMODB_QA_TABLE_NAME"]
    dynamodb_qa_table_column_list: list = os.environ[
        "DYNAMODB_QA_TABLE_COLUMN_LIST"
    ].split(",")

    operation: str | None = event.get("operation")
    if operation is None:
        return {"message": "operation is required."}

    dynamodb = boto3.resource(
        "dynamodb",
        region_name=aws_region,
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
    )
    table = dynamodb.Table(dynamodb_qa_table_name)

    if operation == "get":
        uid: str | None = event.get("uid")
        if type(uid) is not str:
            return {"message": "uid must be str."}
        elif uid is None:
            return {"message": "operation get requires uid."}

        response = table.query(KeyConditionExpression=Key("uid").eq(uid))

        return {
            "items": response["Items"],
        }
    elif operation == "post":
        item: dict | None = event.get("item")
        if type(item) is not dict:
            return {"message": "item must be dict."}
        elif item is None:
            return {"message": "operation put requires item."}
        elif not all(key in dynamodb_qa_table_column_list for key in item.keys()):
            return {"message": "item is invalid keys."}
        elif not all(isinstance(value, str) for value in item.values()):
            return {"message": "item is invalid type."}
        elif not is_isoformat(item["datetime"]):
            return {"message": "item datetime is invalid isoformat."}

        table.put_item(Item=item)
        return {"message": "success."}
    return {"message": "operation is invalid."}
