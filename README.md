How to prepare a development Environment for ReactJS using docker
=====================================================
This project is to prepare a development environment for ReactJS.

Docker
-------
Let's start the development with Docker, I'm just amazed with the possibilities and the power of the containers that Docker can offer.

## Installing Docker Engine:
My OS of preference is Linux Mint but you can install docker engine at any Operational Sistem using the instructions at their official page: 

https://docs.docker.com/engine/installation/

*Also is important to install docker-compose:*

https://docs.docker.com/compose/install/

Save all files inside your project folder and create the structure of folders and files as follows:
## Project folder
```
.
+-- src
|   +-- index.html
|   +-- js
|       +-- client.js
+-- package.json
+-- webpack.config.js
+-- docker.nodejs
+-- docker-compose.yml
```


Download the package.json and webpack.config.js
------------------------------------------------
you can find them here:

https://goo.gl/jcPxOM - package.json

https://goo.gl/3fN3CL - webpack.config.js

Creating the Dockerfile
---------------------------
I like to use custom names for my Dockerfiles so in this case I'm going to save my file as docker.nodejs:
```
# docker.nodejs (tag: v3)

FROM node

# Create App dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
#RUN npm config set registry http://registry.npmjs.org/ && npm install

# Install app dependencies
COPY package.json /usr/src/app/
#RUN npm install -g webpack webpack-dev-server
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Expose port
EXPOSE 8080

# Default command to run
CMD [ "npm", "start" ]
```
Now is time to create our docker-compose.yml file:
----------------------------------------------------

```
version: '2'

services:
  webpack:
    build: 
      context: .
      dockerfile: docker.nodejs
    image: my-webpack
    container_name: react-webpack
    ports:
      - "80:8080"
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
```

## Lets work at the files:    
Create index.html as follows:
```
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>React Tutorials</title>
	<link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css" type="text/css" rel="stylesheet">
</head>
<body>
	<div id="app"></div>
	<script src="client.min.js"></script>
</body>
</html>
```
and the client.js like this:
```
import React from "react";
import ReactDOM from "react-dom";

class Layout extends React.Component {
		constructor(){
			super();
			this.state = {
				title: "Welcome to React!",
			}
		}
		render() {
		return (<h1>{this.state.title}</h1>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);
```
*With all set is just a matter to run the command:*
`sudo docker-compose up --build`

*Check the result on your browser at http://localhost*

*You can also use the hot realad at http://localhost/webpack-dev-server/index.html*


