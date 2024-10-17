package com.example.user_api.config; // Adjust the package name according to your project structure

// Importing necessary Spring Framework classes for configuration
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Annotates this class as a configuration class, allowing Spring to recognize and apply it
@Configuration
public class WebConfig implements WebMvcConfigurer { // Implements WebMvcConfigurer to customize Spring MVC configuration

    // Overriding the addCorsMappings method to define CORS (Cross-Origin Resource Sharing) settings
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Adding CORS mappings to allow requests from specified origins and methods
        registry.addMapping("/**") // Applies CORS settings to all endpoints ("/**" means all paths)
                .allowedOrigins("http://localhost:4200") // Allows requests from the specified origin, in this case, the Angular app running at this URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS"); // Specifies which HTTP methods are allowed
    }
}
