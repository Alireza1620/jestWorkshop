const {
  setUpDay,
  makeAppointment,
  getAppointment,
  getLengthOfDay,
  getFirstAppointmentTime,
  getLastAppointmentTime,
  printAppointments,
} = require("./day");

// The following is just a demo of how to use the functions.
// Remember to call setUpDay() before making any appointments.
// If you want to debug a test, you can change the code below to copy the test code.
console.log("Day Demo.  Setting up an empty day.");
setUpDay();
printAppointments();
console.log("Making an appointment for John at 11am.");
makeAppointment(11, "John", 1);
makeAppointment(12, "John", 2);
makeAppointment(13, "John", 1);
makeAppointment(14, "John", 5);
makeAppointment(16, "John", 4);
//Next 2 lines are special tests:
makeAppointment(17, "John", 5);
//makeAppointment(17, "John", 1);

//this is a test to see if the slot is already occupied will it change or not:
makeAppointment(16, "Steve", 5);
printAppointments();
