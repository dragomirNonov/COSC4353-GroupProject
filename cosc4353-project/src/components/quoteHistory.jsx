import { BrowserRouter as Router, Link } from "react-router-dom";

//data that will be later get from DB
const data = [
  { gallonsRequested: 100, deliveryAddress: "1234 Elm Street, Springfield, IL 62701", deliveryDate: "2023-09-10", pricePerGallon:   30, amountDue: 10000 },
  { gallonsRequested: 250, deliveryAddress: "5678 Oak Avenue, New York, NY 10001", deliveryDate: "2023-09-05", pricePerGallon:      20, amountDue: 9000 },
  { gallonsRequested: 300, deliveryAddress: "4321 Maple Lane, Los Angeles, CA 90001", deliveryDate: "2023-08-30", pricePerGallon:   35, amountDue: 15000 },
  { gallonsRequested: 300, deliveryAddress: "9876 Pine Road, Chicago, IL 60601", deliveryDate: "2023-08-25", pricePerGallon:        40, amountDue: 25000 },
  { gallonsRequested: 200, deliveryAddress: "2468 Cedar Drive, San Francisco, CA 94101", deliveryDate: "2023-08-20", pricePerGallon:25, amountDue: 18000 },
  { gallonsRequested: 200, deliveryAddress: "1357 Birch Court, Miami, FL 33101", deliveryDate: "2023-08-15", pricePerGallon:        60, amountDue: 16000 },
  
]

const QuoteHistory = (props) => {
  return (
    <div className="col">
            <table className="table">
                <tr>
                    <th>Gallons Requested</th>
                    <th>Delivery Address</th>
                    <th>Delivery Date</th>
                    <th>Price/Gallon</th>
                    <th>Total Amount Due</th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.gallonsRequested}</td>
                            <td>{val.deliveryAddress}</td>
                            <td>{val.deliveryDate}</td>
                            <td>{val.pricePerGallon}</td>
                            <td>{val.amountDue}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
};

export default QuoteHistory;
