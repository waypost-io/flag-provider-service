<p align="center">
    <img src="" alt="Waypost logo" width="200" height="200">
</p>

The waypost flag provider is an express app that accepts SSE connections to serve real-time feature flag updates to clients using Waypost SDKs. The Waypost flag provider stays up to date by recieving webhooks from the Waypost Feature Flag managment application.

## Usage
Waypost flag provider subscribes to webhooks from the waypost feature flag manager app that are received whenever edits are made to flags or the SDK key.

Clients send a request to connect to the Waypost flag provider via a server-sent events (SSE) connection. The Waypost flag provider verifies that the client is allowd to connect by comparing the SDK key that was sent from the client, with the SDK key that is stored on the flag provider. Once a client is authenticated, they will receive real-time updates of feature flag data.

To learn more about Waypost, visit our [case study page]().

## Setup
1. Clone the Waypost flag provider repository.
```
git clone https://github.com/waypost-io/waypost-flag-provider.git
cd waypost-flag-provider
```
2. Install dependancies
```
npm install
```
3. Add a .env file to the root directory with the following content:
```
WEBHOOK_VALIDATOR="secret"
FEATURE_FLAG_MANAGER_URL="http://localhost:5000"
```
4. Start the application
```
npm start
```
  The waypost flag provider app runs on port `:5050`
  
### NOTE
The Waypost flag provider must run adjacent to a running [Waypost feature flag manager app](https://github.com/waypost-io/waypost).
