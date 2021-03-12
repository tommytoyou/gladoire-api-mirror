# gladoire-api
Backend API for Gladoire2/GA P3 for JC North and Tom Erickson
## Updates:
- Auth routes are tested and working in Main
- Journal routes are tested and working in Main

I hate herok!!!

## Setup:
- Clone repo
- CD into directory
- Get node modules (npm i)  
- checkout new branch (just in case) git checkout -b "new branch name"
- create a .env in the root directory with the following content:
  MONGO_URL=MONGO_URL=mongodb://localhost:27017/gapi_scratch
  
  JWT_SECRET=kld8vcjmkdcfjklvjaalksxcj98u2jwkljnbhgvbcjvxcxccsdiuxzcp
  
  PORT=9393
  
- run node seeds/seed-user.js (add/update a user for yourself if you like)
- run node seeds/seed-discussions.js (this will populate the categories, one post per category, and at least one comment per post)

- start with node app.js