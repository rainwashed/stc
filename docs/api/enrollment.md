# Enrollment
## ``GET /api/enrollment``

### Description
Returns the data from the endpoint [https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/SPDynamic_346](https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/SPDynamic_346).

### Example Request
```bash
curl --request GET \
  --url http://localhost:3000/api/enrollment \
  --header 'sessioncookie: INSERT_SESSION_HERE'
```

### Example Resolve
```json
{
	"error": false,
	"data": {
		"mainInformation": {
			"currentschool": "International Academy",
			"registrationdate": "00/00/0000",
			"grade": "0",
			"graduationyear": "2026",
			"counselor": "LastName, FirstName",
			"careerplan": null,
			"residentdistrict": "City",
			"membership": null,
			"schoolofchoice": "International Academy",
			"geocode": "NoPromote",
			"pickupbus": "Drop Off Bus",
			"dropoffbus": null,
			"legalbindings": null,
			"restrictedinformation": null,
			"schoolnotes": null
		},
		"lockerInformation": {
			"id": "PW2443",
			"lockertype": "Virtual East",
			"location": "Z Passwords",
			"combo": "00-00-00"
		},
		"enrollmentInformation": {
			"school": "8403 - International Academy",
			"track": "E",
			"year": "22/23",
			"status": "A",
			"grade": "0",
			"entrydate": "00/00/00",
			"exitdate": null,
			"advisor": "LastName, FirstInitial",
			"counselor": "LastName, FirstInitial"
		}
	}
}
```