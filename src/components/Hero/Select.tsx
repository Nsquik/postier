import React, { useState, InputHTMLAttributes } from "react";
import "./Select.scss";
import Item from "./Item";
import Input from "./Input";
import "antd/dist/antd.css";
import { Select } from "antd";
import useOnScrollFetch from "../../hooks/useOnScrollFetch";

const { Option } = Select;

export interface Props {}
interface StaticComponents {
  Item: React.FC<any>;
}

const SelectContainer: React.FC<Props> & StaticComponents = ({}) => {
  const [input, setInput] = useState<any>("");
  const { values, onScroll } = useOnScrollFetch();
  console.log(values);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const clientHeightAndScrollTop = e.currentTarget.scrollTop + e.currentTarget.clientHeight;

    //if clientHeightAndScrollTop === e.target.scrollHeight then end of scroll was reached.

    if (clientHeightAndScrollTop === e.currentTarget.scrollHeight) {
      console.log("END");
    }
  };

  return (
    <>
      <Select
        autoFocus
        autoClearSearchValue
        showSearch
        labelInValue
        placeholder="Select users"
        filterOption={false}
        style={{ width: "100%" }}
        allowClear
        size={"large"}
        onPopupScroll={(e) => {
          console.log(e.currentTarget.scrollTop);

          onScroll(e.currentTarget.scrollTop, e.currentTarget.clientHeight, e.currentTarget.scrollHeight);
        }}
      >
        <Option value="ja" disabled={true}>
          ELUWINA
        </Option>
        <Option value="hej">
          <div>
            elo<div>siema</div>
          </div>
        </Option>
        <Option value="7">
          <div>
            elo<div>siema</div>
          </div>
        </Option>
        <Option value="6">
          <div>
            elo<div>siema</div>
          </div>
        </Option>
        <Option value="5">
          <div>
            elo<div>siema</div>
          </div>
        </Option>
        <Option value="4">
          <div>
            elo<div>siema</div>
          </div>
        </Option>
        <Option value="3">
          <div>
            elo<div>siema</div>
          </div>
        </Option>
        <Option value="2">
          <div>
            elo<div>siema</div>
          </div>
        </Option>
        <Option value="1">
          <div>
            elo<div>siema</div>
          </div>
        </Option>
      </Select>
    </>
  );
};

SelectContainer.Item = Item;

export default SelectContainer;

{
  /* <form action="">
{input && (
  <label htmlFor="query" className="select__label">
    Select user:
  </label>
)}
<input
  autoComplete={"off"}
  id="query"
  placeholder="Select user"
  type="text"
  className="select__input"
  value={input}
  onChange={(e) => setInput(e.target.value)}
></input>
</form> */
}
