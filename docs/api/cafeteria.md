# Cafeteria 
## ``GET /api/cafeteria``

### Description
Returns the data from the endpoint [https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Cafeteria](https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/Cafeteria).

### Example Request
```bash
curl --request GET \
  --url http://localhost:3000/api/cafeteria \
  --header 'sessioncookie: INSERT_SESSION_HERE'
```

### Example Resolve
```json
{
	"error": false,
	"data": {
		"summary": {
			"charges": 3.9,
			"payments": 0,
			"balance": -3.9
		},
		"detail": [
			{
				"date": "10/26/2022",
				"description": "HS Home Zone 3.90",
				"location": "IA Drawer 1",
				"charge": "3.90",
				"payment": "0.00"
			}
		]
	}
}
```