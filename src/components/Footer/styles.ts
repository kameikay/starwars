import styled from 'styled-components';

export const Container = styled.footer`
  width: 100%;
  position: static;
  bottom: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;

    a {
      color: ${({ theme }) => theme.colors.secondary.main};
      transition: all 0.3s ease-in;
      :hover {
        color: ${({ theme }) => theme.colors.secondary.dark};
      }
    }
  }
`;
