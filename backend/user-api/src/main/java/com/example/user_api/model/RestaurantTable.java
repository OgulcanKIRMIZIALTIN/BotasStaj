package com.example.user_api.model; // Adjust the package name according to your project structure

// Import necessary JPA annotations for entity mapping
import jakarta.persistence.*;

// Annotates the class as a JPA entity mapped to a database table
@Entity
// Specifies the name of the table in the database
@Table(name = "restaurant_table")
public class RestaurantTable {

    // Defines the primary key for the entity and specifies the ID generation strategy
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically generates the ID value
    private Long id;

    // Maps the field to a column in the database table, making it unique and non-nullable
    @Column(name = "table_number", unique = true, nullable = false)
    private Integer tableNumber;

    // Maps the field to a column in the database table, making it non-nullable
    @Column(name = "max_capacity", nullable = false)
    private Integer maxCapacity;

    // Getters and Setters for accessing and modifying the fields
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTableNumber() {
        return tableNumber;
    }

    public void setTableNumber(Integer tableNumber) {
        this.tableNumber = tableNumber;
    }

    public Integer getMaxCapacity() {
        return maxCapacity;
    }

    public void setMaxCapacity(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
    }
}
