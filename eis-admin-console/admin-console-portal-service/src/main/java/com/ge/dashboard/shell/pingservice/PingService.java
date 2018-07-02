package com.ge.dashboard.shell.pingservice;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PingService {
	private static final Logger LOGGER = Logger.getLogger(PingService.class.getName());
	private static final long DEFAULT_TIMEOUT = 5;
	private static final TimeUnit DEFAULT_TIME_UNIT = TimeUnit.SECONDS;
	private static final Map<InetAddress, PingService> PingAddress = null;

	private final int numberOfSimultaneousPings;
	private final long timeout;
	private final TimeUnit timeUnit;

	private ExecutorService pool = null;

	
	/**
	 * Ths a constructor for the ping service object to reference too
	 */
	public PingService() {
		this(10);
	}

	/**
	 * This is a constructor that takes in the number of simultaneous pings 
	 * @param numberOfSimultaneousPings
	 */
	
	public PingService(final int numberOfSimultaneousPings) {
		this(numberOfSimultaneousPings, DEFAULT_TIMEOUT, DEFAULT_TIME_UNIT);
	}

	/**
	 * 
	 * @param numberOf
	 * This is a constructor that takes in the numberOfSimultaneousPings
	 * @param timeout
	 * takes in when PingService timeouts
	 * @param timeUnit
	 * takes in the timeUnit 
	 * 
	 */
	public PingService(final int numberOfSimultaneousPings, long timeout, TimeUnit timeUnit) {
		this.numberOfSimultaneousPings = numberOfSimultaneousPings;
		this.timeout = timeout;
		this.timeUnit = timeUnit;
	}

	/**
	 * If the pool is not null then the program will shut down , else "Pingservice thread has already been cleared"
	 * @throws InterruptedException
	 */
	public void shutdown() throws InterruptedException {
		if (null != pool) {
			LOGGER.log(Level.INFO, "PingService thread pool shutting down");
			pool.shutdown();
			pool.awaitTermination(1, TimeUnit.SECONDS);
		} else {
			LOGGER.log(Level.WARNING, "PingService thread pool has already been cleared");
		}

		pool = null;
	}

	/**
	 * Order is maintained 
	 * This Webannontationlinks the "GET HTTP /ping command to the method in java for execution"
	 * @param addresses
	 * takes in the array of IP adress and maps ech one with their status using Map <key, value>
	 * @return
	 * returns the array of IP adresses to the server 
	 * @throws UnknownHostException
	 * @throws IOException
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */ 
	
	@CrossOrigin(origins = "*")
		@RequestMapping(value = "/ping", method = RequestMethod.GET)
		
         public Map<String, PingStatus> ping(@RequestParam("ip") String... addresses)
		
        		 throws UnknownHostException, IOException, InterruptedException, ExecutionException {
				return ping(PingService.toInetAddress(addresses));
			} 
		 

	/**
	 * Order is maintained
	 * 
	 * @param addresses
	 * @return
	 * @throws IOException
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	public Map<String, PingStatus> ping(InetAddress... addresses)
			throws IOException, InterruptedException, ExecutionException {
		LOGGER.log(Level.INFO,
				"New thread pool being created, supporting " + numberOfSimultaneousPings + " simultaneous pings");
		pool = Executors.newFixedThreadPool(numberOfSimultaneousPings);
		Map<String, PingStatus> statuses = new LinkedHashMap<String, PingStatus>();

		

				
					// Pre-populate each status as unavailable
					for(InetAddress address : addresses) {
						statuses.put(address.getHostAddress(), PingStatus.UNAVAILABLE);
					}

					Set<Future<PingResult>> futures = new LinkedHashSet<Future<PingResult>>();

					for (InetAddress address : addresses) {
						Future<PingResult> future = ping(address);
						futures.add(future);
					}

					for (Future<PingResult> future : futures) {
						PingResult result = future.get();
						if(null != result) {
							statuses.put(result.getAddress().getHostAddress(), result.getStatus());
						}
					}

					return statuses; 
			 

	}

	/**
	 * 
	 * @param address
	 * @return
	 * @throws IOException
	 */
	private Future<PingResult> ping(final InetAddress address) throws IOException {
		LOGGER.log(Level.INFO, "Issuing ping for " + address.toString());
		return pool.submit(new Ping(address, timeout, timeUnit));
	}

	/** 
	 * Order is maintained
	 * 
	 * @param addresses
	 * @return
	 * @throws UnknownHostException
	 */
	private static InetAddress[] toInetAddress(String... addresses) throws UnknownHostException {
		Set<InetAddress> inetAddresses = new LinkedHashSet<InetAddress>();

		for (String address : addresses) {
			inetAddresses.add(InetAddress.getByName(address));
		}

		return inetAddresses.toArray(new InetAddress[inetAddresses.size()]);
	}


//	public static void main(String[] args) throws IOException, InterruptedException, ExecutionException {
//
//		String[] addresses = new String[] { "3.28.94.16", "3.28.94.24", "1.28.94.24", "3.28.94.16", "1.28.94.16" };
//
//		PingService pingService = new PingService(10);
//
//		long startTime = System.currentTimeMillis();
//		Map<String, PingStatus> statuses = pingService.ping(addresses);
//		long elapsedTime = System.currentTimeMillis() - startTime;
//
//		LOGGER.log(Level.INFO, "\n================ Results ================");
//		for (String addr : statuses.keySet()) {
//			LOGGER.log(Level.INFO, addr.toString() + " - " + statuses.get(addr));
//		}
//		LOGGER.log(Level.INFO, "=========================================\n");
//
//		LOGGER.log(Level.INFO, "--- " + elapsedTime);
//
//		pingService.shutdown();
//
//	}

}
