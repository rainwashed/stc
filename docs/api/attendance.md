# Attendance 
## ``GET /api/attendance``

### Description
Returns the data from the endpoint [https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Attendance](https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Attendance).

### Example Request
```bash
curl --request GET \
  --url http://localhost:3000/api/attendance \
  --header 'sessioncookie: INSERT_SESSION_HERE'
```

### Example Resolve
```json
{
	"error": false,
	"data": {
		"summaryByReason": {
			"present": 299,
			"present1st": 8,
			"undefined": 1
		},
		"summaryByClass": [
			{
				"period": "H",
				"term": "YRH",
				"course": "COURSE_NAME",
				"teacher": {
					"name": "LastName, FirstInitial",
					"email": "email@bloomfield.org"
				},
				"tardy": 0,
				"excused": 0,
				"unexcused": 0
			},
		],
		"detail": [
			{
				"date": "12/20/2022",
				"period": "1",
				"attendance": "Present",
				"course": "COURSE_NAME",
				"teacher": {
					"name": "LastName, FirstInitial",
					"email": "email@bloomfield.org"
				}
			},
		]
	}
}
```