# Dev Reverse Proxy

## Setup instructions

1. For each micro-service, you need to add this to the launch configuration: `-Dserver.port=8082` (with different ports obviously).  
   This is what it looks like for IntelliJ [VM Options](https://i.stack.imgur.com/aPKg0.png) and Eclipse [VM arguments](https://i.stack.imgur.com/94l6E.png). This setting is just what launches the jar file.
   If you use the command line, you can launch using, example: `java -jar -Dserver.port=8082 accountservice-0.0.1-SNAPSHOT.jar`

2. Clone this repo

3. Install node modules `npm install`

4. Configure the `config.json` file. It is already preconfigured for user portal, will need to change to accommodate the other portals

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

* Payment Service on port 8086

* Delivery Service on port 8087


## Improvement

This was put together in a few hours.  
Some shortcomings of this proxy server is that redirects don't seem to be working properly.


## Script Automation
A command line (cmd) script exists to run conveniently run the microservices along with the proxy - `stacklaunch`
It currently takes up to five arguments including: `restaurant`, `account`, `order`, `search`, `payment`, `delivery` and `swagger`

Providing no arguments will default to opening all services, but if arguments are provided only those services will run.
Each service will open in it's own window for tracking and debugging (and because its kind of the only way for this simple solution to work) - so not providing the specific services you want to run may be annoying.

This command needs to be made from the reverse-proxy folder, and relies on all of the projects to be reflective of the github organization with default directory names as would be pulled from github. The name of the root folder is inconsequential

Example:

InTheBytes:
* ---account-service
* ---order-service
* ---search-service
* ---restaurant-manage-service
* ---open-api-since
* ---payment-service
* ---delivery-service
* ---reverse-proxy (call command here)

*Note: There is a JVM versioning inconsistency currently that causes this script to fail for order-service and open-api with the current state of develop. Hotfixes are currently in place and awaiting a merge. Be advised

### Possible Changes
It would be nice to also have a script that closed all of them. But in the spirit of this repository, only patchy fix-it code is allowed here.
