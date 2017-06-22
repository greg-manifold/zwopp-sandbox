'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // String Validation
  if (typeof data.text !== 'string') {
    console.error('ID string validation Failed');
    callback(new Error('Couldn\'t update the todo item.'));
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: event.pathParameters.id,
      text: data.text,
      checked: false,
      updatedAt: timestamp,
    },
  };

  // update the todo in the database
  dynamoDb.put(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t update the todo item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
      //body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
