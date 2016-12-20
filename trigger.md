# Triggers

    {
        "triggers": [
            <trigger>
        ]
    }


## Trigger

    {
        "point": <pointId>,
        "event": <event>,
        "props": <properties>
    }


## Point

The point represents a point id defined in [trace](./trace.md) file.


## Event

`(string)` The event name, should be triggered in implementation.


## Properties

`(object)` a set of properties transmited to the event triggered.
