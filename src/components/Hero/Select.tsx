import React from "react";
import "./Select.scss";
import Item from "./Item";

export interface Props {}
interface StaticComponents {
  Item: React.FC<any>;
}

const Select: React.FC<Props> & StaticComponents = ({}) => {
  return (
    <div className="select__container">
      <Select.Item name="Donatello Glacamole" email="harambe@gmail.com" />
    </div>
  );
};

Select.Item = Item;

export default Select;
