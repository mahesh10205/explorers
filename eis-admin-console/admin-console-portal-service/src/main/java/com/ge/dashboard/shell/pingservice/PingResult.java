package com.ge.dashboard.shell.pingservice;

import java.net.InetAddress;

public class PingResult {

	private final InetAddress address;
	private final PingStatus status;
/**
 * 
 * This is a class that contains a constructor that makes it possible for the the main to get the many different IP address paired with Status
 * @param address
 * This variable gives the address 
 * @param status
 */ 
	public PingResult(InetAddress address, PingStatus status) {
		this.address = address;
		this.status = status;
	}
	/**
	 * 
	 * @return
	 Returns the address to Pingservice.java*/
	public InetAddress getAddress() {
		return address;
	}
	/**
	 * 
	 * @return
	 returns the status to Pingservice.java*/
	public PingStatus getStatus() {
		return status;
	}
}
