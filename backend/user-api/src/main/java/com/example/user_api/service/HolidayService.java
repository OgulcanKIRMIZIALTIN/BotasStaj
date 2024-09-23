package com.example.user_api.service;

import com.example.user_api.model.Holiday;
import com.example.user_api.repository.HolidayRepository;
import com.example.user_api.repository.MaintenanceDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HolidayService {

    @Autowired
    private HolidayRepository holidayRepository;

    @Autowired
    private MaintenanceDayRepository maintenanceDayRepository;

    /**
     * Fetch all holidays from the repository.
     *
     * @return List of all holidays
     */
    public List<Holiday> getAllHolidays() {
        return holidayRepository.findAll();
    }

    /**
     * Add a new holiday after checking for conflicts with existing holidays and maintenance days.
     *
     * @param holiday the Holiday object to be added
     * @return the saved Holiday object
     * @throws IllegalArgumentException if a conflict is detected with existing holidays or maintenance days
     */
    public Holiday addHoliday(Holiday holiday) {
        // Check for conflicts before saving the new holiday
        boolean hasConflict = holidayRepository.existsByDateAndArea(holiday.getDate(), holiday.getArea()) ||
                maintenanceDayRepository.existsByDateAndArea(holiday.getDate(), holiday.getArea());

        if (hasConflict) {
            throw new IllegalArgumentException("Conflict detected: The date already has a holiday or maintenance day in the specified area.");
        }

        return holidayRepository.save(holiday);
    }

    /**
     * Delete a holiday by its ID.
     *
     * @param id the ID of the holiday to delete
     */
    public void deleteHoliday(Long id) {
        if (holidayRepository.existsById(id)) {
            holidayRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Holiday with the given ID does not exist.");
        }
    }

    /**
     * Fetch a specific holiday by its ID.
     *
     * @param id the ID of the holiday
     * @return an Optional containing the Holiday if found, otherwise empty
     */
    public Optional<Holiday> getHolidayById(Long id) {
        return holidayRepository.findById(id);
    }

    /**
     * Delete all holidays in the system.
     */
    public void deleteAllHolidays() {
        holidayRepository.deleteAll();
    }
}
