

import React from "react";
import { css } from "@emotion/react";
import { PulseLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const CustomLoader = ({ loading }) => {
  return (
    <div className="flex justify-center items-center">
      <PulseLoader color={"#f08e80"} loading={loading} css={override} size={20} />
    </div>
  );
};

export default CustomLoader;
