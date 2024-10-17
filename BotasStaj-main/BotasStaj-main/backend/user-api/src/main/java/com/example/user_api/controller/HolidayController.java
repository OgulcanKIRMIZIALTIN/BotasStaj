package com.example.user_api.controller;

import com.example.user_api.model.Holiday;
import com.example.user_api.service.HolidayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Annotates the class as a REST controller, making it capable of handling HTTP requests
@RestController
// Defines the base URL for all endpoints in this controller
@RequestMapping("/api/holidays")
public class HolidayController {

    // Injects the HolidayService to handle holiday-related business logic
    @Autowired
    private HolidayService holidayService;

    /**
     * Handles GET requests to "/api/holidays", returning a list of all holidays.
     *
     * @return List of all holidays
     */
    @GetMapping
    public ResponseEntity<List<Holiday>> getAllHolidays() {
        List<Holiday> holidays = holidayService.getAllHolidays();
        return ResponseEntity.ok(holidays);
    }

    /**
     * Handles POST requests to "/api/holidays", adding a new holiday.
     *
     * @param holiday the Holiday object to be added
     * @return ResponseEntity with the created Holiday object or an error message if a conflict occurs
     */
    @PostMapping
    public ResponseEntity<?> addHoliday(@RequestBody Holiday holiday) {
        try {
            // Call the service to add a new holiday with conflict checking
            Holiday savedHoliday = holidayService.addHoliday(holiday);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedHoliday);
        } catch (IllegalArgumentException e) {
            // Return a 400 Bad Request status if there's a conflict or invalid input
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * Handles DELETE requests to "/api/holidays/{id}", deleting a holiday by its ID.
     *
     * @param id the ID of the holiday to delete
     * @return ResponseEntity with status 204 No Content if deletion is successful, or 404 if not found
     */
    /* This part does not work correct it later */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHoliday(@PathVariable Long id) {
        try {
            // Call the service to delete the holiday
            holidayService.deleteHoliday(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            // Return 404 Not Found if the holiday does not exist
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Handles GET requests to "/api/holidays/{id}", fetching a specific holiday by its ID.
     *
     * @param id the ID of the holiday
     * @return ResponseEntity with the Holiday object if found, or 404 status if not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Holiday> getHolidayById(@PathVariable Long id) {
        return holidayService.getHolidayById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Handles DELETE requests to "/api/holidays/all", deleting all holidays.
     *
     * @return ResponseEntity with status 204 No Content after deletion of all holidays
     */
    @DeleteMapping("/all")
    public ResponseEntity<Void> deleteAllHolidays() {
        holidayService.deleteAllHolidays();
        return ResponseEntity.noContent().build();
    }
}
