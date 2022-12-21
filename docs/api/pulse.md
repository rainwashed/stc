# Pulse
## ``GET /api/pulse``

### Description
Returns the data from the endpoint [https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Pulse](https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Pulse).

### Example Request
```bash
curl --request GET \
  --url http://localhost:3000/api/pulse \
  --header 'sessioncookie: INSERT_SESSION_HERE'
```

### Example Resolve
```json
{
	"error": false,
	"data": [
		{
			"class": "Class_Name",
			"teacher": "LastName, FirstInitial",
			"period": "1",
			"room": "E36",
			"term": "Quarter 2 High School",
			"letter_grade": "A",
			"percent_grade": 105.5,
			"absence_count": 0,
			"tardie_count": 1,
			"missing_assignment_count": 0
		},
	]
}
```