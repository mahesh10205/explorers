package com.ge.dashboard.shell.controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLStreamHandlerFactory;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class HttpUrlConnectionTest {

   private static HttpUrlStreamHandler httpUrlStreamHandler;

   @InjectMocks
   private HttpUrlConnection connection;

   @BeforeClass
   public static void setupURLStreamHandlerFactory() {
      URLStreamHandlerFactory urlStreamHandlerFactory = mock(URLStreamHandlerFactory.class);
      URL.setURLStreamHandlerFactory(urlStreamHandlerFactory);

      httpUrlStreamHandler = new HttpUrlStreamHandler();
      when(urlStreamHandlerFactory.createURLStreamHandler("http")).thenReturn(httpUrlStreamHandler);
   }

   @Before
   public void setupAndReset() {
      MockitoAnnotations.initMocks(this);
      httpUrlStreamHandler.resetConnections();
   }

   @Test
   public void should_return_response_for_get_request() throws IOException {
      // given
      HttpURLConnection urlConnection = mock(HttpURLConnection.class);
      when(urlConnection.getResponseCode()).thenReturn(200);
      when(urlConnection.getOutputStream()).thenReturn(new ByteArrayOutputStream());
      when(urlConnection.getInputStream()).thenReturn(new ByteArrayInputStream("Testing http get connection".getBytes()));
      httpUrlStreamHandler.addConnection(new URL("http://3.28.94.16:32767/_search"), urlConnection);
      connection.setUrl(new URL("http://3.28.94.16:32767/_search"));

      // when
      final String hello_world = connection.get("hello world");

      // then
      assertThat(hello_world).isEqualTo("Testing http get connection\n");
   }
}