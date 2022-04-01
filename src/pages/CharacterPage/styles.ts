import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

export const CharacterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .character-image {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 100%;
      height: 100%;
    }
  }

  .character-data {
    width: 100%;
    margin-right: 3rem;

    &-details {
      background-color: ${({ theme }) => theme.colors.dark[800]};
      padding: 1rem;
      width: 100%;
      border-radius: .5rem;
            
      h1 {
        font-weight: 500;
        font-size: 2rem;
        margin-bottom: 2rem;
        display: inline-block;
        border-bottom: 2px solid ${({ theme }) => theme.colors.primary.main};
      }

      p {
        span {
          color: ${({ theme }) => theme.colors.primary.main};
        }
      }
    }

    &-others {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-top: 1rem;

      &-data {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        h2 {
          font-weight: 400;
          font-size: 1rem;
        }

        ul {
          margin-top: 1rem;

          li {
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: start;

            svg {
              margin-right: 1rem;
            }
          }
        }
      }
    }
  }
`;
