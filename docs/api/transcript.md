# Transcript
## ``GET /api/transcript``

⚠️ This route lacks any actual data from testing, rather the design was inferred so behavior might be different from expected.

### Description
Returns the data from the endpoint [https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Transcript](https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Transcript).

### Example Request
```bash
curl --request GET \
  --url http://localhost:3000/api/transcript \
  --header 'sessioncookie: INSERT_SESSION_HERE'
```

### Example Resolve
```json
{
	"error": false,
	"data": null
}
```