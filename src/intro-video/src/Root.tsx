import React from 'react';
import { Composition } from 'remotion';
import { IntroVideo } from './IntroVideo';

// 6 slides × 45 frames each = 270 frames (9 seconds at 30fps)
// Perfect loop length for an intro

const DURATION = 270;

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
