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

# Run
npm start