# Special Chain Provider Usage

## Options

- `providers`: the list of providers to iterate over
- `parallelize`: if `true`, the requests to the providers will be sent at the same time (but the responses are checked in the order)
- `first`: if `true`, the result will be the one of the fastest provider to respond (the order does not matter)
