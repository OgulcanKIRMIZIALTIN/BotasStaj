package com.example.user_api.controller; // Adjust the package name according to your project structure

// Import necessary classes
import com.example.user_api.model.MaintenanceDay;
import com.example.user_api.service.MaintenanceDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Annotates the class as a REST controller, making it capable of handling HTTP requests
@RestController
// Defines the base URL for all endpoints in this controller; double-check the URL path for accuracy
@RequestMapping("/api/maintenanceDays")
public class MaintenanceDayController {

    // Injects the MaintenanceDayService to handle maintenance day-related business logic
    @Autowired
    private MaintenanceDayService maintenanceDayService;

    // Handles GET requests to "/api/maintenanceDays", returning a list of all maintenance days
    @GetMapping
    public List<MaintenanceDay> getAllMaintenanceDays() {
        return maintenanceDayService.getAllMaintenanceDays();
    }

    // Handles POST requests to "/api/maintenanceDays", adding a new maintenance day
    @PostMapping
    public MaintenanceDay addMaintenanceDay(@RequestBody MaintenanceDay maintenanceDay) {
        // Calls the service to add a new maintenance day and returns the added maintenance day
        return maintenanceDayService.addMaintenanceDay(maintenanceDay);
    }

    // Handles DELETE requests to "/api/maintenanceDays/{id}", deleting a maintenance day by its ID
    @DeleteMapping("/{id}")/* This part does not work correct it later */
    public ResponseEntity<Void> deleteMaintenanceDay(@PathVariable Long id) {
        // Calls the service to delete the maintenance day and returns a 204 No Content status
        maintenanceDayService.deleteMaintenanceDay(id);
        return ResponseEntity.noContent().build();
    }
}
