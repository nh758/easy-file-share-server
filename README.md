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
