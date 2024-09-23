package com.example.user_api.repository; // Adjust the package name according to your project structure

// Import necessary classes for JPA repository functionality
import com.example.user_api.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

// Defines a repository interface for the Booking entity
// Extends JpaRepository to provide CRUD operations and more for the Booking entity
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // JpaRepository provides built-in methods like save, findAll, findById, deleteById, etc.
    // No need to define additional methods unless custom queries are needed
}
