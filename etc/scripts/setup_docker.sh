#!/bin/bash

COMMAND=$(basename $0)

cat <<EOF
export TARGET_HOST=$(docker-machine ip)
# run eval \$($COMMAND)
EOF

