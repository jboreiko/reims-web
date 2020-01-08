# reims-web
Richmond Eyeglass Inventory Matching System Web Version

# General Architecture
CouchDB - running on the server (this is the canonical copy)
Each web client loads up a local PouchDB instance and syncs it in preperation for offline usage.
All changes are sync'd if online otherwise stored for sync later

# Installation
Install CouchDB to server (and start)
npm install
bower install

# Installation onto AWS ubuntu
sudo apt-get update
sudo apt-get install emacs
sudo apt-get install nginx
sudo apt-get install nodejs
sudo apt-get install npm
git clone <reims>
cd reims-web
npm install
sudo apt-get install node-grunt-cli
grunt build

follow https://linuxize.com/post/how-to-install-couchdb-on-ubuntu-18-04/ except add it to sources.list.d/couchdb.list

configure nginx


# Run
install git
install node
install grunt-cli
npm start

# Wireframes
http://framebox.org/vxXl

