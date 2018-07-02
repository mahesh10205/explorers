package com.ge.dashboard.shell.configuration;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("aca")
public class UrlConfiguration {

	@Value("${baseUrl}")
	String baseUrl;

	@Value("${kongPort}")
	String kongPort;
	
	Map<String, Map> apps = new HashMap<String, Map>();

	@PostConstruct
	public void appendBaseUrl() {
		for (String appName : apps.keySet()) {
			Map<String, Map> properties = apps.get(appName);
			Map<String, String> urls = properties.get("urls");
			for(String urlName : urls.keySet()) {
				String url = urls.get(urlName);
				url = getBaseUrl() + url;
				urls.put(urlName, url);
			}
		}
	}

	public Map<String, Map> getApps() {
		return apps;
	}

	public void setApps(Map<String, Map> apps) {
		this.apps = apps;
	}

	@Override
	public String toString() {
		return "UrlConfiguration [apps=" + apps + "]";
	}

	public String getBaseUrl() {
		return baseUrl+":"+kongPort;
		//return "https://3.28.94.16:30443";
	}
}