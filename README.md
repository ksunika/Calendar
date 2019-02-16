This is a take-home assignment based on the [create-react-app-typescript-node](https://github.com/dannycochran/create-react-app-typescript-node).

The task was to create a Calendar UI that displays Netflix Original launches using data served from a Node.js server.


To run, first:

```sh
yarn install
```
Please make sure that all the dependencies are met.
After that start the server:

```sh
yarn run server
```

Wait until the server is ready and start the client:

```sh
yarn run client
```

This builds create-react-app-typescript, and proxies requests to the node server. Any changes
to the client will be handled by create-react-app and you still get hot module reloading.

Any changes to the server will cause the server to restart so you can test API changes.
