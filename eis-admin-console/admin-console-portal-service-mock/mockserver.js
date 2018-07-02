var http = require('http')
var express = require('express'),
  cors = require('cors');

bodyParser = require('body-parser')
app = express();
port = process.env.PORT || 8090;

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.listen(port);

console.log('mock service API server started on: ' + port);

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

app.get('/userInfo', (request, response) => {
  response.send(
    {
      "user": "admin",
      "roles": [
        "admin",
        "_member_",
        "heat_stack_owner"
      ]
    })
})
app.get('/dashboardShell/urlinfos', (request, response) => {
  response.send(
    [
      {
        "id": "k8sUrl",
        "url": "https://3.28.94.20:31410/#!/login"
      },
      {
        "id": "telemeteryUrl",
        "url": "http://3.28.94.24:31333/graph?g0.range_input=1h&g0.expr=ALERTS&g0.tab=0"
      },
      {
        "id": "titaniumUrl",
        "url": "http://3.28.93.151/admin"
      },
      {
        "id": "identityUrl",
        "url": "http://3.28.93.151:5000/v3/auth/tokens"
      },
      {
        "id": "grafanaUrl",
        "url": "http://3.28.94.13:3000/dashboard/file/grafana-ceph.json?refresh=1m&orgId=1"
      },
      {
        "id": "kibanaUrl",
        "url": ""
      },
      {
        "id": "prometheusUrl",
        "url": "http://3.28.94.20:31334/graph"
      },
      {
        "id": "deviceRegistryUrl",
        "url": "http://3.204.43.214:30808/all-devices"
      },
      {
        "id": "dicomDataListingUrl",
        "url": "#"
      }
    ]

  )
})
app.get('/applications', (request, response) => {
  response.send(
    [
      {
        "appId": "device.manager",
        "urls": {
          "imagingdevice": "/imagingdevice"
        }
      },
      {
        "appId": "audit.logging",
        "urls": {
          "auditmessageconfig": "/auditmessageconfig",
          "repositoryconfiginfo": "/repositoryconfiguration",
          "repositoryconnection": "/repositoryconnection"
        }
      },
      {
        "appId": "grafana",
        "urls": {
          "dashboard": "http://3.28.94.21:3000/"
        }
      },
      {
        "appId": "k8s",
        "urls": {
          "dashboard": "https://3.28.94.24:6443/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/"
        }
      },
      {
        "appId": "openstack",
        "urls": {
          "dashboard": "http://3.28.93.151/auth/login/"
        }
      },
      {
        "appId": "prometheus",
        "urls": {
          "dashboard": "http://3.28.94.16:31334"
        }
      },
      {
        "appId": "kibana",
        "urls": {
          "dashboard": "http://3.28.94.16:32456/",
          "logexport": "/search",
          "timezone": "/timezone"
        }
      }
    ]
  )
})
app.post('/login', (request, response) => {
  var payload = request.body;
  console.log(payload.username)
  isBadRequest = false;
  if (payload.username === undefined || payload.username === null) isBadRequest = true;
  if (payload.password === undefined || payload.password === null) isBadRequest = true;
  if (isBadRequest) {
    response.status(400)
    response.send({
      success: false,
      data: "bad data has been sent"
    });
  } else {
    response.send({
    });

  }
});
//"/search?startDate=" + _fromDate.toISOString() + "&endDate=" + _toDate.toISOString() + "&format=" + (this.isZip ? 'zip' : 'json'
app.get('/search', function (req, res) {
  var file = __dirname + '/export.json';
  var filezip = __dirname + '/export.zip';
  let format = req.body.format;
  res.set({
    'Content-Type': 'text/plain',
    'Access-Control-Expose-Headers': 'Content-Disposition',
    'Content-Disposition': 'attachment; filename=' + req.body.filename
  })
  if (format === 'json') {
    res.download(file);
  } else {
    res.download(filezip);
  }
});
app.get('/timezone', function (req, res) {
  res.send(
    "Central Standard Time"
  );
});

app.get('/auditmessageconfig', (request, response) => {
    response.send(messageConfig);
})

app.get('/repositoryconfiguration', (request, response) => {
    response.send(repositoryconfiguration)
});

app.patch('/auditmessageconfig', (request, response) => {
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

app.patch('/repositoryconfiguration', (request, response) => {
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

app.post('/repositoryconnection', (request, response) => {
   repositoryConnection.push(request.body);
    response.status(201)
    //response.send(request.body);
    response.send("Posted successfully");
});

