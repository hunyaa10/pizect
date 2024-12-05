import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNav } from "../../context/NavContext";
import useFetchData from "../../hooks/useFetchData";
import { UiInput } from "../uiComponents/UiInput";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

import LogoIcon from "../../icon/logo.svg";
import PencilIcon from "../../icon/pencil.svg";

const ScheduleHeader = () => {
  const { isShowNav } = useNav();
  const { data, setData } = useFetchData("project_name");

  const [nameInputValue, setNameInputValue] = useState("");
  const [changeInput, setChangeInput] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      setNameInputValue(data[0]?.name || "");
    }
  }, [data]);

  const handleChangeProjectName = async (e) => {
    e.preventDefault();

    const projectRef = doc(db, "project_name", data[0]?.id);
    await setDoc(projectRef, { name: nameInputValue }, { merge: true });
    setData((prev) =>
      prev.map((item) =>
        item.id === data[0]?.id ? { ...item, name: nameInputValue } : item
      )
    );
    setChangeInput(false);
  };

  return (
    <Header>
      <Logo src={LogoIcon} alt="logo" $isshownav={isShowNav} />
      <NameBox onSubmit={handleChangeProjectName}>
        {changeInput ? (
          <UiInput
            value={nameInputValue}
            onChange={(e) => setNameInputValue(e.target.value)}
          />
        ) : (
          <PjName>{data[0]?.name}</PjName>
        )}
        <Icon
          src={PencilIcon}
          alt="pencil-icon"
          onClick={() => setChangeInput(true)}
        />
      </NameBox>
    </Header>
  );
};

export default ScheduleHeader;

// style
const Header = styled.header`
  width: 100%;
  height: 10vh;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.img`
  width: 180px;
  opacity: ${({ $isshownav }) => ($isshownav ? "0" : "1")};

  @media (max-width: 1440px) {
    width: 120px;
  }
`;
const NameBox = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const PjName = styled.h2`
  font-size: 2rem;
  color: #3d7685;

  @media (max-width: 1440px) {
    font-size: 1.5rem;
  }
`;

const Icon = styled.img`
  cursor: pointer;
  width: 2.5rem;
  opacity: 0.5;
  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 1440px) {
    width: 1.5rem;
  }
`;
