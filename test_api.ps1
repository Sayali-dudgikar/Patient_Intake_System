$body = @{symptoms="severe chest pain"} | ConvertTo-Json
$result = Invoke-RestMethod -Uri "http://localhost:8000/analyze-symptoms" -Method Post -ContentType "application/json" -Body $body
$result | ConvertTo-Json
