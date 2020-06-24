import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./Select.scss";
import { Select } from "antd";
import useOnScrollFetch from "../../hooks/useOnScrollFetch";
import { useTypedSelector } from "../../store/IStore";
import imgPlaceholder from "../../media/placeholder.jpg";
import useOnSearchFetch from "../../hooks/useOnSearchFetch";
import { User } from "../../typescript/interfaces";
import { SearchSkeleton } from "../misc/SearchSkeleton";

const { Option } = Select;

export interface Props {}
// interface StaticComponents {
//   Item: React.FC<any>;
// }

const SelectContainer: React.FC<Props> = () => {
  const [data, setData] = useState<User[]>([]);
  const { onScroll } = useOnScrollFetch();
  const { debouncedOnSearchFetch, searchData, isSearchFetching, inputValue, reset } = useOnSearchFetch();
  const { users, isFetching } = useTypedSelector((state) => state.users);

  useEffect(() => {
    if (inputValue === "") {
      setData(users);
    } else {
      setData(searchData);
    }
  }, [inputValue, searchData, users]);

  const onChange = (value: any, option: any) => {
    reset();

    console.log(value);
    console.log(option);
  };

  return (
    <>
      <Select
        autoFocus
        autoClearSearchValue
        showSearch
        placeholder="Select user"
        style={{ width: "100%" }}
        allowClear
        size={"large"}
        dropdownClassName={"select__dropdown"}
        loading={isSearchFetching}
        onChange={onChange}
        onSearch={debouncedOnSearchFetch} // Fetch on user input useOnSearchFetch hook
        notFoundContent={isSearchFetching ? <SearchSkeleton /> : `User with lastname ${inputValue} not found `}
        filterOption={true}
        optionFilterProp={"lastname"}
        onPopupScroll={(e) => {
          // Fetch on scroll useOnScrollFetch hook
          inputValue === "" &&
            onScroll(e.currentTarget.scrollTop, e.currentTarget.clientHeight, e.currentTarget.scrollHeight); // values to calculate if end of scroll
        }}
      >
        {data.map((user) => (
          <Option value={user.id} key={user.id} lastname={user.last_name}>
            <div className="select__option" key={user.id}>
              <div className="select__option-info">
                <div className="select__option-name">{`${user.first_name} ${user.last_name}`}</div>
                <div className="select__option-email">{user.email}</div>
              </div>
              <img
                className="select__option-img"
                src={user?._links?.avatar?.href ? user._links.avatar.href : imgPlaceholder}
                onError={(e) => (e.currentTarget.src = imgPlaceholder)}
                alt="User profile"
              ></img>
            </div>
          </Option>
        ))}
        <Select.OptGroup label={isFetching ? "...Loading" : null}></Select.OptGroup>
      </Select>
    </>
  );
};

export default SelectContainer;
