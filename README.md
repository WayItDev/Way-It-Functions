# Express API

[![Build Status](https://travis-ci.com/WayItDev/Way-It-Functions.svg?branch=master)](https://travis-ci.com/WayItDev/Way-It-Functions)
[![Coverage Status](https://coveralls.io/repos/github/WayItDev/Way-It-Functions/badge.svg?branch=master)](https://coveralls.io/github/WayItDev/Way-It-Functions?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/4b7fe656ed7074c6bc99/maintainability)](https://codeclimate.com/github/WayItDev/Way-It-Functions/maintainability)

## The only folders you need to use is src and test

## How to run the app

1. To start in development open a terminal in the project root and run `yarn startdev`

2. To start the application in production run `yarn start`

3. To use eslint and prettier run `yarn pretty`

4. To test all your tests in the project run `yarn test`

## Data Structure

```json
{
    "routes": {
      "name": {
          "value": "Fresh Market",
          "type": "string",
          "description": "Name of the route"
      },
      "user": {
        "value": "Henk",
        "type": "string",
        "description": "Name of the user who made it"
      },
      "Description": {
        "value": "The restaurant has an extensive selection of fresh fish flown in daily from the Sea of Japan as well as both the Atlantic and Pacific oceans.",
        "type": "string",
        "description": "The description of the route"
      },
      "Date": {
        "value": "2020-09-23T12:30:00.000Z",
        "type": "timestamp",
        "description": "The date when the route was taken"
      },
      "Distance": {
        "value": ["14", "mil/km"],
        "type": "number",
        "description": "The distance made of the route in kilometers or miles"
      },
      "Duration": {
        "value": ["12", "min"],
        "type": "number",
        "description": "The duration that it took to make the route in minutes"
      },
      "Images": {
        "value": [
            "https://firebase.storage.com",
            "https://firebase.storage.com",
            "https://firebase.storage.com"
        ],
        "type": ["array", "string"],
        "description": "The images made in the route with a image url to the firebase storage"
      },
      "coordinates": {
        "value": [
            [37.8025259, -122.4351431],
            [37.7896386, -122.421646],
            [37.7665248, -122.4161628],
            [37.7734153, -122.4577787],
            [37.7948605, -122.4596065],
            [37.8025259, -122.4351431]
        ],
        "type": ["array", "geopoint"],
        "description": "The geo locations of the route with lat and long"
      }
    },
    "users": {
      "username": {
          "value": "Henk",
          "type": "string",
          "description": "Name of the user"
      },
      "email": {
        "value": "Henn@gmail.com",
        "type": "string",
        "description": "The email of the user"
      },
      "userId": {
        "value": "fOmfPUKfZsMogR02MQwtbNzeQWP2",
        "type": "string",
        "description": "The id of the user"
      },
      "createdAt": {
        "value": "2020-09-22T18:08:07.311Z",
        "type": "string",
        "description": "The date and time when the document was created"
      }
    },
    "config": {
      "theme": {
          "value": "Light or Dark",
          "type": "string",
          "description": "The theme for the app Light or Dark"
      },
      "metrics": {
        "value": "km or mil",
        "type": "string",
        "description": "The metric for the distance"
      }
    }
  }
```
