package com.example.user_api.controller; // Adjust the package name according to your project structure

// Import necessary classes
import com.example.user_api.model.RestaurantTable;
import com.example.user_api.service.RestaurantTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Annotates the class as a REST controller, making it capable of handling HTTP requests
@RestController
// Defines the base URL for all endpoints in this controller
@RequestMapping("/api/tables")
public class RestaurantTableController {

    // Injects the RestaurantTableService to handle table-related business logic
    @Autowired
    private RestaurantTableService restaurantTableService;

    // Handles GET requests to "/api/tables", returning a list of all restaurant tables
    @GetMapping
    public List<RestaurantTable> getAllTables() {
        return restaurantTableService.getAllTables();
    }

    // Handles GET requests to "/api/tables/{id}", returning a specific table by its ID
    @GetMapping("/{id}")
    public ResponseEntity<RestaurantTable> getTableById(@PathVariable Long id) {
        // Finds the table by its ID and returns it, or responds with 404 if not found
        Optional<RestaurantTable> table = restaurantTableService.getTableByNumber(id);
        return table.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Handles POST requests to "/api/tables", creating a new table
    @PostMapping
    public ResponseEntity<RestaurantTable> createTable(@RequestBody RestaurantTable table) {
        try {
            // Saves the new table and returns it with a 201 Created status
            RestaurantTable savedTable = restaurantTableService.saveTable(table);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedTable);
        } catch (IllegalArgumentException e) {
            // Returns a 400 Bad Request status if there's an error with the request data
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Handles PUT requests to "/api/tables/{id}", updating an existing table
    @PutMapping("/{id}")
    public ResponseEntity<RestaurantTable> updateTable(@PathVariable Long id, @RequestBody RestaurantTable tableDetails) {
        // Finds the existing table by its ID
        Optional<RestaurantTable> existingTable = restaurantTableService.getTableByNumber(id);

        // If the table exists, updates its details and saves the updated table
        if (existingTable.isPresent()) {
            RestaurantTable table = existingTable.get();
            table.setTableNumber(tableDetails.getTableNumber());
            table.setMaxCapacity(tableDetails.getMaxCapacity());
            RestaurantTable updatedTable = restaurantTableService.saveTable(table);
            return ResponseEntity.ok(updatedTable);
        } else {
            // Returns 404 Not Found if the table does not exist
            return ResponseEntity.notFound().build();
        }
    }

    // Handles DELETE requests to "/api/tables/{id}", deleting a table by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTable(@PathVariable Long id) {
        // Deletes the table and returns a 204 No Content status
        restaurantTableService.deleteTable(id);
        return ResponseEntity.noContent().build();
    }
}
