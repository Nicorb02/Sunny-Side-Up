import React, { useState, useEffect } from 'react';
import '../styles/Blobs.css';

const Blobs = () => {
  const [blobs, setBlobs] = useState([]);

  // function to generate a random blob with a random color
  const generateBlob = () => {
    const colors = ['#ffe66d', '#ff9900', '#343434'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return {
      size: Math.floor(Math.random() * 100) + 50,
      x: Math.floor(Math.random() * window.innerWidth),
      y: Math.floor(Math.random() * window.innerHeight),
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      color: color
    };
  };

  // function to generate a new set of blobs
  const generateBlobs = () => {
    const newBlobs = [];
    for (let i = 0; i < 10; i++) {
      newBlobs.push(generateBlob());
    }
    setBlobs(newBlobs);
  };

  useEffect(() => {
    // generate blobs on mount
    generateBlobs();

    // update blobs every 50ms
    const interval = setInterval(() => {
      setBlobs(blobs => {
        return blobs.map(blob => {
          // move blob
          const x = blob.x + blob.speedX;
          const y = blob.y + blob.speedY;

          // bounce off walls
          if (x < 0 || x > window.innerWidth - blob.size) {
            blob.speedX = -blob.speedX;
          }
          if (y < 0 || y > window.innerHeight - blob.size) {
            blob.speedY = -blob.speedY;
          }

          return {
            ...blob,
            x,
            y
          };
        });
      });
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="blobs-container">
      {blobs.map((blob, index) => (
        <div
          key={index}
          className="blob"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.y,
            left: blob.x,
            backgroundColor: blob.color
          }}
        />
      ))}
    </div>
  );
};

export default Blobs;