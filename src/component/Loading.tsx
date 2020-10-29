import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading: React.FC<{}> = () => {

  return <div style={{textAlign: 'center', padding: '60px 0'}}>
    <ClipLoader
      size={150}
      color={"#cccccc"}
      loading={true}
    />
  </div>
}
export default Loading;
