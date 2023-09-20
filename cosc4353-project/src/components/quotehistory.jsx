import Quote from "./quote";

const QuoteHistory = (props) => {
  //const quotes = [1, 2, 3, 4, 5, 4, 5, 6, 7];

  // Future data from the DB based on the profile that has logged in 
  const arrayOfOrders = [
    {
      requestDate: "2023-09-16",//
      deliveryDate: "2023-09-16",//
      deliveryAddress: "123 Main St, City, State, Zip",//
      gallons: 150,//
      fuelRate: 3.8,//
      amountDue: 570.0,//
      purchased: false,//
    },
    {
      requestDate: "2023-09-17",
      deliveryDate: "2023-09-18",
      deliveryAddress: "456 Elm Rd, Another City, State, Zip",
      gallons: 200,
      fuelRate: 3.5,
      amountDue: 700.0,
      purchased: true,
    },
    {
      requestDate: "2023-09-19",
      deliveryDate: "2023-09-20",
      deliveryAddress: "789 Oak Ave, Yet Another City, State, Zip",
      gallons: 180,
      fuelRate: 3.9,
      amountDue: 702.0,
      purchased: false,
    },
    {
      requestDate: "2023-09-21",
      deliveryDate: "2023-09-22",
      deliveryAddress: "1011 Pine Dr, Different City, State, Zip",
      gallons: 160,
      fuelRate: 4.0,
      amountDue: 640.0,
      purchased: true,
    },
    {
      requestDate: "2023-09-23",
      deliveryDate: "2023-09-24",
      deliveryAddress: "1313 Cedar Ln, Another State, Zip",
      gallons: 140,
      fuelRate: 3.7,
      amountDue: 518.0,
      purchased: false,
    },
    {
      requestDate: "2023-09-25",
      deliveryDate: "2023-09-26",
      deliveryAddress: "1515 Maple Rd, City, State, Zip",
      gallons: 170,
      fuelRate: 3.6,
      amountDue: 612.0,
      purchased: true,
    },
    {
      requestDate: "2023-09-27",
      deliveryDate: "2023-09-28",
      deliveryAddress: "1717 Birch Ct, Another City, State, Zip",
      gallons: 190,
      fuelRate: 3.8,
      amountDue: 722.0,
      purchased: false,
    },
    {
      requestDate: "2023-09-29",
      deliveryDate: "2023-09-30",
      deliveryAddress: "1919 Elm St, Yet Another City, State, Zip",
      gallons: 155,
      fuelRate: 3.9,
      amountDue: 604.5,
      purchased: true,
    },
    {
      requestDate: "2023-10-01",
      deliveryDate: "2023-10-02",
      deliveryAddress: "2121 Oak Ave, Different City, State, Zip",
      gallons: 175,
      fuelRate: 4.1,
      amountDue: 717.5,
      purchased: false,
    },
    {
      requestDate: "2023-10-03",
      deliveryDate: "2023-10-04",
      deliveryAddress: "2323 Pine Dr, Another State, Zip",
      gallons: 165,
      fuelRate: 3.7,
      amountDue: 610.5,
      purchased: true,
    },
    
  ];
  
  return (
    
    <div>
      {arrayOfOrders.map((order, index) => (
        <Quote key={index} object={order} /> // Pass the object as a prop
      ))}
    </div>
    /*
    <div className="border">
      {quotes.map((quote, index) => (
        <Quote key={index} quote={<Quote />} />
      ))}
    </div>*/
  );
};

export default QuoteHistory;
