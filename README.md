# STEM-Navigator
Capstone Project for Portland State University FW23

Team Members:  Anh Ho, Dan Ha, Daniel Tran,
               Linh Nguyen, Matej Bozic, Wes Wolf
Team Lead:     Nicholas Nguyen
Supervisor:    Bruce Irvin
Sponsor:       Tong Zhang


The purpose of this project is to create a curriculum navigator for current
and future students who are interested in the STEM field.

The main function is for this navigator to direct students towards services,
camps, courses, and other similar offerings all from within one web application.


# How to run the application:
- `cd` into the correct directory before each part

## Front End:
- `npm i`
- `npm start`

## Back End
- `npm i `
- `node server.js`
  
## Database ( db-dump )
- Running the docker app first
- Build n run the docker compose file: `docker compose up -d`
- Create tables and feed data: `docker exec -i db mysql -uroot -pmy-secret db < stem_navigator.sql`
