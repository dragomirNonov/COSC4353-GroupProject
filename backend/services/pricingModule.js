module.exports.getSuggestedPrice = (args) => {
  // Constants for factors and margins
  const GALLONS_REQUESTED_FACTOR = args.gallons < 1000 ? 0.03 : 0.02;
  const RATE_HISTORY_FACTOR = args.quoteHistory === 0 ? 0 : 0.01;
  const LOCATION_FACTOR = args.state === "TX" ? 0.02 : 0.04;
  const MARGIN =
    1.5 *
    (LOCATION_FACTOR - RATE_HISTORY_FACTOR + GALLONS_REQUESTED_FACTOR + 0.1);

  // Calculate suggested price and total amount
  const suggestedPricePerGallon = 1.5 + MARGIN;
  const totalAmount = args.gallons * suggestedPricePerGallon;

  // Return the results
  return {
    totalAmount: totalAmount,
    suggestedPricePerGallon: suggestedPricePerGallon,
  };
};
