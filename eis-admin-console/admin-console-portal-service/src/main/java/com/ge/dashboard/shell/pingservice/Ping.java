package com.ge.dashboard.shell.pingservice;

import java.io.IOException;
import java.net.InetAddress;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Ping implements Callable<PingResult> {

              private static final Logger LOGGER = Logger.getLogger(Ping.class.getName());

              private final InetAddress address; //declared variable
              private final long timeout; //declared variable
              private final TimeUnit timeUnit; //declared variable
/**
* 
 * @param address
* @param timeout
* @param timeUnit
*/
              public Ping(InetAddress address, long timeout, TimeUnit timeUnit) {
                             this.address = address;
                             this.timeout = timeout;
                             this.timeUnit = timeUnit;
              }

              @Override
public PingResult call() throws Exception {
                             PingResult pingResult = null; //declaring PingResult is null at first

                             try {
                                           LOGGER.log(Level.INFO, "Checking if " + address.toString() + " is reachable, (timeout of " + timeout + " " + timeUnit + ")");
                                           boolean reachable = address.isReachable((int) TimeUnit.MILLISECONDS.convert(timeout, timeUnit));
                                           pingResult = new PingResult(address, PingStatus.get(reachable));
                                           LOGGER.log(Level.INFO, address.toString() + " is " + pingResult.getStatus());
                             } catch (IOException e) {
                                           e.printStackTrace();
                             }

                             return pingResult;
              }

}
