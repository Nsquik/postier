import React from "react";
import { Skeleton } from "antd";
import "./PostSkeleton.scss";

export const PostSkeleton = () => {
  return (
    <div className="post__skeleton">
      <Skeleton active />
    </div>
  );
};
