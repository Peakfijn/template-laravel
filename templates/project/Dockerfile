# build the frontend in separate stage
FROM node:12 as frontend
WORKDIR /app
COPY . ./
RUN npm ci && npm run production

# build the backend in separate stage
FROM composer:1.10 as backend
WORKDIR /app
COPY . ./
RUN composer global require hirak/prestissimo && \
	composer install --ignore-platform-reqs

# build server in separate and final stage
FROM php:7.4-apache
RUN apt-get update && \
	apt-get upgrade -y && \
	apt-get install -y \
		libfreetype6-dev \
		libjpeg62-turbo-dev \
		libonig-dev \
		libpng-dev \
		libpq-dev \
		libxml2-dev \
		libzip-dev \
		zip \
	&& rm -r /var/lib/apt/lists/*

# install required laravel system dependencies
RUN docker-php-ext-install \
	bcmath \
	ctype \
	gd \
	json \
	pdo \
	pdo_mysql \
	tokenizer \
	xml \
	zip

# set up apache
ENV PORT 8000
RUN a2enmod rewrite headers && \
	echo "Listen \${PORT}" > /etc/apache2/ports.conf && \
	echo "\
		ServerName project-slug.peakfijn.ws \n\
		ServerAdmin tech@peakfijn.nl \n\
		DocumentRoot /var/www/html/public \n\
	" > /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html
# copy all source files
COPY . ./
# copy all built frontend files
COPY --from=frontend /app/public ./public
# copy all built backend files
COPY --from=backend /app/bootstrap ./bootstrap
COPY --from=backend /app/vendor ./vendor
# set all file permissions (see: https://laracasts.com/discuss/channels/general-discussion/laravel-framework-file-permission-security)
RUN find . -type f -exec chmod 644 {} \; && \
	find . -type d -exec chmod 755 {} \; && \
	chown -R www-data:www-data ../ && \
	chmod -R ug+rwx \
		storage \
		bootstrap/cache

USER www-data
CMD ["apachectl", "-DFOREGROUND"]
