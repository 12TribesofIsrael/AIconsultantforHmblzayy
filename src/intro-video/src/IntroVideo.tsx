import React from 'react';
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
  Sequence,
  Audio,
} from 'remotion';

/**
 * HMBL Faith Walk Intro Video
 * Looping intro — Zay walking state to state, Philly to Cali
 *
 * Drop images into public/ folder and update SLIDES array below.
 * Add music file as public/music.mp3
 */

interface Slide {
  image: string;
  label: string;
  sublabel?: string;
}

// Update these with actual image filenames in the public/ folder
const SLIDES: Slide[] = [
  {
    image: 'Screenshot_2026-04-01_at_12.25.10.png',
    label: 'SUNBURY',
    sublabel: 'Route 61 South',
  },
  {
    image: 'Screenshot_2026-04-01_at_16.15.52.png',
    label: 'BUCKNELL',
    sublabel: 'University Checkpoint',
  },
  {
    image: 'Screenshot_2026-04-02_at_07.27.44.png',
    label: 'MIFFLINBURG',
    sublabel: 'Day 8 • 144 Miles',
  },
  {
    image: 'Screenshot_2026-04-02_at_13.10.55.png',
    label: 'STATE COLLEGE',
    sublabel: 'Lewisburg 10 Miles',
  },
  {
    image: 'IMG_1163.png',
    label: 'BOALSBURG',
    sublabel: 'Day 8 • Rural PA',
  },
  {
    image: 'IMG_1191.png',
    label: 'TYRONE',
    sublabel: 'Day 12 • 214 Miles',
  },
];

const FRAMES_PER_SLIDE = 45; // 1.5 seconds per slide at 30fps
const TRANSITION_FRAMES = 12;

// HMBL brand colors extracted from his stream overlays
const COLORS = {
  gold: '#FFD700',
  black: '#000000',
  white: '#FFFFFF',
  darkBg: '#0a0a0a',
  overlay: 'rgba(0,0,0,0.55)',
};

const SlideComponent: React.FC<{
  slide: Slide;
  index: number;
}> = ({ slide, index }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const localFrame = frame - index * FRAMES_PER_SLIDE;

  // Ken Burns zoom effect
  const scale = interpolate(localFrame, [0, FRAMES_PER_SLIDE], [1.0, 1.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Slide entrance
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 80, stiffness: 200 },
  });
  const translateX = interpolate(entrance, [0, 1], [width * 0.3, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Exit fade
  const exitStart = FRAMES_PER_SLIDE - TRANSITION_FRAMES;
  const exitOpacity = interpolate(
    localFrame,
    [exitStart, FRAMES_PER_SLIDE],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Text entrance (staggered)
  const textEntrance = spring({
    frame: Math.max(0, localFrame - 8),
    fps,
    config: { damping: 50, stiffness: 120 },
  });
  const textY = interpolate(textEntrance, [0, 1], [40, 0]);
  const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);

  // Sublabel entrance
  const subEntrance = spring({
    frame: Math.max(0, localFrame - 14),
    fps,
    config: { damping: 50, stiffness: 120 },
  });
  const subY = interpolate(subEntrance, [0, 1], [30, 0]);
  const subOpacity = interpolate(subEntrance, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity: opacity * exitOpacity }}>
      {/* Image */}
      <AbsoluteFill
        style={{
          transform: `translateX(${translateX}px) scale(${scale})`,
        }}
      >
        <Img
          src={staticFile(slide.image)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </AbsoluteFill>

      {/* Dark gradient overlay */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.3) 0%,
            transparent 30%,
            transparent 50%,
            ${COLORS.overlay} 75%,
            rgba(0,0,0,0.85) 100%
          )`,
        }}
      />

      {/* Location label */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 180,
        }}
      >
        <div
          style={{
            color: COLORS.white,
            fontSize: 72,
            fontWeight: 900,
            fontFamily: 'Arial Black, Impact, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: 6,
            textShadow: `0 4px 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.5)`,
            transform: `translateY(${textY}px)`,
            opacity: textOpacity,
          }}
        >
          {slide.label}
        </div>
        {slide.sublabel && (
          <div
            style={{
              color: COLORS.gold,
              fontSize: 24,
              fontWeight: 600,
              fontFamily: 'Arial, sans-serif',
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginTop: 8,
              textShadow: '0 2px 15px rgba(0,0,0,0.8)',
              transform: `translateY(${subY}px)`,
              opacity: subOpacity,
            }}
          >
            {slide.sublabel}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const IntroVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const totalFrames = SLIDES.length * FRAMES_PER_SLIDE;

  // Overall walk progress
  const progress = interpolate(frame, [0, totalFrames], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // HMBL branding fade in
  const brandIn = spring({
    frame,
    fps,
    config: { damping: 80, stiffness: 100 },
  });

  // Gold line accent animation
  const lineWidth = interpolate(brandIn, [0, 1], [0, 120]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <Sequence
          key={i}
          from={i * FRAMES_PER_SLIDE}
          durationInFrames={FRAMES_PER_SLIDE + TRANSITION_FRAMES}
        >
          <SlideComponent slide={slide} index={0} />
        </Sequence>
      ))}

      {/* Top branding bar */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 50,
          opacity: brandIn,
        }}
      >
        {/* HMBL text */}
        <div
          style={{
            color: COLORS.gold,
            fontSize: 36,
            fontWeight: 900,
            fontFamily: 'Arial Black, Impact, sans-serif',
            letterSpacing: 14,
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
          }}
        >
          HMBL
        </div>

        {/* Gold accent line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            backgroundColor: COLORS.gold,
            marginTop: 6,
            opacity: 0.8,
          }}
        />

        {/* Faith Walk subtitle */}
        <div
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: 13,
            fontWeight: 400,
            fontFamily: 'Arial, sans-serif',
            letterSpacing: 5,
            textTransform: 'uppercase',
            marginTop: 10,
            textShadow: '0 1px 10px rgba(0,0,0,0.8)',
          }}
        >
          Faith Walk &bull; Philly &rarr; Cali &bull; 3,000 Miles
        </div>
      </AbsoluteFill>

      {/* Bottom progress section */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 50,
        }}
      >
        {/* Mile markers */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '75%',
            marginBottom: 8,
          }}
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 11,
              fontFamily: 'Arial, sans-serif',
              letterSpacing: 2,
            }}
          >
            PHILLY
          </span>
          <span
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 11,
              fontFamily: 'Arial, sans-serif',
              letterSpacing: 2,
            }}
          >
            CALI
          </span>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: '75%',
            height: 3,
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              backgroundColor: COLORS.gold,
              borderRadius: 2,
              boxShadow: `0 0 10px ${COLORS.gold}`,
            }}
          />
        </div>

        {/* Walking icon on progress bar */}
        <div
          style={{
            width: '75%',
            position: 'relative',
            height: 20,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: `${progress * 100}%`,
              top: -2,
              transform: 'translateX(-50%)',
              fontSize: 16,
            }}
          >
            🚶🏾‍♂️
          </div>
        </div>
      </AbsoluteFill>

      {/* Music */}
      <Audio src={staticFile('Mindset.mp3')} volume={0.8} />
    </AbsoluteFill>
  );
};
