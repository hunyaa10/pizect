import styled from "styled-components";

export const UiTitle = ({ children }) => {
  return <Title>{children}</Title>;
};

// style
const Title = styled.h3`
  margin-bottom: 2rem;
  font-size: 1.1rem;
  text-align: center;
  letter-spacing: 1px;
  color: #2f4f57;
`;
