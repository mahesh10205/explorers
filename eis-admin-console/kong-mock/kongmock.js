// include dependencies
var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

// Alert Service
{
    ALERT_HOST = process.env.ALERT_HOST || undefined;
    ALERT_PORT = process.env.ALERT_PORT || undefined;
    ALERT_PROTOCOL = process.env.ALERT_PROTOCOL || 'http';

    if (ALERT_HOST !== undefined && ALERT_PORT !== undefined) {
        let targetUrl = ALERT_PROTOCOL + '://' + ALERT_HOST + ':' + ALERT_PORT;

        var alertOptions = {
            target: targetUrl, // target host
            changeOrigin: true, // needed for virtual hosted sites
            ws: true,          // proxy websockets
        };
        var alertProxy = proxy(alertOptions);
        app.get('/alerts', alertProxy);
    }
}

// IDR Service
{
    IDR_HOST = process.env.IDR_HOST || undefined;
    IDR_PORT = process.env.IDR_PORT || undefined;
    IDR_PROTOCOL = process.env.IDR_PROTOCOL || 'http';

    if (IDR_HOST !== undefined && IDR_PORT !== undefined) {
        let targetUrl = IDR_PROTOCOL + '://' + IDR_HOST + ':' + IDR_PORT;

        var idrOptions = {
            target: targetUrl, 
            changeOrigin: true,               
            ws: true,  
            pathRewrite: {
               '^/idr': '/eis/v1/imagingdevice/'
            },                       
        };
        var idrProxy = proxy(idrOptions);
        app.use('/idr', idrProxy);
    }
}

// ALC service
{
    ALC_HOST = process.env.ALC_HOST || undefined;
    ALC_PORT = process.env.ALC_PORT || undefined;
    ALC_PROTOCOL = process.env.ALC_PROTOCOL || 'http';

    if (ALC_HOST !== undefined && ALC_PORT !== undefined) {
        let targetUrl = ALC_PROTOCOL + '://' + ALC_HOST + ':' + ALC_PORT;

        var auditmessageconfigoptions = {
            target: targetUrl, 
            changeOrigin: true,               
            ws: true,  
            pathRewrite: {
               '^/eat-auditmessageconfig': '/eat-auditmessageconfig'
            },                       
        };
        var auditmessageconfigProxy = proxy(auditmessageconfigoptions);
        app.use('/eat-auditmessageconfig', auditmessageconfigProxy);

        var repositoryconfigurationOptions = {
            target: targetUrl, 
            changeOrigin: true,               
            ws: true,  
            pathRewrite: {
               '^/eat-repositoryconfiguration': '/eat-repositoryconfiguration'
            },                       
        };
        var repositoryconfigurationProxy = proxy(repositoryconfigurationOptions);
        app.use('/eat-repositoryconfiguration', repositoryconfigurationProxy);

        var repositoryconnectionOptions = {
            target: targetUrl, 
            changeOrigin: true,               
            ws: true,  
            pathRewrite: {
               '^/eat-repositoryconnection': '/eat-repositoryconnection'
            },                       
        };
        var repositoryconnectionProxy = proxy(repositoryconnectionOptions);
        app.post('/eat-repositoryconnection', repositoryconnectionProxy);
    }
}

// Admin Console Portal Service
{
    SERVER_HOST = process.env.SERVER_HOST || undefined;
    SERVER_PORT = process.env.SERVER_PORT || undefined;
    SERVER_PROTOCOL = process.env.SERVER_PROTOCOL || 'http';

    if (SERVER_HOST !== undefined && SERVER_PORT !== undefined) {
        let targetUrl = SERVER_PROTOCOL + '://' + SERVER_HOST + ':' + SERVER_PORT;

        var applicationsOptions = {
            target: targetUrl, // target host
            changeOrigin: true, // needed for virtual hosted sites
            ws: true,          // proxy websockets
            pathRewrite: {
                '^/applications': '/applications'
            },
        };
        var applicationsProxy = proxy(applicationsOptions);
        app.get('/applications', applicationsProxy);

        var kibantimezoneOptions = {
            target: targetUrl, 
            changeOrigin: true,   
            ws: true,           
            pathRewrite: {
                '^/kibana-timezone': '/timezone'
            },
        };
        var kibantimezoneProxy = proxy(kibantimezoneOptions);
        app.get('/kibana-timezone', kibantimezoneProxy);


        var kibanasearchOptions = {
            target: targetUrl, 
            changeOrigin: true, 
            ws: true,           
            pathRewrite: {
                '^/kibana-search': '/search'
            },
        };
        var kibanasearchProxy = proxy(kibanasearchOptions);
        app.get('/kibana-search', kibanasearchProxy);

        var pingOptions = {
            target: targetUrl, 
            changeOrigin: true,  
            ws: true,           
            pathRewrite: {
                '^/ping': '/ping'
            },
        };

        var pingProxy = proxy(pingOptions);
        app.get('/ping', pingProxy);

        var logOptions = {
            target: targetUrl,
            changeOrigin: true,  
            ws: true,           
            pathRewrite: {
                '^/log': '/log'
            },
        };

        var logProxy = proxy(logOptions);
        app.post('/log', logProxy);;

    }
}

//prometheus dashboard
{
    prometheus_HOST = process.env. prometheus_HOST || undefined;
    prometheus_PORT = process.env. prometheus_PORT || undefined;
    prometheus_PROTOCOL = process.env.prometheus_PROTOCOL || 'http';

    if (prometheus_HOST !== undefined && prometheus_PORT !== undefined) {
        let targetUrl = prometheus_PROTOCOL + '://' + prometheus_HOST + ':' + prometheus_PORT;

        var prometheusdashboardOptions = {
            target: targetUrl, 
            changeOrigin: true,               
            ws: true,  
            pathRewrite: {
                '^/prometheus-dashboard': '/prometheus-dashboard'
            },                       
        };
        var prometheusDashboardProxy = proxy(prometheusdashboardOptions);
        app.use('/prometheus-dashboard/', prometheusDashboardProxy);
    }
}

// Admin Console Portal Client
{
    CLIENT_HOST = process.env.CLIENT_HOST || undefined;
    CLIENT_PORT = process.env.CLIENT_PORT || undefined;
    CLIENT_PROTOCOL = process.env.ALERT_PROTOCOL || 'http';

    if (CLIENT_HOST !== undefined && CLIENT_PORT !== undefined) {
        let targetUrl = CLIENT_PROTOCOL + '://' + CLIENT_HOST + ':' + CLIENT_PORT;

        var adminConsoleOptions = {
            target: targetUrl, 
            changeOrigin: true,               
            ws: true,  
            pathRewrite: {
                '^/': '/'
            },                       
        };
        var adminConsoleProxy = proxy(adminConsoleOptions);
        app.use('', adminConsoleProxy);
    }
}

app.listen(3001);