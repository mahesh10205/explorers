var express = require('express');
var app = express();
var sd = require('body-parser');
var cors = require('cors');
var data = [{
        "imagingDeviceID": "f739b300-82bb-4843-bf6d-8bd7de266f3011",
        "metadata": [{
            "ngssf": "true"
        }],
        "systemID": "My Console516",
        "connectors": [{
            "capabilities": [{
                "capability": "C-STORE",
                "configuration": {
                    "port": "4006",
                    "ip": "10.177.200.21",
                    "aetitle": "INBLREVRASWP337"
                },
                "id": "65c1d167-0f6f-49ba-a2ca-a8a8eeb02038"
            }],
            "id": "229a88d9-26d5-4997-a290-6f0c696c41c7",
            "type": "TYPE.DICOM"
        }],
        "belongsTo": {
            "country": "INDIA",
            "siteID": "546465",
            "siteName": "VELLORE HOSPITAL",
            "region": "VELLORE"
        },
        "productName": "My Console",
        "manufacturer": "GE Healthcare"
    },
    {
        "imagingDeviceID": "f739b300-82bb-4843-bf6d-8bd7de266f30",
        "metadata": [{
                "recon-type": "ASiR-V",
                "recon-technologies": [
                    "ASiR",
                    "ASiR-V",
                    "Veo"
                ],
                "gantry-rotation": "0.2s"
            },
            {
                "recon-type": "ASiR-V",
                "recon-technologies": [
                    "ASiR",
                    "ASiR-V",
                    "Veo"
                ],
                "gantry-rotation": "0.2s"
            },
            {
                "default": "pacs"
            }
        ],
        "systemID": "CTSCANNER",
        "connectors": [{
            "capabilities": [{
                    "capability": "C-FIND",
                    "configuration": {
                        "port": "4006",
                        "ip": "10.177.200.21",
                        "aetitle": "INBLREVRASWP337"
                    },
                    "id": "58e9cb53-aa39-4a26-aa02-421a81678362"
                },
                {
                    "capability": "C-STORE",
                    "configuration": {
                        "port": "4006",
                        "ip": "10.177.200.21",
                        "aetitle": "INBLREVRASWP337"
                    },
                    "id": "b2e05665-488c-4103-8faf-311191399bde"
                }
            ],
            "id": "55c8859b-5a6a-4353-85ed-d70b1292770b",
            "type": "TYPE.DICOM"
        }],
        "belongsTo": {
            "country": "INDIA",
            "siteID": "546465",
            "siteName": "MANIPAL HOSPITALS",
            "region": "BANGALORE"
        },
        "productName": "CT",
        "manufacturer": "GE Healthcare"
    },
    {
        "imagingDeviceID": "9806dfc7-d05f-4f44-a4fa-f7224ba3c8db",
        "metadata": [{
                "recon-type": "ASiR-V",
                "recon-technologies": [
                    "ASiR",
                    "ASiR-V",
                    "Veo"
                ],
                "gantry-rotation": "0.2s"
            },
            {
                "recon-type": "ASiR-V",
                "recon-technologies": [
                    "ASiR",
                    "ASiR-V",
                    "Veo"
                ],
                "gantry-rotation": "0.2s"
            }
        ],
        "systemID": "CTSCANNER_1234",
        "connectors": [{
            "capabilities": [{
                    "capability": "C-FIND",
                    "configuration": {
                        "port": "4006",
                        "ip": "10.177.200.219",
                        "aetitle": "INBLREVRASWP219"
                    },
                    "id": "385e3b88-8c81-4c7e-a015-df93d85f8185"
                },
                {
                    "capability": "C-STORE",
                    "configuration": {
                        "port": "6104",
                        "ip": "3.122.2.1",
                        "aetitle": "REVO_MANIPAL"
                    },
                    "id": "a5260146-dea8-430b-9e38-962cd6e0db1b"
                }
            ],
            "id": "c845fd2d-84d3-4e7f-921a-ba2af5756941",
            "type": "TYPE.DICOM"
        }],
        "belongsTo": {
            "country": "INDIA",
            "siteID": "546465",
            "siteName": "MANIPAL HOSPITALS",
            "region": "BANGALORE"
        },
        "productName": "CT",
        "manufacturer": "GE Healthcare"
    },
    {
        "imagingDeviceID": "0e1df1ed-9137-4927-96f0-40eaf735152e",
        "metadata": [{
                "recon-type": "ASiR-V",
                "recon-technologies": [
                    "ASiR",
                    "ASiR-V",
                    "Veo"
                ],
                "gantry-rotation": "0.2s"
            },
            {
                "recon-type": "ASiR-V",
                "recon-technologies": [
                    "ASiR",
                    "ASiR-V",
                    "Veo"
                ],
                "gantry-rotation": "0.2s"
            }
        ],
        "systemID": "CTSCANNER_1235",
        "connectors": [{
            "capabilities": [{
                    "capability": "C-FIND",
                    "configuration": {
                        "port": "4006",
                        "ip": "10.177.200.218",
                        "aetitle": "INBLREVRASWP219"
                    },
                    "id": "ae9f970d-6fdf-4413-ad68-c56b14d29844"
                },
                {
                    "capability": "C-STORE",
                    "configuration": {
                        "port": "6104",
                        "ip": "3.122.2.2",
                        "aetitle": "REVO_MANIPAL"
                    },
                    "id": "2b7dc574-e127-4ed1-9319-4f99d4abbf28"
                }
            ],
            "id": "e2ed2d83-e678-4d11-88f3-32df474b4afa",
            "type": "TYPE.DICOM"
        }],
        "belongsTo": {
            "country": "INDIA",
            "siteID": "546465",
            "siteName": "MANIPAL HOSPITALS",
            "region": "BANGALORE"
        },
        "productName": "CT",
        "manufacturer": "GE Healthcare"
    },
    {
        "imagingDeviceID": "9706663c-1097-4db5-a508-ca3c1d727eee",
        "metadata": [{
            "ngssf": "true"
        }],
        "systemID": "My Console513",
        "connectors": [{
            "capabilities": [{
                "capability": "C-STORE",
                "configuration": {
                    "port": "4006",
                    "ip": "10.177.200.21",
                    "aetitle": "INBLREVRASWP337"
                },
                "id": "19e8c098-e190-4336-a3f4-a88e5c1ad44d"
            }],
            "id": "6e90191f-8f21-42db-ad5b-742803ddfeb0",
            "type": "TYPE.DICOM"
        }],
        "belongsTo": {
            "country": "INDIA",
            "siteID": "546465",
            "siteName": "VELLORE HOSPITAL",
            "region": "VELLORE"
        },
        "productName": "My Console",
        "manufacturer": "GE Healthcare"
    },
    {
        "imagingDeviceID": "15400564-f31e-4b6e-a0f4-63c2b134c2f7",
        "metadata": [{
                "recon-type": "ASiR-V",
                "recon-technologies": [
                    "ASiR",
                    "ASiR-V",
                    "Veo"
                ],
                "gantry-rotation": "0.2s"
            },
            {
                "recon-type": "ASiR-V",
                "recon-technologies": [
                    "ASiR",
                    "ASiR-V",
                    "Veo"
                ],
                "gantry-rotation": "0.2s"
            }
        ],
        "systemID": "CTSCANNER_1239",
        "connectors": [{
            "capabilities": [{
                    "capability": "C-FIND",
                    "configuration": {
                        "port": "4006",
                        "ip": "10.177.200.218",
                        "aetitle": "INBLREVRASWP219"
                    },
                    "id": "b778ac63-7d17-45e6-a92a-6a33610e246f"
                },
                {
                    "capability": "C-STORE",
                    "configuration": {
                        "port": "6104",
                        "ip": "3.122.2.2",
                        "aetitle": "REVO_MANIPAL"
                    },
                    "id": "a540e9ab-c14f-4878-b289-12d876de07b2"
                }
            ],
            "id": "060532c6-750e-40e9-a183-72229976cfa8",
            "type": "TYPE.DICOM"
        }],
        "belongsTo": {
            "country": "INDIA",
            "siteID": "546465",
            "siteName": "MANIPAL HOSPITALS",
            "region": "BANGALORE"
        },
        "productName": "CT",
        "manufacturer": "GE Healthcare"
    }

]
app.use(cors());
app.use(sd.json())


