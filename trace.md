# Trace

    {
        "trace": [
            <point>
        ],
        "points": [
            <point>
        ]
    }

Trace key should contain an array of points which define the trace segments.
Points key should contain an array of points which don't behave to the trace, but have some interest for it. For exemple summits around, point of views, facilities, shelters.

## Point

    {
        "id": 0,
        "coords": [
            "longitude", "latitude"
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
They can differ according to the source used. No medias, point description included, shall be stored here.