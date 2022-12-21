# Demographic
## ``GET /api/demographic``

### Description
Returns the data from the endpoint [https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Demographic](https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Demographic).

### Example Request
```bash
curl --request GET \
  --url http://localhost:3000/api/demographic \
  --header 'sessioncookie: INSERT_SESSION_HERE'
```

### Example Resolve
```json
{
	"error": false,
	"data": {
		"name": "Student Name",
		"localid": "0000000",
		"nickname": null,
		"stateid": "00000000000",
		"birthdate": "05/01/2008",
		"school": "International Academy",
		"age": "int",
		"counselor": "LastName, FirstName",
		"birthplace": "US",
		"": null,
		"birthverificationdoc": null,
		"verificationdoc": null,
		"maritalstatus": null,
		"migrantnumber": null,
		"hispanic/latino": "No",
		"race": "Race",
		"englishproficiency": null,
		"primarylanguage": null,
		"homelanguage": null,
		"homeaddress": "123 Example Street",
		"mailingaddress": null,
		"addressverified": null,
		"primaryphone": "(111) 111-1111 [Residence]",
		"email": "example@bloomfield.org"
	}
}
```