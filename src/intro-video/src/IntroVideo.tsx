import React from 'react';
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Audio,
} from 'remotion';

// Configuration - update these paths with actual footage
const STATES = [
  { name: 'Philadelphia', label: 'PHILLY', image: 'philly.jpg' },
  { name: 'Pennsylvania', label: 'PENNSYLVANIA', image: 'pennsylvania.jpg' },
  { name: 'Ohio', label: 'OHIO', image: 'ohio.jpg' },
  { name: 'Indiana', label: 'INDIANA', image: 'indiana.jpg' },
  { name: 'Illinois', label: 'ILLINOIS', image: 'illinois.jpg' },
  { name: 'Missouri', label: 'MISSOURI', image: 'missouri.jpg' },
  { name: 'Kansas', label: 'KANSAS', image: 'kansas.jpg' },
  { name: 'Colorado', label: 'COLORADO', image: 'colorado.jpg' },
  { name: 'Utah', label: 'UTAH', image: 'utah.jpg' },
  { name: 'Nevada', label: 'NEVADA', image: 'nevada.jpg' },
  { name: 'California', label: 'CALIFORNIA 🌴', image: 'california.jpg' },
];

const FRAMES_PER_STATE = 30; // ~1 second per state at 30fps

export const IntroVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Calculate which state we're showing
  const stateIndex = Math.min(
    Math.floor(frame / FRAMES_PER_STATE),
    STATES.length - 1
  );
  const stateFrame = frame % FRAMES_PER_STATE;
  const currentState = STATES[stateIndex];

  // Pan effect - slow zoom in on each image
  const scale = interpolate(stateFrame, [0, FRAMES_PER_STATE], [1, 1.08], {
    extrapolateRight: 'clamp',
  });

  // Slide transition between states
  const slideIn = spring({
    frame: stateFrame,
    fps,
    config: { damping: 50, stiffness: 200 },
  });

  const translateX = interpolate(slideIn, [0, 1], [width, 0]);

  // Text fade in
  const textOpacity = interpolate(stateFrame, [5, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Walking figure animation (silhouette moves across screen)
  const walkProgress = interpolate(frame, [0, STATES.length * FRAMES_PER_STATE], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // HMBL branding fade
  const brandOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Background image with pan/zoom */}
      <AbsoluteFill
        style={{
          transform: `translateX(${translateX}px) scale(${scale})`,
          overflow: 'hidden',
        }}
      >
        {/* Replace with actual images from assets/footage/ */}
        <AbsoluteFill
          style={{
            background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Placeholder - replace with <Img src={} /> when footage is ready */}
          <div
            style={{
              fontSize: 120,
              color: 'rgba(255,255,255,0.1)',
              fontWeight: 'bold',
              fontFamily: 'Arial',
            }}
          >
            {currentState.label}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Dark overlay for text readability */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* State name text */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 120,
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: 64,
            fontWeight: 900,
            fontFamily: 'Arial Black, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: 8,
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}
        >
          {currentState.label}
        </div>
      </AbsoluteFill>

      {/* Walking progress bar */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 60,
        }}
      >
        <div
          style={{
            width: '80%',
            height: 4,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${walkProgress * 100}%`,
              height: '100%',
              backgroundColor: '#FFD700',
              borderRadius: 2,
              transition: 'width 0.1s',
            }}
          />
        </div>
      </AbsoluteFill>

      {/* HMBL Logo / Branding top */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: 40,
          opacity: brandOpacity,
        }}
      >
        <div
          style={{
            color: '#FFD700',
            fontSize: 28,
            fontWeight: 900,
            fontFamily: 'Arial Black, sans-serif',
            letterSpacing: 12,
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          HMBL
        </div>
      </AbsoluteFill>

      {/* Faith Walk subtitle */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: 75,
          opacity: brandOpacity,
        }}
      >
        <div
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 14,
            fontWeight: 400,
            fontFamily: 'Arial, sans-serif',
            letterSpacing: 6,
            textTransform: 'uppercase',
          }}
        >
          Faith Walk • Philly → Cali • 3,000 Miles
        </div>
      </AbsoluteFill>

      {/* Walking figure emoji (placeholder for actual silhouette) */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 75,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: `${walkProgress * 80 + 10}%`,
            fontSize: 24,
            transform: 'translateX(-50%)',
          }}
        >
          🚶🏾‍♂️
        </div>
      </AbsoluteFill>

      {/* Audio - add music file path here */}
      {/* <Audio src={staticFile('music.mp3')} /> */}
    </AbsoluteFill>
  );
};
