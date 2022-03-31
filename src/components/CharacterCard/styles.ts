import styled from 'styled-components';

export const Container = styled.div`
  width: 15rem;
  position: relative;
  transition: all 0.3s ease-in;
  border-radius: 0.5rem;

  &:hover {
    filter: brightness(80%);

    .character-name {
      span {
        position: relative;

        &::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: ${({ theme }) => theme.colors.primary.main};
        }
      }
    }
  }

  img {
    width: 100%;
    border-radius: 0.5rem;
  }

  .character-name {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      background-color: ${({ theme }) => theme.colors.light[900]};
      color: ${({ theme }) => theme.colors.dark[900]};
      height: 3rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease-in;
    }
  }
`;
