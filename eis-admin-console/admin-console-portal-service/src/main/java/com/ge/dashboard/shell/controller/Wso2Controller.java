package com.ge.dashboard.shell.controller;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class Wso2Controller {

//	@Value("${preEstablishedRedirectUri}")
//	String preEstablishedRedirectUri;

	@Value("${baseUrl}")
	String baseUrl;

	@Value("${wso2Port}")
	String wso2Port;

	@Value("${kongPort}")
	String kongPort;

//	@Value("${adminConsoleRedirectUri}")
//	String adminConsoleRedirectUri;

	@Value("${serviceProvider}")
	String serviceProvider;

	@Value("${security.oauth2.client.clientId}")
	String client_id;

	@Value("${security.oauth2.client.scope}")
	String scope;

	@Value("${security.oauth2.client.response_type}")
	String response_type;

	@Value("${security.oauth2.client.userAuthorizationUri}")
	String userAuthorizationUri;

	@RequestMapping(value = "/dashboard", method = RequestMethod.GET)
	public ModelAndView tokenAction() {
		String authorize = authrizeEndpoint();
		return new ModelAndView("redirect:" + authorize);
	}

	public String authrizeEndpoint() {

		StringBuffer sb = new StringBuffer();
		try {
			String encodeURL = URLEncoder.encode(baseUrl+":"+kongPort, "UTF-8") + "&nonce=" + client_id;
			sb.append(baseUrl + ":" + wso2Port + userAuthorizationUri);
			sb.append("?client_id=");
			sb.append(client_id);
			sb.append("&response_type=");
			sb.append(response_type);
			sb.append("&scope=");
			sb.append(scope);
			sb.append("&redirect_uri=");
			sb.append(encodeURL);
			// sb.append(encodeURL);
			System.out.println(sb.toString());
			return sb.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/logoutUrl", method = RequestMethod.GET)
	public Map getwso2logoutUrl() {

		StringBuffer sb2 = new StringBuffer();
		sb2.append(baseUrl + ":" + wso2Port + "/commonauth?commonAuthLogout=true&type=oid");
		sb2.append("&commonAuthCallerPath=");
		//sb2.append(adminConsoleRedirectUri);
		sb2.append(baseUrl+":"+kongPort+"/admin-console-login");
		sb2.append("&relyingParty=");
		sb2.append(serviceProvider);

		Map<String, String> map = new HashMap();
		map.put("url", sb2.toString());
		System.out.println(sb2.toString());
		return map;

	}

	@RequestMapping(value = "/redirectUrl", method = RequestMethod.GET)
	public Map getredirectUrl() {
		Map<String, String> map = new HashMap();
		map.put("url", baseUrl+":"+kongPort+"/admin-console-login");
		return map;
	}
}
