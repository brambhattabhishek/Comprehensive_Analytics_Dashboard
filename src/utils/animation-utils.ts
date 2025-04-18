
import { useEffect, useState } from "react";

/**
 * Utility function to create a spring animation for numerical values
 * @param targetValue The final target value
 * @param initialValue Optional initial value
 * @param stiffness Spring stiffness (higher values = faster animation)
 * @param damping Spring damping (higher values = less bouncing)
 * @returns Animated value and a function to update the target
 */
export function useSpringAnimation(
  targetValue: number,
  initialValue?: number,
  stiffness = 100,
  damping = 10
) {
  const [value, setValue] = useState(initialValue ?? targetValue);
  const [springProps, setSpringProps] = useState({
    velocity: 0,
    target: targetValue,
  });

  useEffect(() => {
    setSpringProps((prev) => ({
      ...prev,
      target: targetValue,
    }));
  }, [targetValue]);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const updateSpring = (currentTime: number) => {
      const elapsed = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const force = (springProps.target - value) * stiffness;
      const newVelocity = springProps.velocity * (1 - damping * elapsed) + force * elapsed;
      const newValue = value + newVelocity * elapsed;

      setValue(newValue);
      setSpringProps((prev) => ({
        ...prev,
        velocity: newVelocity,
      }));

      const isDone = Math.abs(springProps.target - newValue) < 0.001 && Math.abs(newVelocity) < 0.001;
      if (!isDone) {
        animationFrame = requestAnimationFrame(updateSpring);
      } else {
        setValue(springProps.target);
      }
    };

    animationFrame = requestAnimationFrame(updateSpring);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, springProps, stiffness, damping]);

  const setTarget = (newTarget: number) => {
    setSpringProps((prev) => ({
      ...prev,
      target: newTarget,
    }));
  };

  return [value, setTarget] as const;
}

/**
 * Hook to animate a number that counts up or down
 * @param end The final value to count to
 * @param start The starting value (default: 0)
 * @param duration The duration of the animation in ms (default: 1000)
 * @param delay Optional delay before starting the animation in ms
 * @returns The current animated value
 */
export function useCountAnimation(
  end: number,
  start = 0,
  duration = 1000,
  delay = 0
): number {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (start === end) return;
    
    let timer: NodeJS.Timeout;
    let startTime: number;
    let frameId: number;

    const startDelay = () => {
      timer = setTimeout(() => {
        startTime = Date.now();
        animateCount();
      }, delay);
    };

    const animateCount = () => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function for smoother animation
      const easedProgress = easeOutQuart(progress);
      
      const currentCount = start + (end - start) * easedProgress;
      setCount(currentCount);

      if (progress < 1) {
        frameId = requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    };

    startDelay();

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, [start, end, duration, delay]);

  return count;
}

// Easing function for smooth animation
function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

/**
 * Hook to animate a value between two numbers with easing
 * @param targetValue The target value to animate to
 * @param initialValue Initial value (defaults to target)
 * @param duration Duration in ms
 * @param easingFunction Optional easing function
 * @returns The current animated value
 */
export function useAnimatedValue(
  targetValue: number,
  initialValue?: number,
  duration = 500,
  easingFunction = easeOutQuart
): number {
  const [value, setValue] = useState(initialValue ?? targetValue);
  const [animation, setAnimation] = useState({
    startValue: initialValue ?? targetValue,
    startTime: 0,
    isAnimating: false,
  });

  useEffect(() => {
    if (targetValue === value) return;

    setAnimation({
      startValue: value,
      startTime: Date.now(),
      isAnimating: true,
    });

    let frameId: number;

    const animate = () => {
      const elapsed = Date.now() - animation.startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFunction(progress);

      const currentValue = animation.startValue + (targetValue - animation.startValue) * easedProgress;
      setValue(currentValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setValue(targetValue);
        setAnimation(prev => ({ ...prev, isAnimating: false }));
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [targetValue]);

  return value;
}

/**
 * Hook to create staggered animation timings for lists
 * @param itemCount Number of items
 * @param staggerDelay Delay between each item in ms
 * @param initialDelay Initial delay before the first item in ms
 * @returns Array of delay values for each item
 */
export function useStaggeredAnimationDelays(
  itemCount: number,
  staggerDelay = 50,
  initialDelay = 0
): number[] {
  const [delays, setDelays] = useState<number[]>([]);

  useEffect(() => {
    const newDelays = Array.from({ length: itemCount }, (_, i) => 
      initialDelay + i * staggerDelay
    );
    setDelays(newDelays);
  }, [itemCount, staggerDelay, initialDelay]);

  return delays;
}
