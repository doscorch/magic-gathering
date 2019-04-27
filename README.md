# Hw4

This restful web application allows users to design decks of Magic the Gathering, (MTG), cards. Two roles are supported: admins and users. An admin will be able to created, edit, view, and search for users. Users will be able to view and search-for MTG cards as well as create, edit, view and search for their own MTG Decks. The MTG cards themselves are hosted on a 3rd party server. The API for this server is described at https://docs.magicthegathering.io/.

## Development server

Run `ng serve --proxy-config proxy.conf.json` in the client folder.
Run `npm start` in the server folder.

## Production server

Run `ng build` in the client folder.

Paste the dest folder's contents into the server's public folder

Run `sudo nohup npm start &` in the server folder.

## Build

Run `ng build` in the client folder.
Run `npm install` in the server folder.
