const { getSuggestedPrice } = require("../services/pricingModule"); // Replace with the correct path to your price file

describe("getSuggestedPrice Function", () => {
  it("should calculate suggested price and total amount correctly for gallons < 1000, quoteHistory = 0, and state = TX", () => {
    const args = {
      gallons: 900,
      quoteHistory: 0,
      state: "TX",
    };

    const result = getSuggestedPrice(args);

    expect(result.totalAmount).toBeCloseTo(1552.5);
    expect(result.suggestedPricePerGallon).toBeCloseTo(1.725);
  });

  it("should calculate suggested price and total amount correctly for gallons >= 1000, quoteHistory != 0, and state != TX", () => {
    const args = {
      gallons: 1200,
      quoteHistory: 3,
      state: "CA",
    };

    const result = getSuggestedPrice(args);

    expect(result.totalAmount).toBeCloseTo(2070);
    expect(result.suggestedPricePerGallon).toBeCloseTo(1.725);
  });

  // Add more test cases for other scenarios as needed
});
