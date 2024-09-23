package com.example.user_api; // Adjust the package name according to your project structure

// Import necessary Spring Boot classes
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Annotates the class as a Spring Boot application entry point
@SpringBootApplication
public class UserApiApplication {

	// Main method that serves as the entry point for the Spring Boot application
	public static void main(String[] args) {
		// Launches the application by running the Spring Boot framework
		SpringApplication.run(UserApiApplication.class, args);
	}
}
