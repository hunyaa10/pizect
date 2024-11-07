import React, { useEffect, useState } from "react";
import Meeting from "./Meeting";
import Memo from "./Memo";
import styled from "styled-components";
import ScheduleHeader from "./ScheduleHeader";
import { useNav } from "../../context/NavContext";
import useFetchData from "../../hooks/useFetchData";
import LoadingData from "../LoadingData";

const Notice = () => {
  const { isShowNav } = useNav();
  const {
    data: meets,
    setData: setMeets,
    isLoading: isLoadingMeets,
  } = useFetchData("meetings");
  const {
    data: memos,
    setData: setMemos,
    isLoading: isLoadingMemos,
  } = useFetchData("memos");

  const [isAllFetch, setIsAllFetch] = useState(false);

  useEffect(() => {
    if (!isLoadingMeets && !isLoadingMemos) {
      const loadingTime = setTimeout(() => {
        setIsAllFetch(true);
      }, 1500);
      return () => clearTimeout(loadingTime);
    }
  }, [isLoadingMeets, isLoadingMemos]);

  return (
    <>
      {isAllFetch ? (
        <>
          <Wrapper $isshownav={isShowNav}>
            <ScheduleHeader />
            <Div>
              <Meeting meets={meets} setMeets={setMeets} />
              <Memo memos={memos} setMemos={setMemos} />
            </Div>
          </Wrapper>
        </>
      ) : (
        <LoadingData />
      )}
    </>
  );
};

export default Notice;

// style
const Wrapper = styled.div`
  width: ${({ $isshownav }) => ($isshownav ? "85vw" : "96vw")};
  float: right;
  padding: 0 2rem 3rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: 0.5s;
`;
const Div = styled.div`
  display: flex;
  gap: 2rem;
`;
