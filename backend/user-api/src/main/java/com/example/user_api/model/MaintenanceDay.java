package com.example.user_api.model; // Adjust the package name according to your project structure

// Import necessary JPA annotations for entity mapping
import jakarta.persistence.*;

// Annotates the class as a JPA entity mapped to a database table
@Entity
// Specifies the name of the table in the database
@Table(name = "maintenance_days")
public class MaintenanceDay {

    // Defines the primary key for the entity and specifies the ID generation strategy
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically generates the ID value
    private Long id;

    // Maps the field to a column in the database table, making it non-nullable
    @Column(name = "date", nullable = false)
    private String date; // Ideally, this should be a Date or LocalDate type, but String is used here

    // Maps the field to a column in the database table, making it non-nullable
    // Indicates the area affected by maintenance; values could be 'Both', 'Main', or 'Balcony'
    @Column(name = "area", nullable = false)
    private String area;

    // Getters and Setters for accessing and modifying the fields
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }
}
