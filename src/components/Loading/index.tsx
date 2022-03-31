import React from 'react';
import Lottie from 'react-lottie';
import loadingData from '../../utils/animations/loadingData.json';

const loadingOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export function Loading() {
  return (
    <div>
      <Lottie
        options={loadingOptions}
        width={300}
        height={300}
        isStopped={false}
        isPaused={false}
      />
    </div>
  );
}
