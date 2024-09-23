package com.example.user_api.repository;

import com.example.user_api.model.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Annotates this interface as a repository component, allowing Spring to recognize it during component scanning
@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long> {

    /**
     * Checks if a holiday exists by date and area.
     *
     * @param date the date of the holiday in YYYY-MM-DD format
     * @param area the area affected by the holiday ('Both', 'Main', or 'Balcony')
     * @return true if a holiday exists with the specified date and area, false otherwise
     */
    boolean existsByDateAndArea(String date, String area);
}
