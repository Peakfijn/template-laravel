ARG NODE_VERSION="12"
ARG PACKAGE_VERSION="latest"

FROM node:$NODE_VERSION-alpine

LABEL name="Semantic release for Laravel - Peakfijn"
LABEL repository="https://github.com/peakfijn/template-laravel"
LABEL homepage="https://github.com/Peakfijn/template-laravel/tree/develop/packages/laravel-semantic-release"
LABEL maintainer 'Cedric van Putten <me@bycedric.com>'

RUN apk add --no-cache git openssh-client \
	&& npm install -g @peakfijn/laravel-semantic-release@$PACKAGE_VERSION \
	&& npm cache rm --force
