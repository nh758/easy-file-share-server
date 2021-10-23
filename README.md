# Easy File Share server

## API

### Upload

`/upload`

Requires Authorization

Expects form-data files in the request body

Will return the download urls

```
{ 'key': 'http://domain.com/d/folder/file.txt' }
```

### Download

`/d/:folder/:file`

### List

`/list`

Requires Authorization

Returns list of files for the given user

```
[
    {
        "file": "img2.png",
        "url": "localhost/d/test/img2.png"
    },
    {
        "file": "img3.png",
        "url": "localhost/d/test/img3.png"
    }
]
```
