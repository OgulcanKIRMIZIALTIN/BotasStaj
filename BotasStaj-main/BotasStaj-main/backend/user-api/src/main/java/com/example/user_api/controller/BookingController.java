package com.example.user_api.controller; // Adjust the package name according to your project structure

// Import necessary Spring and project-specific classes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.user_api.model.Booking;
import com.example.user_api.service.BookingService;

import java.util.List;

// Annotates the class as a REST controller, making it capable of handling HTTP requests
@RestController
// Defines the base URL for all endpoints in this controller
@RequestMapping("/api/bookings")
public class BookingController {

    // Injects the BookingService to handle booking-related business logic
    @Autowired
    private BookingService bookingService;

    // Handles GET requests to "/api/bookings", returning a list of all bookings
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // Handles GET requests to "/api/bookings/{id}", returning a specific booking by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        // Tries to find the booking by ID and returns it, or responds with 404 if not found
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Handles POST requests to "/api/bookings", creating a new booking
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            // Saves the new booking and returns it with a 201 Created status
            Booking savedBooking = bookingService.saveBooking(booking);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedBooking);
        } catch (IllegalArgumentException e) {
            // Returns a 400 Bad Request status if there's an error with the request data
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Handles PUT requests to "/api/bookings/{id}", updating an existing booking
    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking bookingDetails) {
        // Finds the booking by ID, updates its details, and saves the updated booking
        return bookingService.getBookingById(id)
                .map(booking -> {
                    booking.setTableNumber(bookingDetails.getTableNumber());
                    booking.setNumPeople(bookingDetails.getNumPeople());
                    booking.setDate(bookingDetails.getDate());
                    booking.setTimePeriod(bookingDetails.getTimePeriod());
                    booking.setDescription(bookingDetails.getDescription());
                    Booking updatedBooking = bookingService.saveBooking(booking);
                    return ResponseEntity.ok(updatedBooking);
                })
                // Returns 404 Not Found if the booking does not exist
                .orElse(ResponseEntity.notFound().build());
    }

    // Handles DELETE requests to "/api/bookings/{id}", deleting a booking by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        // Deletes the booking and returns a 204 No Content status
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}
