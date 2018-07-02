Spring Boot Application.

Overview

Add VM Argumensts

-Dk8sUrl=https://3.28.94.59:30000/#!/overview?namespace=default 
-DtelemeteryUrl=http://3.28.94.59:31798/targets  
-DtitaniumUrl=http://3.28.93.151/admin  
-DgrafanaUrl=http://3.28.94.59:30002/dashboard/db/kubernetes-all-nodes?orgId=1  
-DkibanaUrl=http://3.28.94.20:8001/api/v1/proxy/namespaces/kube-system/services/kibana-logging/app/kibana#/discover?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-15m,mode:quick,to:now))&_a=(columns:!(_source),index:'logstash-*',interval:auto,query:(query_string:(analyze_wildcard:!t,query:'*')),sort:!('@timestamp',desc)) 
-DdeviceRegistryUrl=http://3.204.43.222:30808/all-devices  
-DprometheusUrl=http://3.28.94.59:31798/graph#%5B%7B%22range_input%22%3A%221h%22%2C%22expr%22%3A%22scrape_duration_seconds%22%2C%22tab%22%3A0%7D%5D
-DidentityUrl=http://3.28.93.151:5000/v3/auth/tokens -DdicomDataListingUrl=http://3.204.43.150:32018/dicomlisting

Start your server as a simple Spring boot  application