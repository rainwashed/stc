# Assignments 
## ``GET /api/assignments``

### Description
Returns the data from the endpoint [https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Assignments](https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Assignments).

### Example Request
```bash
curl --request GET \
  --url http://localhost:3000/api/assignments \
  --header 'sessioncookie: INSERT_SESSION_HERE'
```

### Example Resolve
```json
{
	"error": false,
	"data": [{
			"name": "Course Name",
			"session": "Current Semester 1 High School Grade: ",
			"grade": {
				"letter": "A",
				"percentage": 157.2
			},
			"progress_report": "https://studentconnect.bloomfield.org/studentportal/Home/AssignmentProgRpt/UID",
			"teacher": {
				"name": "LastName, FirstName",
				"email": "mailto:email@bloomfield.org"
			},
			"assignments": [
				{
					"detail": "",
					"datedue": "01/09/2023",
					"assigned": "12/01/2022",
					"assignment": "Shark Tank Project",
					"ptspossible": 40,
					"score": "",
					"scoredas": "",
					"extracredit": "",
					"notgraded": "",
					"comments": false
				},
            ]
        },
    ]
}
```