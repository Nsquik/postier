import React, { useState, useEffect } from "react";
import "./Select.scss";
import { Select } from "antd";
import useOnScrollFetch from "../../hooks/useOnScrollFetch";
import { useTypedSelector } from "../../store/IStore";
import imgPlaceholder from "../../media/placeholder.jpg";
import useOnSearchFetch from "../../hooks/useOnSearchFetch";
import { User } from "../../typescript/interfaces";
import { SearchSkeleton } from "../misc/SearchSkeleton";
import { useDispatch } from "react-redux";
import { selectUser } from "../../actions/usersActions";
import { LabeledValue } from "antd/lib/select";

import "antd/lib/select/style/css";

const { Option } = Select;

export interface Props {}

const SelectContainer: React.FC<Props> = () => {
  const [data, setData] = useState<User[]>([]);
  const { onScroll } = useOnScrollFetch();
  const { debouncedOnSearchFetch, searchData, isSearchFetching, inputValue, reset, error } = useOnSearchFetch();
  const { users, isFetching } = useTypedSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputValue === "") {
      setData(users);
    } else {
      setData(searchData);
    }
  }, [inputValue, searchData, users]);

  const onChange = () => {
    reset();
  };

  const onSelect = (value: string | number | LabeledValue, option: any) => {
    const res = data.find((user) => user.id === value);

    res && dispatch(selectUser(res));
  };

  return (
    <>
      <Select
        autoFocus
        showSearch
        placeholder="Select user"
        style={{ width: "100%" }}
        allowClear
        size={"large"}
        dropdownClassName={"select__dropdown"}
        onChange={onChange}
        onSelect={onSelect}
        onSearch={debouncedOnSearchFetch} // Fetch on user input useOnSearchFetch hook
        notFoundContent={
          isSearchFetching ? (
            <SearchSkeleton />
          ) : error ? (
            "There was an error fetching users..."
          ) : data.length === 0 ? (
            "User not found..."
          ) : (
            // <SearchSkeleton />
            "XD"
          )
        }
        filterOption={true}
        optionFilterProp={"name"}
        onPopupScroll={(e) => {
          // Fetch on scroll useOnScrollFetch hook
          inputValue === "" &&
            onScroll(e.currentTarget.scrollTop, e.currentTarget.clientHeight, e.currentTarget.scrollHeight); // values to calculate if end of scroll
        }}
      >
        {data.map((user) => {
          return (
            <Option value={user.id} key={user.id} name={user.name}>
              <div className="select__option" key={user.id}>
                <div className="select__option-info">
                  <div className="select__option-name">{`${user.name}`}</div>
                  <div className="select__option-email">{user.email}</div>
                </div>
                <img
                  className="select__option-img"
                  src={user?._links?.avatar?.href ? user._links.avatar.href : imgPlaceholder}
                  onError={(e) => (e.currentTarget.src = imgPlaceholder)}
                  alt=""
                ></img>
              </div>
            </Option>
          );
        })}
        <Select.OptGroup label={isFetching ? "...Loading" : null}></Select.OptGroup>
      </Select>
    </>
  );
};

export default SelectContainer;
