import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

export const CharacterContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.light[900]};
  color: ${({ theme }) => theme.colors.dark[900]};
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-weight: 500;
    font-size: 1.5rem;
  }

  .character-image {
    height: 100%;
    img {
      height: 100%;
    }
  }
`;
