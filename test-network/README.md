# Hyperledger Fabric Dev Network with Fablo

## Spin up the test network

> [!TIP]
> Use https://learn.microsoft.com/en-us/windows/wsl/install[WSL] if working in Windows.

```console
$ ./fablo up
```

By default, the `kv-node` chaincode is installed in `channel1`.


## Configure the network

Adjust `fablo-config.json` as desired.
Especially, adjust the `chaincodes` value.

All chaincodes can be found under the `chaincodes/` directory.
