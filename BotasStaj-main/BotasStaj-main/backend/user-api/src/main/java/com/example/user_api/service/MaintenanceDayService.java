package com.example.user_api.service;

import com.example.user_api.model.MaintenanceDay;
import com.example.user_api.repository.HolidayRepository;
import com.example.user_api.repository.MaintenanceDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaintenanceDayService {

    @Autowired
    private MaintenanceDayRepository maintenanceDayRepository;

    @Autowired
    private HolidayRepository holidayRepository;

    /**
     * Fetch all maintenance days from the repository.
     *
     * @return List of all maintenance days
     */
    public List<MaintenanceDay> getAllMaintenanceDays() {
        return maintenanceDayRepository.findAll();
    }

    /**
     * Add a new maintenance day after checking for conflicts with existing maintenance days and holidays.
     *
     * @param maintenanceDay the MaintenanceDay object to be added
     * @return the saved MaintenanceDay object
     * @throws IllegalArgumentException if a conflict is detected with existing maintenance days or holidays
     */
    public MaintenanceDay addMaintenanceDay(MaintenanceDay maintenanceDay) {
        // Check for conflicts before saving the new maintenance day
        boolean hasConflict = maintenanceDayRepository.existsByDateAndArea(maintenanceDay.getDate(), maintenanceDay.getArea()) ||
                holidayRepository.existsByDateAndArea(maintenanceDay.getDate(), maintenanceDay.getArea());

        if (hasConflict) {
            throw new IllegalArgumentException("Conflict detected: The date already has a maintenance day or holiday in the specified area.");
        }

        return maintenanceDayRepository.save(maintenanceDay);
    }

    /**
     * Delete a maintenance day by its ID.
     *
     * @param id the ID of the maintenance day to delete
     * @throws IllegalArgumentException if the maintenance day with the given ID does not exist
     */
    public void deleteMaintenanceDay(Long id) {
        if (maintenanceDayRepository.existsById(id)) {
            maintenanceDayRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Maintenance day with the given ID does not exist.");
        }
    }

    /**
     * Fetch a specific maintenance day by its ID.
     *
     * @param id the ID of the maintenance day
     * @return an Optional containing the MaintenanceDay if found, otherwise empty
     */
    public Optional<MaintenanceDay> getMaintenanceDayById(Long id) {
        return maintenanceDayRepository.findById(id);
    }

    /**
     * Delete all maintenance days in the system.
     */
    public void deleteAllMaintenanceDays() {
        maintenanceDayRepository.deleteAll();
    }
}
