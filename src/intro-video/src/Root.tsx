import React from 'react';
import { Composition } from 'remotion';
import { IntroVideo } from './IntroVideo';

// 11 states × 30 frames each = 330 frames (~11 seconds at 30fps)
// Perfect loop length for an intro

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="IntroVideo"
        component={IntroVideo}
        durationInFrames={330}
        fps={30}
        width={1080}
        height={1920} // Vertical (9:16) for Reels/TikTok/Shorts
      />
      <Composition
        id="IntroVideoWide"
        component={IntroVideo}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080} // Horizontal (16:9) for YouTube/Twitch
      />
      <Composition
        id="IntroVideoSquare"
        component={IntroVideo}
        durationInFrames={330}
        fps={30}
        width={1080}
        height={1080} // Square for Facebook/Twitter
      />
    </>
  );
};
