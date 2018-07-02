var http = require('http')
var express = require('express'),
    cors = require('cors');

bodyParser = require('body-parser')
app = express();
port = process.env.PORT || 3000;

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.listen(port);

console.log('Prometheus mock server started on: ' + port);


app.get('/prometheus-dashboard/api/v1/query', (request, response) => {
    let query = request.query.query;
    response.send({
        "status": "success",
        "data": {
            "resultType": "vector",
            "result": [{
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ALLClusterMasterNodesDown",
                        "alertstate": "firing",
                        "instance": "192.168.102.14:6443",
                        "job": "kubernetes-apiservers",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ALLClusterMasterNodesDown",
                        "alertstate": "firing",
                        "instance": "192.168.102.3:6443",
                        "job": "kubernetes-apiservers",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "All ClusterMinionNodesDown",
                        "alertstate": "firing",
                        "instance": "192.168.102.14:6443",
                        "job": "kubernetes-apiservers",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "All ClusterMinionNodesDown",
                        "alertstate": "firing",
                        "instance": "192.168.102.3:6443",
                        "job": "kubernetes-apiservers",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ApplicationOrServiceFailure",
                        "alertstate": "firing",
                        "beta_kubernetes_io_arch": "amd64",
                        "beta_kubernetes_io_instance_type": "9cd822ba-947b-4a59-92bc-a9f3a98d5d15",
                        "beta_kubernetes_io_os": "linux",
                        "failure_domain_beta_kubernetes_io_region": "RegionOne",
                        "failure_domain_beta_kubernetes_io_zone": "nova",
                        "instance": "k8s-master-0",
                        "job": "kubernetes-nodes-cadvisor",
                        "kubernetes_io_hostname": "k8s-master-0",
                        "node_role_kubernetes_io_master": "true",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ApplicationOrServiceFailure",
                        "alertstate": "firing",
                        "beta_kubernetes_io_arch": "amd64",
                        "beta_kubernetes_io_instance_type": "9cd822ba-947b-4a59-92bc-a9f3a98d5d15",
                        "beta_kubernetes_io_os": "linux",
                        "failure_domain_beta_kubernetes_io_region": "RegionOne",
                        "failure_domain_beta_kubernetes_io_zone": "nova",
                        "instance": "k8s-master-1",
                        "job": "kubernetes-nodes-cadvisor",
                        "kubernetes_io_hostname": "k8s-master-1",
                        "node_role_kubernetes_io_master": "true",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ApplicationOrServiceFailure",
                        "alertstate": "firing",
                        "beta_kubernetes_io_arch": "amd64",
                        "beta_kubernetes_io_instance_type": "f5e0d5cd-191d-4fb8-9900-68484ab94436",
                        "beta_kubernetes_io_os": "linux",
                        "failure_domain_beta_kubernetes_io_region": "RegionOne",
                        "failure_domain_beta_kubernetes_io_zone": "nova",
                        "instance": "k8s-minion-0",
                        "job": "kubernetes-nodes-cadvisor",
                        "kubernetes_io_hostname": "k8s-minion-0",
                        "node_role_kubernetes_io_node": "true",
                        "phcNode": "yes",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ApplicationOrServiceFailure",
                        "alertstate": "firing",
                        "beta_kubernetes_io_arch": "amd64",
                        "beta_kubernetes_io_instance_type": "f5e0d5cd-191d-4fb8-9900-68484ab94436",
                        "beta_kubernetes_io_os": "linux",
                        "failure_domain_beta_kubernetes_io_region": "RegionOne",
                        "failure_domain_beta_kubernetes_io_zone": "nova",
                        "instance": "k8s-minion-1",
                        "job": "kubernetes-nodes-cadvisor",
                        "kubernetes_io_hostname": "k8s-minion-1",
                        "node_role_kubernetes_io_node": "true",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ApplicationOrServiceFailure",
                        "alertstate": "firing",
                        "beta_kubernetes_io_arch": "amd64",
                        "beta_kubernetes_io_instance_type": "f5e0d5cd-191d-4fb8-9900-68484ab94436",
                        "beta_kubernetes_io_os": "linux",
                        "failure_domain_beta_kubernetes_io_region": "RegionOne",
                        "failure_domain_beta_kubernetes_io_zone": "nova",
                        "instance": "k8s-minion-2",
                        "job": "kubernetes-nodes-cadvisor",
                        "kubernetes_io_hostname": "k8s-minion-2",
                        "node_role_kubernetes_io_node": "true",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ApplicationOrServiceFailure",
                        "alertstate": "firing",
                        "beta_kubernetes_io_arch": "amd64",
                        "beta_kubernetes_io_instance_type": "f5e0d5cd-191d-4fb8-9900-68484ab94436",
                        "beta_kubernetes_io_os": "linux",
                        "failure_domain_beta_kubernetes_io_region": "RegionOne",
                        "failure_domain_beta_kubernetes_io_zone": "nova",
                        "instance": "k8s-minion-3",
                        "job": "kubernetes-nodes-cadvisor",
                        "kubernetes_io_hostname": "k8s-minion-3",
                        "node_role_kubernetes_io_node": "true",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ApplicationOrServiceFailure",
                        "alertstate": "firing",
                        "beta_kubernetes_io_arch": "amd64",
                        "beta_kubernetes_io_instance_type": "f5e0d5cd-191d-4fb8-9900-68484ab94436",
                        "beta_kubernetes_io_os": "linux",
                        "failure_domain_beta_kubernetes_io_region": "RegionOne",
                        "failure_domain_beta_kubernetes_io_zone": "nova",
                        "instance": "k8s-minion-4",
                        "job": "kubernetes-nodes-cadvisor",
                        "kubernetes_io_hostname": "k8s-minion-4",
                        "node_role_kubernetes_io_node": "true",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ApplicationOrServiceFailure",
                        "alertstate": "firing",
                        "instance": "192.168.102.14:6443",
                        "job": "kubernetes-apiservers",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ApplicationOrServiceFailure",
                        "alertstate": "firing",
                        "instance": "192.168.102.3:6443",
                        "job": "kubernetes-apiservers",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ApplicationOrServiceFailure",
                        "alertstate": "firing",
                        "instance": "monitoring-es-exporter:9108",
                        "job": "elasticsearch",
                        "service": "elasticsearch",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ApplicationOrServiceFailure",
                        "alertstate": "pending",
                        "beta_kubernetes_io_arch": "amd64",
                        "beta_kubernetes_io_instance_type": "f5e0d5cd-191d-4fb8-9900-68484ab94436",
                        "beta_kubernetes_io_os": "linux",
                        "failure_domain_beta_kubernetes_io_region": "RegionOne",
                        "failure_domain_beta_kubernetes_io_zone": "nova",
                        "instance": "k8s-minion-x1",
                        "job": "kubernetes-nodes-cadvisor",
                        "kubernetes_io_hostname": "k8s-minion-x1",
                        "node_role_kubernetes_io_node": "true",
                        "severity": "Critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "CPUUtilization",
                        "alertstate": "firing",
                        "severity": "Info"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ClusterMinionNodeDown",
                        "alertstate": "firing",
                        "instance": "192.168.102.14:6443",
                        "job": "kubernetes-apiservers",
                        "severity": "High"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "ClusterMinionNodeDown",
                        "alertstate": "firing",
                        "instance": "192.168.102.3:6443",
                        "job": "kubernetes-apiservers",
                        "severity": "High"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "GatewayDOSWarning",
                        "alertstate": "firing",
                        "severity": "High"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "K8SApiserverDown",
                        "alertstate": "firing",
                        "severity": "critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "K8SKubeletDown",
                        "alertstate": "firing",
                        "severity": "critical"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "MemoryLeakDetection",
                        "alertstate": "firing",
                        "severity": "Medium"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "MemoryUtilization",
                        "alertstate": "firing",
                        "severity": "Info"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "NetworkStarvation",
                        "alertstate": "firing",
                        "severity": "Medium"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                },
                {
                    "metric": {
                        "__name__": "ALERTS",
                        "alertname": "StorageUtilzation",
                        "alertstate": "firing",
                        "severity": "Medium"
                    },
                    "value": [
                        1529979212.373,
                        "1"
                    ]
                }
            ]
        }
    })
})