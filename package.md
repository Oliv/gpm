# Package

A `GPM` package in a directory regrouping [trace](./trace.md), [points](./points.md), [trigger](./trigger.md) and [media](./media.md) files in one directory.


## Package structure

    Directory root
        trace.json
        points.json
        media.json
        trigger.json
        medias
            <media files>

### Medias sub-directory

The medias sub-directory contains all relative media files used in `media.json` file. they can be linked with an url starting with `./` defining root medias directory `/medias/`.


## Packaging

The directory should be converted to a tarball named `traceName.gpm` before being sent.