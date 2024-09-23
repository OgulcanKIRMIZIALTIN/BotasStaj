package com.example.user_api.repository;

import com.example.user_api.model.MaintenanceDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Annotates this interface as a repository component, allowing Spring to recognize it during component scanning
@Repository
public interface MaintenanceDayRepository extends JpaRepository<MaintenanceDay, Long> {

    /**
     * Checks if a maintenance day exists by date and area.
     *
     * @param date the date of the maintenance day in YYYY-MM-DD format
     * @param area the area affected by the maintenance ('Both', 'Main', or 'Balcony')
     * @return true if a maintenance day exists with the specified date and area, false otherwise
     */
    boolean existsByDateAndArea(String date, String area);
}
