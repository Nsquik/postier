import React from "react";
import SkeletonInput from "antd/lib/skeleton/Input";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import "./SkeletonSearch.scss";

export const SearchSkeleton = () => {
  return (
    <div className="skeleton__container-search">
      <SkeletonAvatar active shape="square" size="large" />
      <div className="skeleton__info-search">
        <SkeletonInput
          active
          size={"small"}
          style={{
            marginBottom: "10px",
            width: "100%",
            height: "2rem",
          }}
        />
        <SkeletonInput active size={"small"} style={{ marginBottom: "10px", height: "1.5rem" }} />
      </div>
    </div>
  );
};
