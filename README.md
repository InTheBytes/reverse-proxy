# Dev Reverse Proxy

## Setup instructions

1. For each micro-service, you need to add this to the launch configuration: `-Dserver.port=8082` (with different ports obviously).  
   This is what it looks like for IntelliJ [VM Options](https://i.stack.imgur.com/aPKg0.png) and Eclipse [VM arguments](https://i.stack.imgur.com/94l6E.png). This setting is just what launches the jar file.
   If you use the command line, you can launch using, example: `java -jar -Dserver.port=8082 accountservice-0.0.1-SNAPSHOT.jar`

2. Download extension: [Moesif Origin & CORS Changer](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc) and enable it when testing (sorry, you need Chrome :P)

3. Clone this repo

4. Install node modules `npm install`

5. Configure the `config.json` file. It is already preconfigured for user portal, will need to change to accommodate the other portals

5. Run the proxy server `npm start`

## Config.json explanation

* `baseUrl`: simulates the request for CORS. Change for each portal to the appropriate domain.
  
* `port`: the port the proxy server runs on. This will be the "API" access point for all local portals.

* `localUrl`: this is where the microservices reside on. This will almost always be localhost

* `routeTable`: an array of objects for each microservice

	* `port`: the port the microservice is running on. This should match the `Dserver.port` you've set up earlier.
	
	* `patterns`: an array of all the regex patterns to match. If matched, the request will be redirected to `localUrl:port/requested_url`
	
## Preconfigured microservices

* Search Service on port 8081

* Account Service on port 8082

* Restaurant Manager Service on port 8083

* Order Service on port 8084

* OpenAPI Service on port 8085


## Improvement

This was put together in a few hours.  
Some shortcomings of this proxy server is that redirects don't seem to be working properly.