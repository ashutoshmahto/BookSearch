import { expect } from "chai";
import { formatData } from "../utils";

describe("#utils formatData", () => {
  it("should format data correctly when empty object is passed", () => {
    expect(formatData({})).to.be.deep.equal({});
  });

  it("should format data correctly when contains single object", () => {
    const search = {
      query: "java"
    };
    expect(formatData(search)).to.be.deep.equal(search);
  });

  it("should format data correctly when contains complex object in array", () => {
    const search = {
      query: "java",
      results: [
        {
          work: [
            {
              average_rating: ["4.56"]
            }
          ]
        }
      ]
    };

    const formattedData = {
      query: "java",
      results: {
        work: {
          average_rating: "4.56"
        }
      }
    };
    expect(formatData(search)).to.be.deep.equal(formattedData);
  });
  it("should format data correctly when contains complex object with id in array", () => {
    const search = {
      query: "java",
      results: [
        {
          work: [
            {
              average_rating: ["4.56"],
              id: [
                {
                  $: {
                    type: "integer"
                  },
                  _: "1234"
                }
              ]
            }
          ]
        }
      ]
    };

    const expectedData = {
      query: "java",
      results: {
        work: {
          average_rating: "4.56",
          id: "1234"
        }
      }
    };

    const formattedData = formatData(search);
    expect(formattedData).to.be.deep.equal(expectedData);
    expect(typeof formattedData.results.work).to.be.equal("object");
    expect(Array.isArray(formattedData.results.work)).to.be.equal(false);
  });

  it("should format data correctly when contains complex object with id in array", () => {
    const search = {
      query: "java",
      results: [
        {
          work: [
            {
              average_rating: ["4.56"],
              id: [
                {
                  $: {
                    type: "integer"
                  },
                  _: "1234"
                }
              ]
            },
            {
              average_rating: ["4.09"],
              id: [
                {
                  $: {
                    type: "integer"
                  },
                  _: "1235"
                }
              ]
            }
          ]
        }
      ]
    };

    const expectedData = {
      query: "java",
      results: {
        work: [
          {
            average_rating: "4.56",
            id: "1234"
          },
          {
            average_rating: "4.09",
            id: "1235"
          }
        ]
      }
    };
    const formattedData = formatData(search);
    expect(formattedData).to.be.deep.equal(expectedData);
    expect(typeof formattedData.results.work).to.be.equal("object");
    expect(Array.isArray(formattedData.results.work)).to.be.equal(true);
  });
});
