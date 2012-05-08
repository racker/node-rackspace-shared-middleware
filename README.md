# Rackspace Express middleware

Shared Rackspace Express middleware.

## Available middleware

## Access Logger

Log express access attempts using logamgic.

## Transaction ID

Attaches transaction id to every request and return it in the response inside
the X-Response-Id header.

## Body size limiter

Middleware which limits the maximum size of the request body.

## Allow JavaScript XHR

A middleware which responds to any OPTIONS requests with a 204 and an Access control Response.
