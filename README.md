prerender-mongo-cache
=======================

Prerender plugin for MongoDB caching, to be used with the prerender node application from [prerender](https://github.com/prerender/prerender)

How it works
------------

This plugin will store all prerendered pages into a MongoDB instance. There is currently no expiration functionality, which means that once a page is stored, future requests for prerendering a page will always be served from from the database cache if it's available and the page caches are never updated.
By default it will connect to your MongoDB instance running on localhost and use the `pages` collection in `prerender` database. 

How to use
----------

In your local prerender project run:

    $ npm install prerender-mongo-cache --save
    
Then in the server.js that initializes the prerender:

    server.use(require('prerender-mongo-cache'));
    
How to update stored cache
--------------------------
Just change the HTTP `GET` method to `POST` or `PUT` ,then prerender will re spider it and cache it.


