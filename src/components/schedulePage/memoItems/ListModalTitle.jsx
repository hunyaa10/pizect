import React from "react";
import styled from "styled-components";

const ListModalTitle = ({ isChangeInput, newTitle, setNewTitle, title }) => {
  return (
    <TitleBox>
      {isChangeInput ? (
        <ModifyInput
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <Title>{title}</Title>
      )}
    </TitleBox>
  );
};

export default ListModalTitle;

// style
const TitleBox = styled.div``;
const ModifyInput = styled.input`
  width: 60%;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  font-size: 1rem;

  @media (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;
const Title = styled.h3`
  width: 100%;
  padding-bottom: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: 1440px) {
    font-size: 1rem;
  }
`;
