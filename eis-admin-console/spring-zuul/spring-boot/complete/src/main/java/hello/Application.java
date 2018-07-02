package hello;

import java.util.Arrays;
import org.slf4j.LoggerFactory;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.undertow.UndertowEmbeddedServletContainerFactory;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import ch.qos.logback.classic.Logger;
import io.undertow.UndertowOptions;

@SpringBootApplication
@EnableZuulProxy
public class Application {
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
       }
       @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
              return args -> {
            	  	System.out.println("Let's inspect the beans provided by Spring Boot:");
                     String[] beanNames = ctx.getBeanDefinitionNames();
                     Arrays.sort(beanNames);
                     for (String beanName : beanNames) {
                           System.out.println(beanName);
                     }
              };
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

}
