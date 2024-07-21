# bustawin's website

This is the code powering [bustawin’s website](https://busta.win).
It is a (hopefully good) example of a not very complicated application running Remix.

Checkout [this blog post describing how the website works and the code is architectured](https://busta.win/posts/building-blog).

## Installing

1. Install a recent node and npm.
2. Git-clone this project.
3. Install the dependencies by executing `./install`.

## Developing

1. [Install the project](#installing).
2. Run `npm run dev` to start a local development server.

## Generating a build

1. [Install the project](#installing).
2. Run `npm run build` to generate a production build.

Additionally, you can `npm run start` to run the production build.

## Running in production

I run this blog using docker and through a cloudflare tunnel, which
connects the server to the Internet.

1. Install docker.
2. [Generate a build](#generating-a-build).
3. Create a cloudflare [Zero Trust tunnel](https://busta.win/posts/building-blog).
4. Copy the `.tunnel.env.example` as `.tunnel.dev` and add the token from the Zero Trust tunnel.
5. Run `npm run build-pro-restart` to start the server in production mode.

Every time you change code you have to generate a new build and run `npm run build-pro-restart`
to pick up the build.

Automating this process would be premature for now, sorry.

## Blogging

You can add or modify blog entries without restarting the server, as
they are picked up instantly (refresh the page).

## License

* [License](https://busta.win/about#License).
* [Credits](./CREDITS.txt).