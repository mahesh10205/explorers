package com.ge.dashboard.shell.pingservice;
public enum PingStatus {

       AVAILABLE, UNAVAILABLE; //declared variables
/**
* 
 * @param reachable
* @return if IP address is Available or Unavailable
* 
 * 
 */
       public static PingStatus get(boolean reachable) {
             PingStatus status = PingStatus.AVAILABLE;

             if (!reachable) {
                    status = PingStatus.UNAVAILABLE;
             }

             return status;
       }
}

