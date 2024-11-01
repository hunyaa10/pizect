import React from "react";
import styled from "styled-components";

const ListModalScript = ({
  isChangeInput,
  newScript,
  setNewScript,
  script,
}) => {
  return (
    <ScriptBox>
      {isChangeInput ? (
        <ModifyTextarea
          value={newScript}
          onChange={(e) => setNewScript(e.target.value)}
        />
      ) : (
        script.split("\n").map((line, idx) => <Script key={idx}>{line}</Script>)
      )}
    </ScriptBox>
  );
};

export default ListModalScript;

// style
const ScriptBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Script = styled.p`
  padding: 0 1rem;
  letter-spacing: 1px;
  line-height: 1.8;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;

const ModifyTextarea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 0.5rem;
`;
