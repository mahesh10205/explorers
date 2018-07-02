package com.ge.dashboard.shell.controller;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

class HttpUrlConnection {

   void setUrl(URL url) {
      this.url = url;
   }

   private URL url;

   HttpUrlConnection(URL url) {
      this.url = url;
   }

   String get(String data) throws IOException {
      HttpURLConnection httpConnection = (HttpURLConnection) url.openConnection();
      httpConnection.setDoOutput(true);

      httpConnection.setRequestMethod("GET");
      httpConnection.setRequestProperty("Content-Type", "application/json");

      // Writes the JSON parsed as string to the connection
      DataOutputStream wr = new DataOutputStream(httpConnection.getOutputStream());
      wr.write(data.getBytes());
      Integer responseCode = httpConnection.getResponseCode();

      BufferedReader bufferedReader = null;
      StringBuilder content = new StringBuilder();
      try {
         // Creates a reader buffer
         if (responseCode > 199 && responseCode < 300) {
            bufferedReader = new BufferedReader(new InputStreamReader(httpConnection.getInputStream()));
         } else {
            bufferedReader = new BufferedReader(new InputStreamReader(httpConnection.getErrorStream()));
         }

         String line;
         while ((line = bufferedReader.readLine()) != null) {
            content.append(line).append("\n");
         }
         return content.toString();
      } finally {
         if (bufferedReader != null) {
            bufferedReader.close();
         }
         httpConnection.disconnect();
      }
   }
}
