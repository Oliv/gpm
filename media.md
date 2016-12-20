# Medias

    {
        "medias": [
             <media>
        ]
    }


## Media

    {
        "point": <pointId>,
        "content": <content>,
        "props": <properties>,
        "type": <type>
    }


## Point

The point represents a point id defined in [trace](./trace.md) file.


## Type

`(string)` content type. Default type is `text`. The content type represents the renderer called to display the content.

### Available types

- trace
- polygon (?)
- audio
- video
- text
- url
- html
- image
- animation


## Content

If the media type is `text` or `undefined` (default to `text`), the content should be a `string`, and no further controls should be done.
If the media type is `trace`, only a local `Package path` can be used.
For any other type, the content types below can be used.

### Uri
`(string)` Uri of the distant content from [rfc 3986](https://tools.ietf.org/html/rfc3986).

### Local path
`(string)` Uri of the local content relative to the current package, starts with `./contentFile`.

### Package path
`(string)` Uri of a local trace package, starts with `/packageName`.

### Base64 encoded content
`(string)` Base64 content from [rfc 4648](https://www.ietf.org/rfc/rfc4648.txt).


## Properties

`(object)` a set of properties transmited to the renderer.
