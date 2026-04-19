#!/bin/sh -euC
#
# cc.sh — Convenience wrapper for invoking chaincode via the peer CLI.
#
# Usage:
#   ./scripts/cc.sh [-vdh] [-c channel] <chaincode> query  <function> [arg1 arg2 ...]
#   ./scripts/cc.sh [-vdh] [-c channel] <chaincode> invoke <function> [arg1 arg2 ...]
#
# Options:
#   -v            Verbose: show the request being sent and the response
#   -d            Debug: like -v, plus full peer CLI output (gRPC logs, etc.)
#   -h            Help: display usage
#   -c <channel>  Channel: specify channel instead of the default CHANNEL (see script)
#
# Examples:
#   ./scripts/cc.sh query ping
#   ./scripts/cc.sh invoke put mykey myvalue
#   ./scripts/cc.sh -v query readValueFromKey mykey

CLI_CONTAINER=cli.org1.example.com
CHANNEL=my-channel1
CHAINCODE=tpcc
PEER_ADDRESS=peer0.org1.example.com:7041
ORDERER_ADDRESS=orderer0.group1.orderer.example.com:7030
ORDERER_TLS_CA=/var/hyperledger/cli/crypto-orderer/tlsca.orderer.example.com-cert.pem
ROOT_CA=/var/hyperledger/cli/crypto-peer/peer0.org1.example.com/tls/ca.crt

VERBOSITY=0  # 0=quiet, 1=verbose, 2=debug

usage() {
	>&2 echo "usage: $0 [-vdh] [-c channel] <chaincode> <query|invoke> <function> [args...]"
}

while getopts ':vdhc:' opt; do
case "$opt" in
v) VERBOSITY=1;;
d) VERBOSITY=2;;
h) >&2 usage; exit 0;;
c) CHANNEL="$OPTARG";;
:) >&2 echo "$0: option -$OPTARG requires an argument"; usage; exit 1;;
?) >&2 echo "$0: unknown option -$OPTARG"; usage; exit 1;;
esac
done
shift $((OPTIND - 1))

QUIET_ARGS=
[ "$VERBOSITY" -ge 2 ] || QUIET_ARGS='-e FABRIC_LOGGING_SPEC=ERROR'

[ $# -ge 3 ] || { usage; exit 1; }

CHAINCODE="$1"
MODE="$2"
FUNC="$3"
shift 3

# Build the Args JSON array from remaining arguments.
# Each arg is JSON-escaped (inner quotes become \") before wrapping in "...".
ARGS_JSON='['
first=true
for arg in "$@"; do
	if [ "$first" = true ]; then
		first=false
	else
		ARGS_JSON="${ARGS_JSON},"
	fi
	escaped=$(printf '%s' "$arg" | sed 's/\\/\\\\/g; s/"/\\"/g')
	ARGS_JSON="${ARGS_JSON}\"${escaped}\""
done
ARGS_JSON="${ARGS_JSON}]"

INPUT="{\"function\": \"${FUNC}\", \"Args\": ${ARGS_JSON}}"

if [ "$VERBOSITY" -ge 1 ]; then
	echo ">>> $MODE $CHAINCODE/$FUNC on $CHANNEL"
	echo ">>> $INPUT"
fi

case "$MODE" in
query)
	docker exec $QUIET_ARGS "$CLI_CONTAINER" peer chaincode query \
	    -C "$CHANNEL" \
	    -n "$CHAINCODE" \
	    -c "$INPUT"
	;;

invoke)
	docker exec $QUIET_ARGS "$CLI_CONTAINER" peer chaincode invoke \
	    -C "$CHANNEL" \
	    -n "$CHAINCODE" \
	    -c "$INPUT" \
	    -o "$ORDERER_ADDRESS" \
	    --tls \
	    --cafile "$ORDERER_TLS_CA" \
	    --peerAddresses "$PEER_ADDRESS" \
	    --tlsRootCertFiles "$ROOT_CA" \
	    --waitForEvent
	;;

*)
	usage
	exit 1
	;;
esac
