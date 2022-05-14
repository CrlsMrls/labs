export type speedType = 'very-slow' | 'slow' | 'normal' | 'fast' | 'very-fast';

export const speedOptions = {
  'very-slow': {
    initialSpeed: 600,
    eachStepDecrement: 5,
  },
  slow: {
    initialSpeed: 400,
    eachStepDecrement: 5,
  },
  normal: {
    initialSpeed: 300,
    eachStepDecrement: 5,
  },
  fast: {
    initialSpeed: 200,
    eachStepDecrement: 10,
  },
  'very-fast': {
    initialSpeed: 100,
    eachStepDecrement: 10,
  },
};
