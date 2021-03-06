var http = require('http')
var express = require('express'),
cors = require('cors');
uuidv4 = require('uuid/v4');
bodyParser = require('body-parser')
app = express();
port = process.env.PORT || 3000;
const API_VERSION = '/api/v1/';
var pData = [];
var pnotfication = [];
// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.listen(port);

console.log('mock alert service API server started on: ' + port);

app.get('/getAlerts', (request, response) => {
    response.send(
        [{
            "alert": "K8SKubeletDown",
            "appID": "k8s",
            "description": "kubelet down",
            "severity": "warning",
            "alertstate": "firing",
            "count": "1",
            "timestamp": "Sun, 29 Apr 2018 04:47:12 GMT"
        },
        {
            "alert": "grafanaAlert",
            "appID": "grafana",
            "description": "Server down",
            "severity": "warning",
            "alertstate": "firing",
            "count": "1",
            "timestamp": "Sun, 29 Apr 2018 04:47:12 GMT"
        },
        {
            "alert": "helloworld",
            "appID": "hello.world",
            "description": "hello world application notification",
            "severity": "critical",
            "alertstate": "warning",
            "count": "1",
            "timestamp": "Sun, 29 Apr 2018 04:47:12 GMT"
        },
        {
            "alert": "kibana",
            "appID": "kibana",
            "description": "kibana-data not received",
            "severity": "warning",
            "alertstate": "information",
            "count": "1",
            "timestamp": "Sun, 29 Apr 2018 04:47:12 GMT"
        },
        {

            "alert": "openstack",
            "appID": "openstack",
            "description": "openstack-data received",
            "severity": "information",
            "alertstate": "firing",
            "count": "1",
            "timestamp": "Sun, 29 Apr 2018 04:47:12 GMT"
        },
        {
            "alert": "device manager alert",
            "description": "installed an update in  kibana ",
            "severity": "warning",
            "alertstate": "information",
            "count": "1",
            "timestamp": "Sun, 29 Apr 2018 04:47:12 GMT"
        },
        {

            "alert": "software install alerts",
            "description": "we installed an update in k8s",
            "severity": "information",
            "alertstate": "firing",
            "count": "1",
            "timestamp": "Sun, 29 Apr 2018 04:47:12 GMT"
        },
        {

            "alert": "software  alerts systems",
            "description": "we installed an update in kibana",
            "severity": "information",
            "alertstate": "firing",
            "count": "1",
            "timestamp": "Sun, 29 Apr 2018 04:47:12 GMT"
        }
        ])
})

app.get(API_VERSION + 'prometheous', (request, response) => {

    response.status(200)
    response.json({
        success: true,
        data: pData
    });

});

app.post(API_VERSION + 'prometheous', (request, response) => {
    var id = uuidv4();
    var payload = request.body;
    payload.id = id;
    pData.push(payload)
    response.status(201)
    response.send({
        success: true,
        data: payload
    });

});

app.delete(API_VERSION + 'prometheous/:id', (request, response) => {

    let id = request.params.id;

    pData.forEach(ele => {
        if (ele.id === id) {
            let idx = pData.indexOf(ele);
            console.log(idx)
            if (idx !== -1) {
                pData.splice(idx, 1);
            }
        }
    });
    response.status(200)
    response.send({
        success: true
    });
});

app.get(API_VERSION + 'notifications', (request, response) => {

    response.status(200)
    response.json({
        success: true,
        data: pnotfication
    });

});

app.post(API_VERSION + 'notifications', (request, response) => {
    var id = uuidv4();
    var payload = request.body;
    payload.id = id;
    pnotfication.push(payload)
    response.status(201)
    response.send({
        success: true,
        data: payload
    });

});

app.delete(API_VERSION + 'notifications/:id', (request, response) => {

    let id = request.params.id;

    pnotfication.forEach(ele => {
        if (ele.id === id) {
            let idx = pnotfication.indexOf(ele);
            console.log(idx)
            if (idx !== -1) {
                pnotfication.splice(idx, 1);
            }
        }
    });
    response.status(200)
    response.send({
        success: true
    });
});

app.get(API_VERSION + 'alerts', (request, response) => {

    let temp = [];
    pData.forEach(ele => temp.push(ele));
    pnotfication.forEach(ele => temp.push(ele));

    response.status(200)
    response.json({
        success: true,
        data: temp
    });

});