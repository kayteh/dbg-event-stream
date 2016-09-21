# Daybreak Games Event Stream

This library is designed for Planetside 2's event websocket/api, and was directly extracted from the Harasser Derby overlay, a.k.a. DBOX. It provides a transparent EventEmitter and filters by server since the intern that made the system didn't do this for us.

**This library is a WIP.** There are no guarantees to it working for your case. If you need things to work, make a pull request. This currently only works for `VehicleDestroy` events.

## Installing

```
npm install --save dbg-event-stream
```

## Debugging

If you need this library to output logs, set the environment variable `DES_LOGGING=true` to your project. If you want a crazy level of verbosity, also set `DES_DEBUG=true`

## Using

The simplest working example is:

```
const EventStream = require('dgb-event-stream')
const stream = new EventStream({world: 'Connery_1', eventNames: ['VehicleDestroy']})

process.env.SERVICE_ID = 'example'

stream.on('VehicleDestroy', (data) => {
	console.log('data', data.toJS())
})
```

This `EventStream.on(eventName, callback)` will emit every vehicle death as an [`Immutable#Map`](https://facebook.github.io/immutable-js/docs/#/Map).

The Census API service ID can be set with environment variables at the moment. This might change in the future.

## Options

`EventStream` takes a few options in an object as it's only argument:

- `world` - **Required** - The server name and ID in the format `Name_ID`. The full list can be found at the end of this document.

- `eventNames` - **Required** - An array of event names to subscribe to. [See this page for these values.](http://census.daybreakgames.com/#what-is-websocket)  
  *Note: Only VehicleDestroy works at this time.*

- `initialMode`- *Optional* - Can be either `socket` or `polling`. 

## Caveats

- `faction_id` in the payload is probably wrong. Don't trust it. Use another method of getting that value.
