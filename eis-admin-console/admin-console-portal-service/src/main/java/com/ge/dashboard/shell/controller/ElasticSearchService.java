package com.ge.dashboard.shell.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.Instant;
import java.util.Date;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

class ElasticSearchService {
   private HttpUrlConnection connection;

   ElasticSearchService(HttpUrlConnection connection) {
      this.connection = connection;
   }

   byte[] executeGet(String start, String end, String format, String fileName) throws IOException {
      final long startDate = toEpochMilli(start);
      final long endDate = toEpochMilli(end);
      String jsonString =
         "{ \"version\": true, \"size\": 500, \"sort\": [ {\"@timestamp\": {\"order\": \"desc\",\"unmapped_type\": \"boolean\"  }  }],\"_source\": { \"excludes\": []  },\"aggs\": {\"2\": {\"date_histogram\": {\"field\": \"@timestamp\",\"interval\": \"30s\",\"time_zone\": \"America/Chicago\",\"min_doc_count\": 1 }}},\"stored_fields\": [\"*\" ],\"script_fields\": {},\"docvalue_fields\": [\"@timestamp\" ],\"query\": {\"bool\": {\"must\": [ {\"match_all\": {} },{\"range\": {\"@timestamp\": {\"gte\": "
            + startDate
            + ",\"lte\": "
            + endDate
            + ",\"format\": \"epoch_millis\" }}}],\"filter\": [],\"should\": [],\"must_not\": [] }},\"highlight\": {\"pre_tags\": [\"@kibana-highlighted-field@\" ],\"post_tags\": [\"@/kibana-highlighted-field@\" ],\"fields\": {\"*\": {} },\"fragment_size\": 2147483647 }}";

      final ObjectMapper objectMapper = new ObjectMapper();
      final JsonNode json = objectMapper.readTree(jsonString);
      final String content = connection.get(json.toString());
      if (format.equals("zip")) {
         return zipContent(content, fileName);
      }
      return content.getBytes();
   }

   private long toEpochMilli(String time) {
      final Date from = Date.from(Instant.parse(time));
      return from.getTime();
   }

   byte[] zipContent(String content, String fileName) throws IOException {
      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      try (ZipOutputStream zos = new ZipOutputStream(baos)) {

         ZipEntry entry = new ZipEntry(fileName + ".json");
         zos.putNextEntry(entry);
         ByteArrayInputStream bis = new ByteArrayInputStream(content.getBytes());
         byte bytes[] = new byte[2048];
         int bytesRead;
         while ((bytesRead = bis.read(bytes)) != -1) {
            zos.write(bytes, 0, bytesRead);
         }
         zos.closeEntry();
      }
      baos.flush();
      baos.close();
      return baos.toByteArray();
   }

}