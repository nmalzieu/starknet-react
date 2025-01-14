# `@starknet-react/core`

StarkNet React is a collection of React hooks for StarkNet.

## Installation

```
npm install @starknet-react/core
# or
yarn add @starknet-react/core
```

## Documentation

Documentation [is available online](https://apibara.github.io/starknet-react/).

## Development

Start by installing `pnpm`, then run:

```
pnpm install
```

Running tests requires to have `starknet-devnet` running locally.
The easiest way is to use docker with:

```
docker run --rm -p 5050:5050 shardlabs/starknet-devnet:latest
```

After that, you can run tests with `pnpm test`.
