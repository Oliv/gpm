# Trace

    {
        "trace": [
            <point>
        ]
    }

Trace should contain an array of points which define the trace segments.

## Point

    {
        "id": <id>,
        "coords": [
            <latitude>, <longitude>
        ],
        "date": <date>,
        "props": {
            <properties>
        }
    }


## Id
`(int)` id of the point, with 11 digits.

## Date

### Absolute
`(timestamp|datetime)` Absolute timestamp in ms or datetime of the point.

### Relative
`(+timestamp)` Relative timestamp in ms since the first point.


### Properties

    {
        "altitude": "altitude",
        "accuracy": "accuracy",
        "altitudeAccuracy": "altitudeAccuracy",
        "heading": "heading",
        "speed": "speed"
    }

Properties contain all other coordinates beside coordinates like altitude, speed and heading.
They can differ according to the source used, but should closely match the [w3c Geolocation API Specification 2nd Edition](https://www.w3.org/TR/geolocation-API/#coordinates), latitude and longitude excepted.

No medias, point description included, shall be stored here.