This is a demo how to use the strecken.info API (inofficial!) by DB Netz.

## Setup Notes

Put the HTML and JavaScript files to your web server. Due to the CORS policy
of most modern browsers, you have to do some HTTP header fiddling. There are
two options:

* You set up a virtual host with Apache which is a reverse proxy and adds
the `Access-Allow-Origin: *` header. You have to enable the modules *proxy*, *proxy_http* and *headers*.

```Apache
    Header set Access-Control-Allow-Origin "*"
    ProxyPass /bin/ http://db-livemaps.hafas.de/bin/
    ProxyPassReverse /bin/ http://db-livemaps.hafas.de/bin/
```

* You set up a virtual host with Apache which is a reverse proxy and is
accessible under the same hostname as the demo. You have to enable the modules *proxy* and *proxy_http*.

```Apache
    ProxyPass /bin/ http://db-livemaps.hafas.de/bin/
    ProxyPassReverse /bin/ http://db-livemaps.hafas.de/bin/
```


## License

see [LICENSE](LICENSE) file
