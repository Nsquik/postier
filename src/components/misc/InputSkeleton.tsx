import React from "react";
import SkeletonInput from "antd/lib/skeleton/Input";

export const InputSkeleton = () => {
  return (
    <>
      <SkeletonInput active size={"large"} style={{ border: "1px solid rgb(0, 203, 169)" }} />
    </>
  );
};
