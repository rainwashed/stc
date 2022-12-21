# Schedule
## ``GET /api/report_cards``

### Description
Returns the data from the endpoint [https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Schedule](https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Schedule).

### Example Request
```bash
curl --request GET \
  --url http://localhost:3000/api/schedule \
  --header 'sessioncookie: INSERT_SESSION_HERE'
```

### Example Resolve
```json
{
	"error": false,
	"data": [
		{
			"period": "H",
			"days": "A",
			"term": "YRH",
			"coursecode": "11111",
			"course": "Seminar",
			"teacher": {
				"name": "LastName, FirstInitial",
				"email": "example@bloomfield.org"
			},
			"classroom": "000",
			"entry": "00/00/0000",
			"exit": "00/00/0000"
		},
	]
}
```