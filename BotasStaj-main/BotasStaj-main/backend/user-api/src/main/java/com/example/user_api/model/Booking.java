package com.example.user_api.model; // Adjust the package name according to your project structure

// Import necessary JPA annotations for entity mapping
import jakarta.persistence.*;

// Annotates the class as a JPA entity mapped to a database table
@Entity
// Specifies the name of the table in the database
@Table(name = "bookings")
public class Booking {

    // Defines the primary key for the entity and specifies the ID generation strategy
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically generates the ID value
    private Long id;

    // Maps the field to a column in the database table and specifies the column name
    @Column(name = "table_number")
    private Integer tableNumber;

    @Column(name = "num_people")
    private Integer numPeople;

    @Column(name = "date")
    private String date; // Ideally, this should be a Date or LocalDate type, but String is used here

    @Column(name = "time_period")
    private String timePeriod;

    @Column(name = "description")
    private String description;

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

    public Integer getNumPeople() {
        return numPeople;
    }

    public void setNumPeople(Integer numPeople) {
        this.numPeople = numPeople;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTimePeriod() {
        return timePeriod;
    }

    public void setTimePeriod(String timePeriod) {
        this.timePeriod = timePeriod;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
