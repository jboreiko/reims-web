#!/bin/bash

set -e

cd prod

echo "Pulling the latest release"
latest=`curl -s https://api.github.com/repos/jboreiko/reims-web/releases | grep browser_download_url | head -n 1 | cut -d '"' -f 4`
curl -L $latest > reims-web.zip

echo "Uncompressing the prod server"
unzip -o reims-web.zip

echo "Killing old server"
/home/ubuntu/kill_node.sh

echo "Starting server - no protection against already running service"
nohup npm start &
cd -
tail -f prod/nohup.out
