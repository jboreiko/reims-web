#!/bin/bash

set -e

pids=`ps -ef | grep node | head -n 2 | awk '{print $2}'`

count=${#pids[@]}

if [ "$count" -eq 2 ]; then
    for i in $pids; do
	echo "Killing $i"
	kill $i
    done
else
    echo "Node not running"
fi
