export interface Booking {
  // Unique identifier for the booking, can be null if not yet created
  id: number | null;

  // The table number associated with the booking, can be null if not yet assigned
  tableNumber: number | null;

  // The number of people for the booking, can be null if not specified
  numPeople: number | null;

  // The date of the booking in string format, can be null if not specified
  date: string | null;

  // The time period for the booking, represented as one of 'Sabah', 'Öğlen', or 'Akşam', or null
  timePeriod: 'Sabah' | 'Öğlen' | 'Akşam' | null;

  // A description or additional notes for the booking, can be null if not provided
  description: string | null;

  // Optional property indicating if the booking is in editing mode
  editing?: boolean;

  // Temporary property for storing the time period during editing
  timePeriodTemp?: string;

  // Temporary property for storing the table number during editing
  tableNumberTemp?: number | null;

  // Temporary property for storing the number of people during editing
  numPeopleTemp?: number | null;

  // Temporary property for storing the date during editing
  dateTemp?: string;

  // Temporary property for storing the description during editing
  descriptionTemp?: string;
}
