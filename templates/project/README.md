# Project-Name

- [Project Notes](#markdown-header-project-notes)
- [Getting started](#markdown-header-getting-started)
- [Deploy to Heroku](#markdown-header-deploy-to-heroku)
- [Local to web](#markdown-local-to-web)
- [Coding rules](#markdown-header-coding-rules)
- [Commit guidelines](#markdown-header-commit-guidelines)


## Project notes

_none_


## Getting started

To get up and running and start developing, follow the steps below.

1. Copy and fill the dotenv file from `.env.example` to `.env`
2. Install composer dependencies using `composer install`
3. Install node dependencies using `npm install` (or `npm ci`)
4. Create a development front end bundle with `npm run build`
5. Start the project with `docker-compose up`

### Performance gains

Binding volumes to MacOS or Windows systems might slow node down, you can work around that.

1. Follow the **Getting started #1..#4** steps
2. Make sure hostname `database` connects to your docker host (e.g. add `database` in your host file as `127.0.0.1`)
3. Start Postgres in background using `docker-compose up -d database`
4. Start Laravel with `composer start -- --host=0.0.0.0 --port=<PORT>`

### Troubleshooting project

Laravel apps can be complex projects; a lot of things can go wrong.
Here are some steps to quickly reset your local environment to start all over again.

1. Make sure you followed the **Getting started** steps
2. Double check the `.env` file
3. Remove `./vendor` and reinstall composer dependencies with `composer install`
4. Remove `./node_modules` and reinstall composer dependencies with `npm install` (or `npm ci`)
5. Rebuild containers with `docker-compose up --force-recreate`

## Deploy to Heroku

You can use a custom Heroku project to test your changes without pushing to testing/staging/production.
To get started, see Heroku's documentation about the [Heroku CLI][link-heroku-cli].

```bash
$ heroku login

// build the image yourself and push to Heroku
$ heroku container:login
$ heroku container:push --app <NAME> web
$ heroku container:release --app <NAME> web

// you can also let Heroku build the image
$ git push heroku master --app <NAME>

// finish the app by enabling the mpm fix and set the stack to container
$ heroku labs:enable --app <NAME> runtime-new-layer-extract
$ heroku stack:set container
```

### Troubleshooting Heroku

If there are issues with your deployment, you can access the logs from Heroku.

```bash
$ heroku logs --tail --app <NAME>
```

### "SSH" into Heroku

While it's not possible to SSH or tunnel into the server, _you can start a dyno-process with bash_.
This allows you to perform commands in the same environment as the server, with attached services like database and cache.
All you have to do is running the following command.

```bash
$ heroku run --app <NAME> bash
```

> The shell executes in a separate server, and thus the server itself is not affected by these changes.

### Local to web

When you need to test an external service connecting to the server, you need to make your local machine available.
You can use ngrok for this to create a secure tunnel between your computer and a publicly accessible endpoint.

```bash
$ ngrok start --config ./ngrok.yml web
```

> Make sure you copied `ngrok.example.yml` to `ngrok.yml` and set the appropiate settings


## Coding rules

Be a good colleague and make your code predictable by adhering to our shared coding rules.

- Follow the [Airbnb JavaScript style guide][link-airbnb-js]
- Follow the [PSR-12 PHP style guide][link-psr-12]
- Use **tabs** for _indentation_, **spaces** for _alignment_
- Make sure the automated tests (CI) are running successfully
- **WRITE TESTS**


## Commit guidelines

Make sure you follow the [Conventional Commits][link-convcomm] rules when formatting your commit messages.

> You can view the most up-to-date version of these guidelines in the [Peakfijn Conventions][link-peakfijn-commits] repository.

[link-airbnb-js]: https://github.com/airbnb/javascript
[link-convcomm]: https://www.conventionalcommits.org
[link-heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli#download-and-install
[link-peakfijn-commits]: https://github.com/Peakfijn/Conventions/tree/develop/packages/commit-types-peakfijn
[link-psr-12]: https://github.com/php-fig/fig-standards/blob/master/proposed/extended-coding-style-guide.md
