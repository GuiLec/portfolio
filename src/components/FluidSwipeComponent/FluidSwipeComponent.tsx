"use client";
import React, { useState, useEffect } from "react";
import { useDrag } from "@use-gesture/react";

const CIRCLE_INITIAL_SIZE = 50;
const MAX_NUMBER_OF_DOTS = 200;

function FluidSwipeComponent() {
  const [dots, setDots] = useState<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }>
  >([]);

  const bind = useDrag(
    ({ down, movement: [x, y], velocity, initial: [x0, y0] }) => {
      if (down && !(x === 0 && y === 0)) {
        setDots((prevDots) => {
          const limitedPrevDots =
            prevDots.length >= MAX_NUMBER_OF_DOTS
              ? prevDots.slice(1)
              : prevDots;
          return [
            ...limitedPrevDots,
            {
              x: x0 + x - CIRCLE_INITIAL_SIZE / 2,
              y: y0 + y - CIRCLE_INITIAL_SIZE / 2,
              vx: (velocity[0] * x) / Math.abs(x),
              vy: (velocity[1] * y) / Math.abs(y),
              size: CIRCLE_INITIAL_SIZE,
              opacity: 1,
              color: `hsla(${Math.random() * 360}, 100%, 50%, 1)`,
            },
          ];
        });
      }
    },
    { preventDefault: true }
  );

  useEffect(() => {
    const animate = () => {
      setDots((prevDots) =>
        prevDots.map(({ x, y, vx, vy, size, opacity, color }) => ({
          x: x + vx,
          y: y + vy,
          vx,
          vy,
          size: size + 1,
          opacity: Math.max(opacity - 0.001, 0),
          color,
        }))
      );
      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      {...bind()}
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        backgroundColor: "blue",
        position: "relative",
        touchAction: "none",
      }}
    >
      {dots.map(({ x, y, size, opacity, color }, index) => (
        <div
          key={index}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: "50%",
            position: "absolute",
            left: `${x}px`,
            top: `${y}px`,
            opacity,
          }}
        />
      ))}
    </div>
  );
}

export default FluidSwipeComponent;
