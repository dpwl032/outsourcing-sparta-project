import styled from 'styled-components';

export const CustomButton = ({ text }) => {
  return (
    <StyledButtonWrap>
      <button>{text}</button>
    </StyledButtonWrap>
  );
};

const StyledButtonWrap = styled.div`
  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
    padding: 0.5rem 1rem;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    text-align: center;
    text-decoration: none;
    border: none;
    display: inline-block;
    width: auto;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    cursor: pointer;
    transition: 0.5s;
    color: white;
    background-color: black;
    border-radius: 7px;
  }
  button:active,
  button:hover,
  button:focus {
    outline: 0;
  }
`;
