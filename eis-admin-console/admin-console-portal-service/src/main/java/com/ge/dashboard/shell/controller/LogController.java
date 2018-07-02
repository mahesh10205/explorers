package com.ge.dashboard.shell.controller;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LogController {

	private static final Logger LOGGER = Logger.getLogger(LogController.class.getName());

	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/log", method = RequestMethod.POST, consumes = "application/json")
	public String logs(@RequestBody List<ConsolePortalLog> logs) {

		for (ConsolePortalLog log : logs) {

			String clientLevel = log.getLevel();

			if (null != clientLevel) {
				Level level = Level.parse(clientLevel);
				LOGGER.log(level, log.getMessage());
			}
		}

		return "Posted logs for backend successfully. \n";
	}
}
