# Triggers

    {
        "triggers": [
            <trigger>
        ]
    }


## Trigger

    {
        "id": <id>,
        "point": <pointId>,
        "event": <event>,
        "props": <properties>
    }


## Id
`(int)` id of the point, with 11 digits.


## Point

The point represents a point id defined in [trace](./trace.md) file.


## Event

`(string)` The event name, should be triggered in implementation.


## Properties

`(object)` a set of properties transmitted to the event triggered.
