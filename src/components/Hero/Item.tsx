import React from "react";

export interface Props {
  name: string;
  email: string;
}

const Item: React.FC<Props> = ({ name, email }) => {
  return <div></div>;
};

export default Item;
