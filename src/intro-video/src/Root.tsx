import React from 'react';
import { Composition } from 'remotion';
import { IntroVideo } from './IntroVideo';

// 15 clips × 180 frames each = 2700 frames (90 seconds at 30fps)
// Highlight reel of the entire Faith Walk journey

const DURATION = 2700;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="IntroVideo"
        component={IntroVideo}
        durationInFrames={DURATION}
        fps={30}
        width={1080}
        height={1920} // Vertical (9:16) for Reels/TikTok/Shorts
      />
      <Composition
        id="IntroVideoWide"
        component={IntroVideo}
        durationInFrames={DURATION}
        fps={30}
        width={1920}
        height={1080} // Horizontal (16:9) for YouTube/Twitch
      />
      <Composition
        id="IntroVideoSquare"
        component={IntroVideo}
        durationInFrames={DURATION}
        fps={30}
        width={1080}
        height={1080} // Square for Facebook/Twitter
      />
    </>
  );
};
