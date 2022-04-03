import styled from 'styled-components';

export const InputSearch = styled.input`
  width: 32rem;
  height: 3rem;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.light[900]};
  padding: 0 1rem;
  outline: none;
  transition: all 0.3s ease-in;
  background-color: ${({ theme }) => theme.colors.light[900]};

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
  }

  @media screen and (max-width: 480px) {
    width: 100% !important;
  }
`;