// get all the devices
app.get('/imagingdevice', (req, res) => {
    res.status(200).json(data);
})

// update a device
app.put('/imagingdevice/:imagingDeviceID', (req, res) => {
    var statusCode = 400;
    var response = "Bad request: "
    if (req.params.imagingDeviceID) {
        if (null !== req.params.imagingDeviceID) {
            var deviceId = req.params.imagingDeviceID;
            data.forEach((result, index, array) => {
                if (deviceId === result.imagingDeviceID) {
                    req.body.imagingDeviceID = deviceId
                    array[index] = req.body;
                }
            })

            statusCode = 200;
            response = deviceId;
        } else {
            response += "imaging device ID is null";
            console.log("imaging device ID is null");
        }
    } else {
        response += "imaging device ID is undefined";
        console.log("imaging device ID is undefined");
    }

    res.status(statusCode).send(response);
});

// add a device
app.post('/imagingdevice', (req, res) => {
    var device = req.body;
    device.imagingDeviceID =
        Math.random().toString(36).substr(2, 9) + "-" + Math.random().toString(36).substr(2, 9) + "-" + Math.random().toString(36).substr(2, 9) + "-dummy";
    data.push(device);

    res.status(200).json(device);
});

// delete a device
app.delete('/imagingdevice/:deviceId', (req, res) => {
    data.forEach((result, index, array) => {
        if (req.params.deviceId === result.imagingDeviceID) {
            data.splice(index, 1);
        }
    })
    console.log(data);
    res.status(200).send(req.params.deviceId);
});


app.listen(3003, () => {
    console.log("server started at 3003");
});