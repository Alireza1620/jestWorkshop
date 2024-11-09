const {
  setUpDay,
  makeAppointment,
  getAppointment,
  getLengthOfDay,
  getFirstAppointmentTime,
  getLastAppointmentTime,
} = require("./day");

// test that all the appointments on an empty day are available
test("empty day", () => {
  // nothing to set up
  // perform the action we are testing
  setUpDay();
  // check the results are as expected
  const start = getFirstAppointmentTime();
  const length = getLengthOfDay();
  for (let time = start; time < length; time++) {
    expect(getAppointment(time).name).toBe("available");
  }
});

// test that we can make an appointment at the start of an empty day
test("Make Appointment at start of day", () => {
  // set up everything ready for the test
  setUpDay();
  const time = getFirstAppointmentTime();
  // perform the action
  const result = makeAppointment(time, "John", 1);
  // check the results are as expected
  expect(result).toBe(true);
  expect(getAppointment(time).name).toBe("John");
  expect(getAppointment(time).length).toBe(1);
});

// test that we can make an appointment at the start of an empty day
test("Make Appointment before the start of day", () => {
  // set up everything ready for the test
  setUpDay();
  const time = getFirstAppointmentTime() - 1;
  // perform the action
  const result = makeAppointment(time, "John", 1);
  // check the results are as expected
  expect(result).toBe(false);
  expect(getAppointment(getFirstAppointmentTime()).name).toBe("available");
});

// test that we can make an appointment at the end of the day
test("Make Appointment at end of day", () => {
  setUpDay();
  const time = getLastAppointmentTime();
  const result = makeAppointment(time, "Alice", 1);
  expect(result).toBe(true);
  expect(getAppointment(time).name).toBe("Alice");
  expect(getAppointment(time).length).toBe(1);
});

// test that we cannot make an appointment that exceeds the day limit
test("Make Appointment that exceeds day limit", () => {
  setUpDay();
  const time = getLastAppointmentTime();
  const result = makeAppointment(time, "Bob", 2); // Trying to book 2 hours at the last hour
  expect(result).toBe(false);
  expect(getAppointment(time).name).toBe("available"); // Should still be available
});

// test that we can make multiple appointments throughout the day
test("Make multiple appointments", () => {
  setUpDay();
  const result1 = makeAppointment(9, "John", 1); // 9am
  const result2 = makeAppointment(10, "Jane", 1); // 10am
  const result3 = makeAppointment(11, "Doe", 1); // 11am

  expect(result1).toBe(true);
  expect(result2).toBe(true);
  expect(result3).toBe(true);

  expect(getAppointment(9).name).toBe("John");
  expect(getAppointment(10).name).toBe("Jane");
  expect(getAppointment(11).name).toBe("Doe");
});

// test that we cannot make an appointment at a time that is already booked
test("Make Appointment at already booked time", () => {
  setUpDay();
  const time = 10;
  makeAppointment(time, "John", 1); // Book 10am
  const result = makeAppointment(time, "Jane", 1); // Try to book again at 10am
  expect(result).toBe(false);
  expect(getAppointment(time).name).toBe("John"); // Should still be John
});

// test that we cannot make an appointment before the start of the day
test("Make Appointment before the start of the day", () => {
  setUpDay();
  const time = getFirstAppointmentTime() - 1; // 8am
  const result = makeAppointment(time, "John", 1);
  expect(result).toBe(false);
});

// test that we cannot make an appointment after the end of the day
test("Make Appointment after the end of the day", () => {
  setUpDay();
  const time = getLastAppointmentTime() + 1; // 6pm
  const result = makeAppointment(time, "John", 1);
  expect(result).toBe(false);
});