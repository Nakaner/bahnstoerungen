This is a demo how to use the strecken.info API (inofficial!) by DB Netz.

## Setup Notes

Put the HTML and JavaScript files to your web server. Due to the CORS policy
of most modern browsers, you have to do some HTTP header fiddling. There are
two options:

* You set up a virtual host with Apache which is a reverse proxy and adds
the `Access-Allow-Origin: *` header. You have to enable the modules *proxy*, *proxy_http*, *headers* and *ssl*.
Forwarding to the DB server requires the usage of HTTPS because their server is HTTPS-only (redirects unencrypted HTTP requests to HTTPS).

```Apache
    Header set Access-Control-Allow-Origin "*"
    SSLProxyEngine on
    ProxyPass /bin/ https://db-livemaps.hafas.de/bin/
    ProxyPassReverse /bin/ https://db-livemaps.hafas.de/bin/
```


## License

see [LICENSE](LICENSE) file
