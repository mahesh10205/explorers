var http = require('http')
var express = require('express'),
//uuidv4 = require('uuid/v4')
//var util = require('util');
cors = require('cors');
//redis = require('redis')
bodyParser = require('body-parser')
app = express();
port = process.env.PORT || 3000;
P_HOST = process.env.P_HOST || undefined;
P_PORT = process.env.P_PORT || undefined;
P_AHOST = process.env.P_AHOST || undefined;
P_APORT = process.env.P_APORT || undefined;
// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.listen(port);
module.exports = app;
console.log('Alert Manager API server started on: ' + port);
//var client = redis.createClient();
// const getRedisByKey = util.promisify(client.get).bind(client);
// const getRedisKeys = util.promisify(client.keys).bind(client);
var alertData = new Map();
var alertCategory = new Map();
// alertCategory.set("critical", 2)
function clearAlertDescData() {
    console.log(alertData.size)
    alertData.clear()
    console.log(alertData.size)
}
// function getValueFromRedis(key) {
//     return new Promise(function (resolve, reject) {
//         getRedisByKey(key).then((val) => {
//             // console.log(key+'='+val)
//             resolve(JSON.parse(val));
//         });
//     });
// }
// function getAllDataFromRedis() {
//     return new Promise(function (resolve, reject) {
//         promises = [];
//         result = [];
//         getRedisKeys('*').then((keys) => {
//             keys.forEach((key) => {
//                 promises.push(getValueFromRedis(key));
//             });
//             Promise.all(promises).then((results) => {
//                 resolve(results);
//             });
//         });
//     });
// }
function getAlertDescriptions(key) {
    if (alertData.size === 0) {
        if (P_AHOST === undefined || P_APORT === undefined || P_HOST === undefined || P_PORT === undefined) {
            console.error('P_AHOST or P_APORT is NOT set')
            return undefined;
        }
        //Building alert manager Url using environemnt varaibles
        let aUrl = 'http://' + P_AHOST + ':' + P_APORT + '/api/v1/alerts'
        //let aUrl = "http://3.28.94.16:31413/api/v1/alerts"
        console.log('aUrl => ' + aUrl)
        http.get(aUrl, (resp) => {
            let data = ''
            resp.on('data', chunk => data = data + chunk);
            resp.on('end', () => {
                var jsonObj = JSON.parse(data);
                if (jsonObj.status) {
                    // var result = jsonObj.data
                    jsonObj.data.forEach(element => {
                        alertData.set(element.labels.alertname, element.annotations.description)
                    });
                }

            }).on('error', (err) => {
                console.error(err)
            })

        });
    }

    console.log(alertData.get(key))

    return alertData.get(key)
}
app.get('/clear/cache', (req, res) => {
    clearAlertDescData()
    res.send({
        status: 'success',
        message: 'Cache Cleared'
    });
})
app.get('/alerts', (request, response) => {
    if (P_HOST === undefined || P_PORT === undefined || P_AHOST === undefined || P_APORT === undefined) {
        response.send({
            status: false,
            error: 'Environment Varaibles are NOT set'
        });
        return;
    }
    getAlertDescriptions()
    // Caluclating 7 days in millisecons to get 7day old timestamp
    var sevendaysinsecs = 7 * 24 * 60 * 60 * 1000
    var fromtimestamp = (Date.now() - sevendaysinsecs) / 1000
    console.log(fromtimestamp)
    // Building Premethous Url using environemnt varaibles
    let pUrl = 'http://' + P_HOST + ':' + P_PORT + '/prometheus-dashboard/api/v1/query?query=ALERTS'
   //let pUrl ="http://3.28.94.16:31334/prometheus-dashboard/api/v1/query?query=ALERTS"
    console.log('P Url => ' + pUrl)
    http.get(pUrl, (resp) => {
        let data = ''
        resp.on('data', chunk => data = data + chunk);
        resp.on('end', () => {
            console.log('Data Received')
            //console.log(data)
            var jsonObj = JSON.parse(data);
            //console.log(jsonObj)
            var alerts = []
            if (jsonObj !== undefined && jsonObj.status !== undefined) {
                var result = jsonObj.data.result
                // console.log(result)
                for (var i = 0; i < result.length; i++) {
                    let desc = getAlertDescriptions(result[i].metric.alertname);
                    let category = alertCategory.get(result[i].metric.severity);
                    alerts.push({
                        alert: result[i].metric.alertname,
                        description: desc === undefined ? 'check alerts in prometheus' : desc,
                        appID: desc === undefined ? 'prometheus' : undefined,
                        severity: result[i].metric.severity,
                        alertstate: result[i].metric.alertstate,
                        count: result[i].value[1],
                        timestamp: new Date(result[i].value[0] * 1000).toGMTString()
                    })
                    console.log(alerts)

                }
                // Reading Data from Redis
                // getAllDataFromRedis().then(res => {
                //     console.log('All values read');
                //     res.forEach(rData => alerts.push(rData));
                response.send({
                    success: true,
                    data: alerts
                })
                // })
            } else {
                response.status(404)
                response.json({
                    success: true,
                    data: []
                });
            }

        })
    }).on('error', (err) => {
        console.error(err)
        response.send({
            success: false,
            error: "Please check the logs"
        })
    })

});
// app.post('/publish-notification', (request, response) => {
//     var id = uuidv4();
//     var payload = request.body;
//     console.log(payload.alertName)
//     if (P_HOST === undefined || P_PORT === undefined || P_AHOST === undefined || P_APORT === undefined ) {
//         response.send({
//             status: false,
//             error: 'Environment Varaibles are NOT set'
//         });
//         return;
//     }
//     isBadRequest = false;
//     if (payload.alertName === undefined || payload.alertName === null) isBadRequest = true;
//     if (payload.description === undefined || payload.description === null) isBadRequest = true;
//     if (payload.severity === undefined || payload.severity === null) isBadRequest = true;
//     if (isBadRequest) {
//         response.status(400)
//         response.send({
//             success: false,
//             data: "bad data has been sent"
//         });
//     } else {
//         client.set(id, JSON.stringify(payload));
//         var retdata = 'empty'
//         client.get(id, function (err, reply) {
//             console.error(err)
//             if (err === undefined || err === null) {
//                 retdata = JSON.parse(reply)
//                 response.status(201)
//                 response.send({
//                     success: true,
//                     id: id
//                 });
//             }
//         })
//     }
// });
// app.delete('/delete/:id', (request, response) => {
//     client.del(request.params.id, function (err, reply) {
//         response.status(200)
//         response.send({
//             success: reply
//         });
//     });
// })
