import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Pagination from "../Pagination";
import toJson from "enzyme-to-json";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";

chai.use(chaiEnzyme());

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it("should render component correctly", () => {
    const tree = shallow(<Pagination />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});
