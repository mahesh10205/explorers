package com.ge.dashboard.shell.controller;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.QueryParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ge.dashboard.shell.configuration.UrlConfiguration;

@RestController
public class ACAUrlRestController {
	@Autowired
	UrlConfiguration urlConfig;

	@GetMapping("/applications")
	public ResponseEntity<Object> getUrls(@QueryParam("type") String type) {
		Object retVal = null;

		if (type == null || type.isEmpty())
			type = "array";
		
		Map map = new HashMap();
		map = this.urlConfig.getApps();

		if ("array".equals(type)) {
			retVal = map.values().toArray();
		} else {

			retVal = map;
		}

		return ResponseEntity.ok().body(retVal);
	}
}