let users = [
  // Only 2 first work
  // Password is the same as the username
  {
    id: 300,
    isProfileComplate: true,
    firstName: "Dragomir",
    lastName: "Nonov",
    username: "asd",
    password: "$2b$10$wDDbsIWD7wZYaYM0l6vbS.FnMtxD25yZ.GtOjy.xLsEL7AtJsyvX6",
    address1: "123 Main St",
    address2: "Apt 456",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  },  
  {
    id: 400,
    isProfileComplate: false,
    firstName: "John",
    lastName: "Doe",
    username: "qwe",
    password: "$2b$10$Fp2JLEUjN3gI89IlH0uLauuVrQnsWdhDqHGce74kOEBVDF3wU2le.",
    address1: "123 Main St",
    address2: "Apt 456",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  },

  // These dont as of now
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    address1: "456 Elm St",
    address2: "Apt 789",
    city: "Othercity",
    state: "NY",
    zip: "67890",
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    address1: "789 Oak St",
    address2: "Apt 123",
    city: "Anothercity",
    state: "TX",
    zip: "54321",
  },
  {
    id: 4,
    firstName: "Alice",
    lastName: "Brown",
    address1: "567 Pine St",
    address2: "Apt 321",
    city: "Newville",
    state: "FL",
    zip: "98765",
  },
  {
    id: 5,
    firstName: "Ella",
    lastName: "Garcia",
    address1: "890 Cedar St",
    address2: "Apt 789",
    city: "Sometown",
    state: "WA",
    zip: "45678",
  },
  {
    id: 6,
    firstName: "David",
    lastName: "Lee",
    address1: "234 Birch St",
    address2: "Apt 567",
    city: "Yourtown",
    state: "GA",
    zip: "23456",
  },
  {
    id: 7,
    firstName: "Linda",
    lastName: "Clark",
    address1: "456 Oak St",
    address2: "Apt 234",
    city: "Hometown",
    state: "NJ",
    zip: "87654",
  },
  {
    id: 8,
    firstName: "Michael",
    lastName: "Wright",
    address1: "345 Maple St",
    address2: "Apt 890",
    city: "Anyville",
    state: "MI",
    zip: "34567",
  },
  {
    id: 9,
    firstName: "Sarah",
    lastName: "Turner",
    address1: "678 Birch St",
    address2: "Apt 123",
    city: "Smalltown",
    state: "PA",
    zip: "65432",
  },
  {
    id: 10,
    firstName: "William",
    lastName: "Harris",
    address1: "789 Cedar St",
    address2: "Apt 456",
    city: "Bigtown",
    state: "IL",
    zip: "43210",
  },
];

module.exports = users;
