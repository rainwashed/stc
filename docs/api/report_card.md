# Report Cards
## ``GET /api/report_cards``

### Description
Returns the data from the endpoint [https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/SPDynamic_409](https://studentconnect.bloomfield.org/studentportal/Home/LoadProfileData/SPDynamic_409).

### Example Request
```bash
curl --request GET \
  --url http://localhost:3000/api/report_cards \
  --header 'sessioncookie: INSERT_SESSION_HERE'
```

### Example Resolve
```json
{
	"error": false,
	"data": [
		{
			"title": "Marking Period 2 Progress Report",
			"notes": "shorthand_school_name",
			"document": "pdf_link",
			"school": "Progress Report 2 (P2)",
			"undefined": "school_name"
		},
	]
}
```