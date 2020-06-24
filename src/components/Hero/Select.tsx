import React, { useState, InputHTMLAttributes } from "react";
import Item from "./Item";
import Input from "./Input";
import "antd/dist/antd.css";
import "./Select.scss";
import { Select } from "antd";
import useOnScrollFetch from "../../hooks/useOnScrollFetch";
import { useTypedSelector } from "../../store/IStore";
import imgPlaceholder from "../../media/placeholder.jpg";

const { Option } = Select;

export interface Props {}
interface StaticComponents {
  Item: React.FC<any>;
}

const SelectContainer: React.FC<Props> & StaticComponents = ({}) => {
  const [input, setInput] = useState<string>();
  const { values, onScroll } = useOnScrollFetch();
  const { users } = useTypedSelector((state) => state.users);
  const data = users;

  const onChange = (value: any, option: any) => {
    console.log(value);
    console.log(option);
  };

  return (
    <>
      <Select
        autoFocus
        autoClearSearchValue
        showSearch
        placeholder="Select users"
        style={{ width: "100%" }}
        allowClear
        // value={input}
        size={"large"}
        onChange={onChange}
        optionFilterProp={""}
        onPopupScroll={(e) => {
          onScroll(e.currentTarget.scrollTop, e.currentTarget.clientHeight, e.currentTarget.scrollHeight);
        }}
      >
        <div className="tescik" aria-disabled={true}>
          Me
        </div>
        {data.map((user) => (
          <Option value={user.last_name} key={user.id}>
            <div className="select__option" key={user.id}>
              <div className="select__option-info">
                <div className="select__option-name">{`${user.first_name} ${user.last_name}`}</div>
                <div className="select__option-email">{user.email}</div>
              </div>
              <img
                className="select__option-img"
                src={user?._links?.avatar?.href ? user._links.avatar.href : imgPlaceholder}
                onError={(e) => (e.currentTarget.src = imgPlaceholder)}

                // onLoad={(e) => (e.currentTarget.src = imgPlaceholder)}
              ></img>
            </div>
          </Option>
        ))}
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
