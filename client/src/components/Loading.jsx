import { useEffect, useState } from 'react';

const Loading = ({ message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => setShow(false), 2000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div>
      {!show ? (
        <p>{message}</p>
      ) : (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
    </div>
  );
};

export default Loading;
