import dynamic from "next/dynamic";
import Wrapper from "../layout/Wrapper";
import Home10 from "./home/home-10";

const index = () => {
  return (
    <>
      <Wrapper>
        <Home10 />
      </Wrapper>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
