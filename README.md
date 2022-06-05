1 client

2 api gateway

3 short url `redirects short url to long url`
  - looks up bucket sub folder with short url name
  - (if) bucket sub folder exists use content of bucket to redirect to long url (end)
  - (else) 404

4 long url `creates short url from long url`
  - covert long url to short url
  - look up short url in s3 bucket sub folder
  - (if) short url exists return short url (end)
  - (else) create bucket sub folder using short url
  - write long url inside created sub folder
  - return short url
