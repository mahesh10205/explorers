package com.ge.dashboard.shell.controller;

import java.io.IOException;
import java.net.URL;
import java.util.Calendar;
import java.util.TimeZone;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KibanaElasticSearchController {

   @Autowired
   private Environment env;

   @CrossOrigin(origins = "*")
   @RequestMapping(value = "/search", method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
   public void search(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate,
      HttpServletResponse response, @RequestParam("format") String format)
      throws IOException {
      String fileNamePrefix = "KibanaLogs_" + startDate + "__" + endDate;
      System.out.println("Testing for export logs");
      ElasticSearchService elasticSearchService = new ElasticSearchService(new HttpUrlConnection(new URL(env.getProperty(Utils.ELASTIC_SEARCH_URL, "#"))));
      final byte[] bytes = elasticSearchService.executeGet(startDate, endDate, format, fileNamePrefix);
      //final byte[] bytes = elasticSearchService.executeGet(env.getProperty(Utils.ELASTIC_SEARCH_URL, "http://3.28.94.16:32767/_search", startDate, endDate, format, fileNamePrefix));
      System.out.println("Testing for export logs inside execute method");
      response.setHeader("Content-Disposition", "attachment; filename=" + fileNamePrefix + "." + format);
      response.getOutputStream().write(bytes);
      response.getOutputStream().flush();
   }

   @RequestMapping(value = "/timezone", method = RequestMethod.GET)
   public String timezone() {
      Calendar c = Calendar.getInstance();
      TimeZone tz = c.getTimeZone();
      //System.out.println(tz.getDisplayName());
      return tz.getDisplayName().toString();
   }
}
