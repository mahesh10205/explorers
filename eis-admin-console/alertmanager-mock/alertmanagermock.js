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


app.get('/api/v1/alerts', (request, response) => {
    response.send({
        "status": "success",
        "data": [{
                "labels": {
                    "alertname": "ClusterMinionNodeDown",
                    "instance": "192.168.102.14:6443",
                    "job": "kubernetes-apiservers",
                    "severity": "High"
                },
                "annotations": {
                    "description": "One or more (not ALL) Kubernetes minion nodes are not running"
                },
                "startsAt": "2018-06-21T04:53:13.313362948Z",
                "endsAt": "2018-06-26T02:57:13.316816017Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up%7Bjob%3D%22kubernetes-apiservers%22%7D+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "0501d4cf03e6bd1e"
            },
            {
                "labels": {
                    "alertname": "ApplicationOrServiceFailure",
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
                "annotations": {
                    "description": "One or more pods or endpoint have failed or not responding to health checks/One or more PVCs failed to bind"
                },
                "startsAt": "2018-06-25T15:02:13.3133046Z",
                "endsAt": "2018-06-26T02:57:13.319144159Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "13d3b84466fde7d8"
            },
            {
                "labels": {
                    "alertname": "GatewayDOSWarning",
                    "severity": "High"
                },
                "annotations": {
                    "description": "HAProxy load balancer gateway VM is constantly receiving high amounts of network traffic"
                },
                "startsAt": "2018-06-21T04:48:13.31336221Z",
                "endsAt": "2018-06-26T02:57:13.369530254Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=%28%28sum%28rate%28container_network_transmit_bytes_total%5B1m%5D%29%29+%2B+sum%28rate%28container_network_receive_bytes_total%5B1m%5D%29%29%29+%2F+%281024+%2A+1024+%2A+1024%29%29+%3E+0&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "1573dfb67158b7a7"
            },
            {
                "labels": {
                    "alertname": "All ClusterMinionNodesDown",
                    "instance": "192.168.102.3:6443",
                    "job": "kubernetes-apiservers",
                    "severity": "Critical"
                },
                "annotations": {
                    "description": "All Kubernetes minions are not running"
                },
                "startsAt": "2018-06-21T04:53:13.313362948Z",
                "endsAt": "2018-06-26T02:57:13.316816017Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up%7Bjob%3D%22kubernetes-apiservers%22%7D+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "1c41f5b6511f26e7"
            },
            {
                "labels": {
                    "alertname": "CPUUtilization",
                    "severity": "Info"
                },
                "annotations": {
                    "description": "Overall system (cluster + VMs) CPU utilization"
                },
                "startsAt": "2018-06-21T04:48:13.31336221Z",
                "endsAt": "2018-06-26T02:57:13.319144159Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=%28cluster%3Acontainer_cpu_usage%3Aratio%29+%3E+0.0001&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "1e39db06ac5a7e37"
            },
            {
                "labels": {
                    "alertname": "ApplicationOrServiceFailure",
                    "instance": "192.168.102.3:6443",
                    "job": "kubernetes-apiservers",
                    "severity": "Critical"
                },
                "annotations": {
                    "description": "One or more pods or endpoint have failed or not responding to health checks/One or more PVCs failed to bind"
                },
                "startsAt": "2018-06-21T04:53:13.313362948Z",
                "endsAt": "2018-06-26T02:57:13.319144159Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "214be591cc6cfd49"
            },
            {
                "labels": {
                    "alertname": "ApplicationOrServiceFailure",
                    "instance": "monitoring-es-exporter:9108",
                    "job": "elasticsearch",
                    "service": "elasticsearch",
                    "severity": "Critical"
                },
                "annotations": {
                    "description": "One or more pods or endpoint have failed or not responding to health checks/One or more PVCs failed to bind"
                },
                "startsAt": "2018-06-21T04:53:13.313362948Z",
                "endsAt": "2018-06-26T02:57:13.319144159Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "2e94ce1c9c729bc4"
            },
            {
                "labels": {
                    "alertname": "ApplicationOrServiceFailure",
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
                "annotations": {
                    "description": "One or more pods or endpoint have failed or not responding to health checks/One or more PVCs failed to bind"
                },
                "startsAt": "2018-06-26T02:15:13.313314703Z",
                "endsAt": "2018-06-26T02:57:13.319144159Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "3143dd7ead733a30"
            },
            {
                "labels": {
                    "alertname": "ApplicationOrServiceFailure",
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
                "annotations": {
                    "description": "One or more pods or endpoint have failed or not responding to health checks/One or more PVCs failed to bind"
                },
                "startsAt": "2018-06-21T04:53:13.313362948Z",
                "endsAt": "2018-06-26T02:57:13.319144159Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "54ddae9ee9a2217a"
            },
            {
                "labels": {
                    "alertname": "ClusterMinionNodeDown",
                    "instance": "192.168.102.3:6443",
                    "job": "kubernetes-apiservers",
                    "severity": "High"
                },
                "annotations": {
                    "description": "One or more (not ALL) Kubernetes minion nodes are not running"
                },
                "startsAt": "2018-06-21T04:53:13.313362948Z",
                "endsAt": "2018-06-26T02:57:13.316816017Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up%7Bjob%3D%22kubernetes-apiservers%22%7D+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "7e621035eb7f0032"
            },
            {
                "labels": {
                    "alertname": "ApplicationOrServiceFailure",
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
                "annotations": {
                    "description": "One or more pods or endpoint have failed or not responding to health checks/One or more PVCs failed to bind"
                },
                "startsAt": "2018-06-25T21:41:13.313361965Z",
                "endsAt": "2018-06-26T02:57:13.319144159Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "8044c051c3b8ffd6"
            },
            {
                "labels": {
                    "alertname": "K8SKubeletDown",
                    "severity": "critical"
                },
                "annotations": {
                    "description": "Prometheus failed to scrape 100% of kubelets, or all Kubelets have disappeared from service discovery.",
                    "summary": "Many Kubelets cannot be scraped"
                },
                "startsAt": "2018-06-21T05:37:58.153415708Z",
                "endsAt": "2018-06-26T02:57:58.156450793Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=%28absent%28up%7Bjob%3D%22kubelet%22%7D+%3D%3D+1%29+or+count%28up%7Bjob%3D%22kubelet%22%7D+%3D%3D+0%29+%2F+count%28up%7Bjob%3D%22kubelet%22%7D%29%29+%2A+100+%3E+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "email_alert-n-webhookup"
                ],
                "fingerprint": "877d45f3a63422c8"
            },
            {
                "labels": {
                    "alertname": "ApplicationOrServiceFailure",
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
                "annotations": {
                    "description": "One or more pods or endpoint have failed or not responding to health checks/One or more PVCs failed to bind"
                },
                "startsAt": "2018-06-21T04:53:13.313362948Z",
                "endsAt": "2018-06-26T02:57:13.319144159Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "8a63dcd128d235a2"
            },
            {
                "labels": {
                    "alertname": "K8SApiserverDown",
                    "severity": "critical"
                },
                "annotations": {
                    "description": "No API servers are reachable or all have disappeared from service discovery"
                },
                "startsAt": "2018-06-21T04:57:31.239549588Z",
                "endsAt": "2018-06-26T02:57:31.502665675Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=absent%28up%7Bjob%3D%22apiserver%22%7D+%3D%3D+1%29&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "email_alert-n-webhookup"
                ],
                "fingerprint": "99628aca7b7a057b"
            },
            {
                "labels": {
                    "alertname": "All ClusterMinionNodesDown",
                    "instance": "192.168.102.14:6443",
                    "job": "kubernetes-apiservers",
                    "severity": "Critical"
                },
                "annotations": {
                    "description": "All Kubernetes minions are not running"
                },
                "startsAt": "2018-06-21T04:53:13.313362948Z",
                "endsAt": "2018-06-26T02:57:13.316816017Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up%7Bjob%3D%22kubernetes-apiservers%22%7D+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "9de99505003c37b3"
            },
            {
                "labels": {
                    "alertname": "ApplicationOrServiceFailure",
                    "instance": "192.168.102.14:6443",
                    "job": "kubernetes-apiservers",
                    "severity": "Critical"
                },
                "annotations": {
                    "description": "One or more pods or endpoint have failed or not responding to health checks/One or more PVCs failed to bind"
                },
                "startsAt": "2018-06-21T04:53:13.313362948Z",
                "endsAt": "2018-06-26T02:57:13.319144159Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "a399f6eef775909d"
            },
            {
                "labels": {
                    "alertname": "ApplicationOrServiceFailure",
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
                "annotations": {
                    "description": "One or more pods or endpoint have failed or not responding to health checks/One or more PVCs failed to bind"
                },
                "startsAt": "2018-06-21T04:53:13.313362948Z",
                "endsAt": "2018-06-26T02:57:13.319144159Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "a3afd0c551053a6a"
            },
            {
                "labels": {
                    "alertname": "StorageUtilzation",
                    "severity": "Medium"
                },
                "annotations": {
                    "description": "PV or VM storage volume at critical level, needs attention."
                },
                "startsAt": "2018-06-21T05:38:13.313276111Z",
                "endsAt": "2018-06-26T02:57:13.324619624Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=%28%28sum%28container_fs_usage_bytes%29+%2F+%281024+%2A+1024+%2A+1024%29%29+%2F+%28sum%28container_fs_limit_bytes%29+%2F+%281024+%2A+1024+%2A+1024%29%29%29+%2A+100+%3E+0.3&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "a8c43e041cc7e308"
            },
            {
                "labels": {
                    "alertname": "NetworkStarvation",
                    "severity": "Medium"
                },
                "annotations": {
                    "description": "Any NIC in system is sending or receiving large amounts of data constantly over long period of time"
                },
                "startsAt": "2018-06-21T04:48:13.31336221Z",
                "endsAt": "2018-06-26T02:57:13.34727352Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=%28%28sum%28rate%28container_network_transmit_bytes_total%5B1m%5D%29%29+%2B+sum%28rate%28container_network_receive_bytes_total%5B1m%5D%29%29%29+%2F+%281024+%2A+1024+%2A+1024%29%29+%3E+0&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "a8fb5cc757ca3b69"
            },
            {
                "labels": {
                    "alertname": "ApplicationOrServiceFailure",
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
                "annotations": {
                    "description": "One or more pods or endpoint have failed or not responding to health checks/One or more PVCs failed to bind"
                },
                "startsAt": "2018-06-21T04:53:13.313362948Z",
                "endsAt": "2018-06-26T02:57:13.319144159Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "aa9cfede7d063b4a"
            },
            {
                "labels": {
                    "alertname": "MemoryLeakDetection",
                    "severity": "Medium"
                },
                "annotations": {
                    "description": "Average memory use keeps increasing over some time window without decreasing over that same time window"
                },
                "startsAt": "2018-06-21T05:38:13.313276111Z",
                "endsAt": "2018-06-26T02:57:13.319144159Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=rate%28cluster%3Amemory_usage%3Aratio%5B1h%5D%29+%3E+1e-08&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "bf68bc262eaae297"
            },
            {
                "labels": {
                    "alertname": "ALLClusterMasterNodesDown",
                    "instance": "192.168.102.3:6443",
                    "job": "kubernetes-apiservers",
                    "severity": "Critical"
                },
                "annotations": {
                    "description": "All master nodes are not running"
                },
                "startsAt": "2018-06-21T04:53:13.313362948Z",
                "endsAt": "2018-06-26T02:57:13.316816017Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up%7Bjob%3D%22kubernetes-apiservers%22%7D+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "ca9b52b90716783f"
            },
            {
                "labels": {
                    "alertname": "ALLClusterMasterNodesDown",
                    "instance": "192.168.102.14:6443",
                    "job": "kubernetes-apiservers",
                    "severity": "Critical"
                },
                "annotations": {
                    "description": "All master nodes are not running"
                },
                "startsAt": "2018-06-21T04:53:13.313362948Z",
                "endsAt": "2018-06-26T02:57:13.316816017Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up%7Bjob%3D%22kubernetes-apiservers%22%7D+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "cdf0061fffbbdb9b"
            },
            {
                "labels": {
                    "alertname": "MemoryUtilization",
                    "severity": "Info"
                },
                "annotations": {
                    "description": "Overall cluster memory utilization across all nodes"
                },
                "startsAt": "2018-06-21T04:48:13.31336221Z",
                "endsAt": "2018-06-26T02:57:13.319144159Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=cluster%3Amemory_usage%3Aratio+%3E+0.2&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "f5e4ce9d177f4b68"
            },
            {
                "labels": {
                    "alertname": "ApplicationOrServiceFailure",
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
                "annotations": {
                    "description": "One or more pods or endpoint have failed or not responding to health checks/One or more PVCs failed to bind"
                },
                "startsAt": "2018-06-21T04:53:13.313362948Z",
                "endsAt": "2018-06-26T02:57:13.319144159Z",
                "generatorURL": "/prometheus-dashboard/graph?g0.expr=up+%3D%3D+1&g0.tab=1",
                "status": {
                    "state": "active",
                    "silencedBy": [],
                    "inhibitedBy": []
                },
                "receivers": [
                    "default"
                ],
                "fingerprint": "f6ed470a6538870e"
            }
        ]
    })
})