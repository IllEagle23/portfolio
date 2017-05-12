# Portfolio app
_An Angular JS project for creating a responsive UX Development portfolio._

# Project dependencies
* Install [nodejs](https://nodejs.org/en/download/)
* Install [bower](https://bower.io/)

# Project development dependencies
* Install [grunt](https://gruntjs.com/installing-grunt)

# Project start
* Open a terminal window and navigate to the project directory.
* Run `sudo npm start`
* This will install all the node modules and bower components package dependencies for running the app as well as the dev environment. You will need to enter your password for the packages to install properly.
* Once all the dependencies are installed npm will automatically start a web server for hosting the app.
* The app will then be accessible in your browser at localhost:8400 [here](http://localhost:8400/).
* The git repo does not contain the video files I created for my portfolio, so the video player will break without them.

# Project testing
* Run `npm test` for unit tests
* Run `npm run protractor` for e2e tests

# Grunt task definition
* Watch for file changes
* File concatenation
* LESS to CSS compilation
* Minification
* Copy files to distro
