package com.example.user_api.service; // Adjust the package name according to your project structure

// Import necessary classes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.user_api.model.Booking;
import com.example.user_api.model.RestaurantTable;
import com.example.user_api.repository.BookingRepository;

import java.util.List;
import java.util.Optional;

// Annotates the class as a Spring service, marking it as a service layer component
@Service
public class BookingService {

    // Injects the BookingRepository to interact with the Booking database table
    @Autowired
    private BookingRepository bookingRepository;

    // Injects the RestaurantTableService to interact with table-related operations
    @Autowired
    private RestaurantTableService restaurantTableService;

    // Retrieves all bookings from the repository
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Retrieves a booking by its ID from the repository
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    // Saves a booking after validating the table exists and the capacity is sufficient
    public Booking saveBooking(Booking booking) {
        // Checks if the table exists and if the number of people does not exceed its capacity
        Optional<RestaurantTable> table = restaurantTableService.getTableByNumber(booking.getTableNumber());

        // Validates that the table exists and the booking does not exceed the table's capacity
        if (table.isPresent() && booking.getNumPeople() <= table.get().getMaxCapacity()) {
            // Saves the booking to the repository
            return bookingRepository.save(booking);
        } else {
            // Throws an exception if validation fails
            throw new IllegalArgumentException("The table does not exist or the number of people exceeds the table capacity.");
        }
    }

    // Deletes a booking by its ID from the repository
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
