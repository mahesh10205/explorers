package com.ge.dashboard.shell.controller;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

public class ElasticSearchServiceTest {

   @Mock
   private HttpUrlConnection connection;

   @InjectMocks
   private ElasticSearchService searchService;

   @Before
   public void setUp() throws Exception {
      MockitoAnnotations.initMocks(this);
   }

   @Test
   public void should_return_bytes_for_json_format() throws IOException {
      // given
      final String startDate = "2018-05-24T03:14:51.293Z";
      final String endDate = "2018-05-25T03:14:51.293Z";
      final String fileNamePrefix = "KibanaLogs_" + startDate + "__" + endDate;
      final String format = "json";
      final String data =
         "{\"took\":238,\"timed_out\":false,\"_shards\":{\"total\":106,\"successful\":106,\"skipped\":0,\"failed\":0}";
      Mockito.when(connection.get(Mockito.anyString())).thenReturn(data);

      // when
      final byte[] bytes = searchService.executeGet(startDate, endDate, format, fileNamePrefix);

      // then
      assertThat(bytes).isEqualTo(data.getBytes());
   }

   @Test
   public void should_return_bytes_for_zip_format() throws Exception {
      // given
      final String startDate = "2018-05-24T03:14:51.293Z";
      final String endDate = "2018-05-25T03:14:51.293Z";
      final String fileNamePrefix = "KibanaLogs_" + startDate + "__" + endDate;
      final String format = "zip";

      final String data =
         "{\"took\":238,\"timed_out\":false,\"_shards\":{\"total\":106,\"successful\":106,\"skipped\":0,\"failed\":0}";
      Mockito.when(connection.get(Mockito.anyString())).thenReturn(data);

      // when
      final byte[] bytes = searchService.executeGet(startDate, endDate, format, fileNamePrefix);

      // then
      assertThat(bytes).isEqualTo(searchService.zipContent(data, fileNamePrefix));
   }

}