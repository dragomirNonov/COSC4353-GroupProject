import Quote from "./quote";

const QuoteHistory = (props) => {
  const quotes = [1, 2, 3, 4, 5, 4, 5, 6, 7];

  return (
    <div className="border">
      {quotes.map((quote, index) => (
        <Quote key={index} quote={<Quote />} />
      ))}
    </div>
  );
};

export default QuoteHistory;
