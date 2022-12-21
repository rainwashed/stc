# Marks
## ``GET /api/marks``

### Description
Returns the data from the endpoint [https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Marks](https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Marks).

### Example Request
```bash
curl --request GET \
  --url http://localhost:3000/api/marks \
  --header 'sessioncookie: INSERT_SESSION_HERE'
```

### Example Resolve
```json
{
	"error": false,
	"data": [
		{
			"label": "progress_report_2",
			"pdf_link": "document_link",
			"courses": [
				{
					"period": "1",
					"course": "Course_Name",
					"teacher": {
						"name": "LastName, FirstInitial",
						"email": "example@bloomfield.org"
					},
					"acad": "A",
					"comments": "",
					"notes": ""
				},
			]
		},
	]
}
```