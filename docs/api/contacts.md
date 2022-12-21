# Contacts 
## ``GET /api/contacts``

### Description
Returns the data from the endpoint [https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Contacts](https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Contacts).

### Example Request
```bash
curl --request GET \
  --url http://localhost:3000/api/contacts \
  --header 'sessioncookie: INSERT_SESSION_HERE'
```

### Example Resolve
```json
{
	"error": false,
	"data": {
		"primaryData": {
			"contact": [
				"MotherName",
				"FatherName"
			],
			"relationship": [
				"Mother",
				"Father"
			],
			"type": [
				"Parent",
				"Parent"
			],
			"telephone": [
				"(111) 111-1111",
				"(222) 222-2222"
			],
			"phonetype": [
				"Cellular",
				"Cellular"
			],
			"liveswstudent": [
				true,
				true
			]
		},
		"householdData": {
			"name": [
				"Mother",
				"Father",
				"Me"
			],
			"type": [
				"Contact",
				"Contact",
				"Student"
			],
			"school": [
				"",
				"",
				"International Academy"
			],
			"status": [
				"",
				"",
				"A"
			]
		}
	}
}
```