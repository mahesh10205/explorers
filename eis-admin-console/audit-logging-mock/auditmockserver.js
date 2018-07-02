var http = require('http')
var express = require('express'),
  cors = require('cors');

bodyParser = require('body-parser')
app = express();
port = process.env.PORT || 4000;

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.listen(port);

console.log('Audit log mock service API server started on: ' + port);

// temp data
var messageConfig =  { "anonymization": true, "auditSourceID": "sss" };
var repositoryconfiguration =  {
    "repository_1_status": false,
    "repository_1_host": "3.204.111.182",
    "repository_1_port": 516,
    "repository_1_protocol": 1003,
    "repository_2_status": false,
    "repository_2_host": "host",
    "repository_2_port": 0,
    "repository_2_protocol": 1005,
    "isDisableTLS": false
};
var repositoryConnection = [];


app.get('/eat-auditmessageconfig', (request, response) => {
    response.send(messageConfig);
})

app.get('/eat-repositoryconfiguration', (request, response) => {
    response.send(repositoryconfiguration)
});

app.patch('/eat-auditmessageconfig', (request, response) => {
    let id = request.params.id;
    var payload = request.body;
    if(payload.anonymization != undefined) {
        messageConfig.anonymization = payload.anonymization;
    }
    if(payload.auditSourceID != undefined) {
        messageConfig.auditSourceID = payload.auditSourceID;
    }
    response.status(201)
    //response.send(messageConfig);
    response.send("Updated successfully");
});

app.patch('/eat-repositoryconfiguration', (request, response) => {
    let id = request.params.id;
    var payload = request.body;
    if(payload.repository_1_status != undefined) {
        repositoryconfiguration.repository_1_status = payload.repository_1_status;
    }
    if(payload.repository_1_host != undefined) {
        repositoryconfiguration.repository_1_host = payload.repository_1_host;
    }
    if(payload.repository_1_port != undefined) {
        repositoryconfiguration.repository_1_port = payload.repository_1_port;
    }
    if(payload.repository_1_protocol != undefined) {
        repositoryconfiguration.repository_1_protocol = payload.repository_1_protocol;
    }
    if(payload.repository_2_status != undefined) {
        repositoryconfiguration.repository_2_status = payload.repository_2_status;
    }
    if(payload.repository_2_host != undefined) {
        repositoryconfiguration.repository_2_host = payload.repository_2_host;
    }
    if(payload.repository_2_port != undefined) {
        repositoryconfiguration.repository_2_port = payload.repository_2_port;
    }
    if(payload.repository_2_protocol != undefined) {
        repositoryconfiguration.repository_2_protocol = payload.repository_2_protocol;
    }
    if(payload.isDisableTLS != undefined) {
        repositoryconfiguration.isDisableTLS = payload.isDisableTLS;
    }
    response.status(200);
    //response.send(repositoryconfiguration);
    response.send("Updated successfully");

});

app.post('/eat-repositoryconnection', (request, response) => {
   repositoryConnection.push(request.body);
    response.status(201)
    //response.send(request.body);
    response.send("Posted successfully");
});

