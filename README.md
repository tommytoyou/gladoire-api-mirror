# gladoire-api
Backend API for Gladoire2/GA P3 for JC North and Tom Erickson

## Setup:
- Clone repo
- CD into directory
- Get node modules (npm i)  
- checkout new branch (just in case) git checkout -b "new branch name"
- create a .env in the root directory with the following content:
  MONGO_URL=MONGO_URL=mongodb://localhost:27017/gapi_scratch
  JWT_SECRET=kld8vcjmkdcfjklvjaalksxcj98u2jwkljnbhgvbcjvxcxccsdiuxzcp
  PORT=9393
  
- run seeds/seed-user.js (add/update a user for yourself if you like)
- run seeds/seed-discussions.js

- start with node app.js