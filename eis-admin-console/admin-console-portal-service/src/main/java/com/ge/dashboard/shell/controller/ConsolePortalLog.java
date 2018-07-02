package com.ge.dashboard.shell.controller;

public class ConsolePortalLog {
	   private String message;
	   private String level;

	   public String getLevel() {
	      return level;
	   }

	   public void setLevel(String level) {
	      this.level = level;
	   }

	   @Override
	   public String toString() {
	      return "Log{" +
	         "level=" + level +'\'' +"message='" + message +
	         '}';
	   }

	   public String getMessage() {
	      return message;
	   }

	   public void setMessage(String message) {
	      this.message = message;
	   }
	}

