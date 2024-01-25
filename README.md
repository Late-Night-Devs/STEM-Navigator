# STEM-Navigator
Capstone Project for Portland State University FW23

Team Members:  Anh Ho, Dan Ha, Daniel Tran,
               Linh Nguyen, Matej Bozic, Wes Wolf
Team Lead:     Nicholas Nguyen
Supervisor:    Bruce Irvin
Sponsor:       Tong Zhang


The purpose of this project is to create a curriculum navigator for current
and future students who are interested in STEM fields.
The main function is for this navigator to direct students towards services,
camps, courses, and other similar offerings all from within one web application.


# How to run the application:
- `cd` into the correct directory before each part, or open the terminal/command
prompt right in the correct directory __before__ each part.
Directions for how to do the latter are below:
- [Windows](https://docs.google.com/document/d/1q8bqvd6FhOafz8Zxq68hQeaFpCEWgvlNUS7upZFeFrc/edit#heading=h.mids18vkm5wp)
- [Mac](https://support.apple.com/guide/terminal/open-new-terminal-windows-and-tabs-trmlb20c7888/mac )

Copy and paste the `commands` into the terminal while in the correct directory.

## Database ( db-dump )
- First, start the Docker app (setup instructions are [here](https://docs.google.com/document/d/1q8bqvd6FhOafz8Zxq68hQeaFpCEWgvlNUS7upZFeFrc/edit#heading=h.g7oil7w2sfn3))
- Set up the database container in Docker: `docker compose up -d`
- Create and fill the database: `docker exec -i db mysql -uroot -pmy-secret db < stem_navigator.sql`

## Back End
- Install [Node.js](https://nodejs.org/en/download/) if you don't already have it
  - All the default options are fine, no need to change the given settings
  - You will need administrator credentials to install this
- Install the necessary dependencies: `npm i`
- Start the web app backend: `node server.js`
- __KEEP THIS TERMINAL OPEN__ while exploring the web app to keep the backend "server" running

## Front End:
- - Install the necessary dependencies: `npm i`
  - You may see warnings about vulnerabilities. These should not affect the web app's
  performance and can be ignored. We are working on those.
- Start the web app: `npm start`
- __KEEP THIS TERMINAL OPEN__ while exploring the web app as this is what is actually running the app
