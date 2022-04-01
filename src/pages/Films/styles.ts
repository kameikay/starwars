import styled from 'styled-components';

export const Container = styled.div`
  .title {
    margin-bottom: 2rem;
    padding: 0 1rem;

    span {
      position: relative;
      color: ${({ theme }) => theme.colors.primary.light};

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

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;

      button + button {
        margin-left: 1rem;
      }
    }

    .select {

      button + button {
        margin-left: 2rem;
      }
    }
  }
    
  .cards {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 2rem;

    > div {
      margin: 1rem;
    }
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;

    > span {
      font-size: 2rem;
    }
  }

  .no-favourite {
    padding: 1rem;
    margin-top: 2rem;
  }
`;
