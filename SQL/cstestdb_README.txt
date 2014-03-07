Username: crowdsocial
Password: pooreview

Steps to set up the Crowd Social DB:

1. Log in to mysql using your root/admin user.

2. Create user "crowdsocial" and give that user ALL permissions.

	CREATE USER 'crowdsocial'@'localhost' IDENTIFIED BY 'pooreview';

	GRANT ALL PRIVILEGES ON *.* TO 'crowdsocial'@'localhost' WITH GRANT OPTION;

2. Log in to mysql with "crowdsocial"

	mysql -u crowdsocial -ppooreview

3. Create a blank database named "cstestdb".

	CREATE DATABASE cstestdb

4. Quit mysql and import the database.

	mysql -u crowdsocial -ppooreview cstestdb < cstestdb.sql


To Access the DB:

	mysql -u crowdsocial -ppooreview cstestdb