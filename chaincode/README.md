# dummy node chaincode package: kv

A minimal Hyperledger Fabric chaincode implementing a key-value store with private data support.

## Functions

| Function | Args | Description |
|---|---|---|
| `put` | `key`, `value` | Stores a value on the ledger under the given key |
| `get` | `key` | Retrieves the value for a key from the ledger |
| `putPrivateMessage` | `collection` | Stores a `message` from transient data into a private data collection |
| `getPrivateMessage` | `collection` | Reads the `message` from a private data collection |
| `verifyPrivateMessage` | `collection` | Verifies that a transient `message` matches the hash stored in a private data collection |
