# Hyperledger Fabric Dev Network with Fablo

> [!IMPORTANT]
> The test network will not work with the default configuration unless one of the `chaincode-*/` directories in the repository root become `chaincode/`.
> See the [README](../README.md).


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
