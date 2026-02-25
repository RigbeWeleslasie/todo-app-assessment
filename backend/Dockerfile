FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev libmariadb-dev zip unzip

RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath
RUN echo "Listen 8000" > /etc/apache2/ports.conf
RUN a2enmod rewrite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

RUN chmod -R 775 storage bootstrap/cache

COPY .docker/apache.conf /etc/apache2/sites-available/000-default.conf

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

EXPOSE 8000

CMD php artisan config:cache && php artisan migrate --force && apache2-foreground