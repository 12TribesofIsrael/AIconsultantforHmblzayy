import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
  Sequence,
  Audio,
} from 'remotion';

/**
 * HMBL Faith Walk — 90-Second Highlight Reel
 * 15 Twitch clips from the walk, one per day, with HMBL branding overlay.
 */

interface ClipData {
  video: string;
  day: number;
  location: string;
  miles: number;
}

const CLIPS: ClipData[] = [
  { video: 'clips/day02-norristown.mp4', day: 2, location: 'NORRISTOWN', miles: 18 },
  { video: 'clips/day03-pottstown.mp4', day: 3, location: 'POTTSTOWN', miles: 36 },
  { video: 'clips/day05-lebanon.mp4', day: 5, location: 'LEBANON', miles: 80 },
  { video: 'clips/day06-sunbury.mp4', day: 6, location: 'SUNBURY', miles: 108 },
  { video: 'clips/day07-lewisburg.mp4', day: 7, location: 'LEWISBURG', miles: 125 },
  { video: 'clips/day08-mifflinburg.mp4', day: 8, location: 'MIFFLINBURG', miles: 144 },
  { video: 'clips/day09-statecollege.mp4', day: 9, location: 'STATE COLLEGE', miles: 162 },
  { video: 'clips/day10-boalsburg.mp4', day: 10, location: 'BOALSBURG', miles: 175 },
  { video: 'clips/day11-altoona.mp4', day: 11, location: 'ALTOONA', miles: 195 },
  { video: 'clips/day12-tyrone.mp4', day: 12, location: 'TYRONE', miles: 214 },
  { video: 'clips/day13-ebensburg.mp4', day: 13, location: 'EBENSBURG', miles: 230 },
  { video: 'clips/day14-blairsville.mp4', day: 14, location: 'BLAIRSVILLE', miles: 248 },
  { video: 'clips/day16-vandergrift.mp4', day: 16, location: 'VANDERGRIFT', miles: 290 },
  { video: 'clips/day17-beaverfalls.mp4', day: 17, location: 'BEAVER FALLS', miles: 343 },
  { video: 'clips/day18-columbiana.mp4', day: 18, location: 'COLUMBIANA, OH', miles: 373 },
];

const FRAMES_PER_CLIP = 180; // 6 seconds at 30fps
const TRANSITION_FRAMES = 15; // 0.5s crossfade

const COLORS = {
  gold: '#FFD700',
  black: '#000000',
  white: '#FFFFFF',
  darkBg: '#0a0a0a',
  overlay: 'rgba(0,0,0,0.55)',
};

const ClipComponent: React.FC<{ clip: ClipData }> = ({ clip }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance fade
  const entrance = spring({
    frame,
    fps,
    config: { damping: 80, stiffness: 200 },
  });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Exit fade
  const exitStart = FRAMES_PER_CLIP - TRANSITION_FRAMES;
  const exitOpacity = interpolate(
    frame,
    [exitStart, FRAMES_PER_CLIP],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Text entrance (staggered)
  const textEntrance = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 50, stiffness: 120 },
  });
  const textY = interpolate(textEntrance, [0, 1], [40, 0]);
  const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);

  // Sublabel entrance
  const subEntrance = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 50, stiffness: 120 },
  });
  const subY = interpolate(subEntrance, [0, 1], [30, 0]);
  const subOpacity = interpolate(subEntrance, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity: opacity * exitOpacity }}>
      {/* Video clip */}
      <AbsoluteFill>
        <OffthreadVideo
          src={staticFile(clip.video)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          volume={0}
        />
      </AbsoluteFill>

      {/* Dark gradient overlay */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.4) 0%,
            transparent 25%,
            transparent 55%,
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
            color: COLORS.gold,
            fontSize: 56,
            fontWeight: 900,
            fontFamily: 'Arial Black, Impact, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: 4,
            textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.5)',
            transform: `translateY(${textY}px)`,
            opacity: textOpacity,
          }}
        >
          DAY {clip.day} — {clip.location}
        </div>
        <div
          style={{
            color: COLORS.white,
            fontSize: 22,
            fontWeight: 600,
            fontFamily: 'Arial, sans-serif',
            letterSpacing: 6,
            textTransform: 'uppercase',
            marginTop: 8,
            textShadow: '0 2px 15px rgba(0,0,0,0.8)',
            transform: `translateY(${subY}px)`,
            opacity: subOpacity,
          }}
        >
          {clip.miles} MILES WALKED
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const TOTAL_JOURNEY_MILES = 3000;

export const IntroVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Walk progress reflects REAL mileage across journey, not video playback.
  // As each clip plays, the progress bar advances to that day's actual miles
  // walked. At the end, it stops at the most recent checkpoint's miles —
  // NOT at Cali, because the walk isn't finished yet.
  const currentClipIndex = Math.min(
    Math.floor(frame / FRAMES_PER_CLIP),
    CLIPS.length - 1
  );
  const clipLocalFrame = frame - currentClipIndex * FRAMES_PER_CLIP;
  const prevMiles = currentClipIndex === 0 ? 0 : CLIPS[currentClipIndex - 1].miles;
  const currMiles = CLIPS[currentClipIndex].miles;
  // Smoothly interpolate within each clip from previous day's miles → current day's miles
  const interpolatedMiles = interpolate(
    clipLocalFrame,
    [0, FRAMES_PER_CLIP],
    [prevMiles, currMiles],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const progress = interpolatedMiles / TOTAL_JOURNEY_MILES;

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
      {/* Clips */}
      {CLIPS.map((clip, i) => (
        <Sequence
          key={i}
          from={i * FRAMES_PER_CLIP}
          durationInFrames={FRAMES_PER_CLIP + TRANSITION_FRAMES}
        >
          <ClipComponent clip={clip} />
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

        <div
          style={{
            width: lineWidth,
            height: 2,
            backgroundColor: COLORS.gold,
            marginTop: 6,
            opacity: 0.8,
          }}
        />

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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '75%',
            marginBottom: 8,
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: 'Arial, sans-serif', letterSpacing: 2 }}>
            PHILLY
          </span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: 'Arial, sans-serif', letterSpacing: 2 }}>
            CALI
          </span>
        </div>

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

        <div style={{ width: '75%', position: 'relative', height: 20 }}>
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

      {/* Music — loop if track is shorter than 90s */}
      <Audio src={staticFile('Mindset.mp3')} volume={0.8} loop />
    </AbsoluteFill>
  );
};
