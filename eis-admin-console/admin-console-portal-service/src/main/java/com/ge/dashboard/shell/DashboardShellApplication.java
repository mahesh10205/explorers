package com.ge.dashboard.shell;

//import org.apache.coyote.http2.Http2Protocol;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.undertow.UndertowEmbeddedServletContainerFactory;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.client.RestTemplate;

import io.undertow.UndertowOptions;

@SpringBootApplication
@EnableZuulProxy
@ComponentScan(basePackages = "com")
public class DashboardShellApplication {

	private static final Logger log = LoggerFactory.getLogger(DashboardShellApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(DashboardShellApplication.class);
	}

	@Bean
	UndertowEmbeddedServletContainerFactory embeddedServletContainerFactory() {
		UndertowEmbeddedServletContainerFactory factory = new UndertowEmbeddedServletContainerFactory();
		factory.addBuilderCustomizers(builder -> builder.setServerOption(UndertowOptions.ENABLE_HTTP2, false));
		return factory;
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
	//
	// @Bean
	// public EmbeddedServletContainerCustomizer tomcatCustomizer() {
	// return (container) -> {
	// if (container instanceof TomcatEmbeddedServletContainerFactory) {
	// ((TomcatEmbeddedServletContainerFactory)
	// container).addConnectorCustomizers((connector) -> {
	// connector.addUpgradeProtocol(new Http2Protocol());
	// });
	// }
	// };
	// }

}