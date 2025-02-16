# bustawin's website

This is the code powering [bustawin’s website](https://busta.win).
It is a (hopefully good) example of a not very complicated application running React Remix.

## Installing

1. Install a recent node and npm.
2. Git-clone this project.
3. Install the dependencies by executing `./install`.

## Developing
Developing the project requires this [node version](.node-version).

1. [Install the project](#installing).
2. Install [node-canvas](https://github.com/Automattic/node-canvas/wiki/Installation).
3. Install node packages by executing `npm install`.
4. Run `npm run dev` to start a local development server.

## Running in production

[I run this blog using docker and through a cloudflare tunnel, which connects the server to the
Internet](https://busta.win/posts/building-blog).

1. Install docker.
2. Create a cloudflare [Zero Trust tunnel](https://busta.win/posts/building-blog).
3. Copy the `.tunnel.env.example` as `.tunnel.dev` and add the token from the Zero Trust tunnel.
4. Run `npm run restart-docker` to generate a build and start the server in production mode.

* The server auto-picks up changes in posts without restarting, refresh the webpage after a change.
* Any change in code requires you to re-execute `restart-docker` to re-build.

You can build and run a production server without using docker by:

1. [Install the project](#installing).
2. Run `npm install`.
3. Run `npm run build` to generate a build.
4. Run `npm run start` to start the server in production mode.

## License

* [License](https://busta.win/about#License).
* [Credits](./CREDITS.txt).