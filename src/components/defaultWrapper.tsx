import { FC } from 'react';

const DefaultWrapper: FC = ({ children }) => {
  return (
    <>
      <div className="wrapper">{children}</div>

      <style jsx>{`
        .wrapper {
          padding: 0 40px;
          max-width: 1000px;
          margin: 50px auto;
        }
      `}</style>
    </>
  );
};

export default DefaultWrapper;
