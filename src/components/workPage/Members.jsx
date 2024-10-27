import React, { useEffect, useState } from "react";
import { workData } from "../../data/worksData";
import useDragSensors from "../../hooks/useDragSensors";
import styled from "styled-components";
import { closestCorners, DndContext } from "@dnd-kit/core";
import MemberBoard from "./MemberBoard";
import InputWork from "./InputWork";
import MemberHeader from "./MemberHeader";

import CrownIcon from "../../icon/crown.svg";

const Members = () => {
  const [datas, setDatas] = useState([]);
  const [leaderId, setLeaderId] = useState(1);

  const sensors = useDragSensors();

  useEffect(() => {
    setDatas(workData);
  }, []);
  console.log(datas);

  const names = datas.map((data) => data.name);

  // 팀장변경
  const handleLeader = (id) => {
    setLeaderId((prevId) => (prevId === id ? null : id));
  };

  // 작업추가
  const handleAddWork = (work, memberId) => {
    if (work.trim()) {
      setDatas((prev) =>
        prev.map((data) => {
          if (data.id === memberId) {
            const newWork = {
              id: `w${data.works.length + 1}`,
              work: work,
            };
            return {
              ...data,
              works: [newWork, ...data.works],
            };
          }
          return data;
        })
      );
    }
  };

  // 작업삭제
  const handleRemoveWork = (memberId, listId) => {
    setDatas((prev) =>
      prev.map((data) => {
        if (data.id === memberId) {
          return {
            ...data,
            works: data.works.filter((work) => work.id !== listId),
          };
        }
        return data;
      })
    );
  };

  // 팀원추가
  const handleAddMember = (name) => {
    if (name.trim()) {
      const newMember = {
        id: datas.length + 1,
        name: name,
        works: [],
      };

      setDatas((prev) => [...prev, newMember]);
    }
  };

  return (
    <>
      <MemberHeader names={names} handleAddMember={handleAddMember} />
      <Container>
        {datas.map((data) => (
          <DndContext
            key={data.id}
            sensors={sensors}
            collisionDetection={closestCorners}
          >
            <MemberBox>
              <NameBox>
                <Name onClick={() => handleLeader(data.id)}>{data.name}님</Name>
                {leaderId === data.id || (data.id === 1 && leaderId === 1) ? (
                  <Icon src={CrownIcon} alt="crown-icon" />
                ) : null}
              </NameBox>
              <InputWork
                handleAddWork={(work) => handleAddWork(work, data.id)}
              />
              <MemberBoard
                memberId={data.id}
                works={data.works}
                handleRemoveWork={handleRemoveWork}
              />
            </MemberBox>
          </DndContext>
        ))}
      </Container>
    </>
  );
};

export default Members;

// style
const Container = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;
const MemberBox = styled.div`
  height: fit-content;
  padding: 2rem 1.5rem 4rem 1.5rem;
  background-color: #f3f7f8;
  border-radius: 0.2rem;
`;
const NameBox = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Name = styled.h3`
  font-size: 1.1rem;
  letter-spacing: 1px;
  color: #2f4f57;
`;
const Icon = styled.img`
  width: 1rem;
`;
