import React, { useState, useEffect } from 'react';

const ProgressBar = ( ) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 600); // Avanza un 1% cada 600ms, por lo que tardará 1 minuto en llegar al 100%

    return () => clearInterval(interval);
  }, []);

  return (
    <>
        <div className="h-4 w-full bg-gray-200">
            <div
                className={ progress == 100 ? "h-full bg-green-500" : "h-full bg-blue-500"}
                style={{ width: `${progress}%` }}
            ></div>
        </div>

        {
            progress === 100 && (
                <div>
                    <button className='p-2 rounded bg-purple-600 text-white text-lg mt-3 mb-2'>Ir al Pileo</button>
                </div>
            )
        }

    </>
  );
};

export default ProgressBar;