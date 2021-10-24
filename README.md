# Easy File Share server

## API

### Login

`POST /login`

| Parameter | Key      | Type   |
| --------- | -------- | ------ |
| body      | passcode | String |

Returns token

### Upload

`POST /upload`

| Parameter | Key   | Type   |
| --------- | ----- | ------ |
| header    | token | string |
| body      | any   | file   |

Will return the download urls

```
{ 'key': 'http://domain.com/d/folder/file.txt' }
```

### Download

`GET /d/:folder/:file`

| Parameter | Key    | Type   |
| --------- | ------ | ------ |
| query     | folder | string |
| query     | file   | string |

### List

`GET /list`

| Parameter | Key   | Type   |
| --------- | ----- | ------ |
| header    | token | string |

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

### Delete

`DELETE /delete/:filename`

| Parameter | Key      | Type   |
| --------- | -------- | ------ |
| header    | token    | string |
| query     | filename | string |
