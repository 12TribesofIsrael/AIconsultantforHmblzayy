# Faith Walk Distribution Playbook — Days 31–40

**10-day max-ROI plan.** Days 31–39 = native **Repost** (1 tap, ride Zay's existing algo wave). Day 40 = **Remix** (face-on-camera reaction, biblical 40-day wilderness moment).

The Story link sticker is the click driver every single day. The Reel gets reach. The Story gets clicks. Both ship every day, no exceptions.

---

## TODAY'S FACTS (update each morning before posting)

- **Day:** 31
- **Walking to:** Dayton, OH
- **Miles to go:** 26
- **Total miles walked:** 607
- **Date:** Apr 26, 2026
- **UTM campaign:** `faithwalk-day-31`
- **TT post to Repost:** https://www.tiktok.com/@hmblzayy/video/7623225855002545439 *(2M views — his biggest hit)*
- **IG post to Repost:** https://www.instagram.com/ministerzay/reel/DXiQJWtkuha/ *(269K views — newest walk-era Reel)*

---

## DAILY FLOW — Days 31 through 39 (~10 min/day)

Three steps. Identical every day. Just rotate the day number, miles, and UTM campaign ID.

### STEP 1 — TikTok Repost (30 sec)

1. Open the TikTok app
2. Tap the **search icon** (magnifying glass, bottom row)
3. Paste the **TT post URL** from "Today's facts" → tap search
4. Tap into the post when it loads
5. Tap the **paper-airplane icon** (left side of the screen, between heart and comment)
6. In the share menu, tap **Repost**
7. In the **"Add your thoughts"** box, paste:

   ```
   Day 31. 607 miles in. He's still walking. 🙏🏾
   Live tracker → link in bio.
   ```

8. Tap **Post** (top-right)
9. DONE

### STEP 2 — Instagram Repost (30 sec)

1. Open the Instagram app
2. Tap **search icon** (magnifying glass, bottom row) → search `ministerzay`
3. Tap his profile → tap the **Reels tab** (clapperboard icon)
4. Tap the IG Reel from "Today's facts" (or just the most recent Reel if it matches)
5. Tap the **paper-airplane icon** under the Reel
6. Look for **Repost** in the menu (icon = two arrows in a loop)
7. Tap **Repost**
8. In the **"Add your thoughts"** box, paste:

   ```
   Day 31. 607 miles in. He's still walking. 🙏🏾
   Live tracker → link in bio.
   ```

9. Tap **Repost** (top-right blue button) to confirm
10. DONE

⚠️ **If no Repost button appears** (the Aug 2025 rollout was uneven — your account may not have it yet): one-time fall back to native Remix:
- Tap **paper-airplane** → **Remix this Reel** → **Reaction** layout → hold record button 10–15 sec → say *"Day 31, he's still walking, link in bio"* → release → tap **Next →** → paste same caption above → tap **Share**
- This is a one-shot fallback. If Repost shows up tomorrow, switch back to it.

### STEP 3 — Instagram Story (5 min — THE CLICK DRIVER, DO NOT SKIP)

The Reel gets reach. The Story gets clicks. Within 30 minutes of finishing Step 2, run this every single day.

1. Open Instagram
2. Tap your **profile picture (top-left)** with the `+` symbol → **Add to Story**
3. **Background** options (pick one):
   - **Easiest:** screenshot of [faithwalklive.com](https://faithwalklive.com) on your phone, then choose it from your camera roll
   - **Better:** short screen-record of the tracker (open faithwalklive.com → record screen for 5 sec while panning the map → choose from camera roll)
4. Tap the **Sticker icon** (smiley face square at top)
5. Tap **Link**
6. Paste this URL exactly (the day number rotates daily — see "Update each morning" below):

   ```
   https://faithwalklive.com/?utm_source=ig_story&utm_medium=sticker&utm_campaign=faithwalk-day-31
   ```

7. Tap **Done**
8. In the **"Customize sticker"** box, type: `Watch the route →`
9. Tap **Done**
10. **Drag the link sticker to the middle of the screen** (NOT top, NOT bottom — IG covers both)
11. Tap **Sticker icon** again → tap **Poll**
12. Type: `Will he reach California?`
13. Option 1: `He's locked in 🔥`
14. Option 2: `Praying him there 🙏🏾`
15. Place the poll **below** the link sticker
16. Tap **Aa** (text tool) at the top → type:

    ```
    Day 31. 26 mi to Dayton, OH.
    He's still walking. 🙏🏾
    ```

17. Place text at the **top** of the screen (above the link sticker)
18. Tap **Your Story** at bottom-left → DONE

---

## EVERY MORNING — Refresh "Today's Facts" (~3 min)

Before running Steps 1–3, update the facts block at the top of this doc.

### A. Update day, miles, destination

1. Run `npm run tracker:from-title` (or wait for the 30-min watch cron)
2. Open `src/faith-walk-tracker/checkpoints.json` — the bottom entry has the live `inProgressDay`, `destination`, `milesRemaining`, and total `miles`
3. Update the facts block above:
   - `Day:` → new in-progress day number
   - `Walking to:` → `destination` field
   - `Miles to go:` → `milesRemaining` field
   - `Total miles walked:` → `miles` field
   - `UTM campaign:` → `faithwalk-day-N` (N = new day number)
4. Update the URL in Step 3 — change `faithwalk-day-31` → `faithwalk-day-N`
5. Update both captions in Steps 1 and 2 — change `Day 31. 607 miles in.` → `Day N. [new miles] miles in.`

### B. Find today's top post on each platform

**TikTok:**
1. Open https://www.tiktok.com/@hmblzayy in any browser
2. Look at the top row of his recent videos
3. Pick the one with the **highest view count** posted in the past 48 hours
4. Tap into it → copy the URL → paste it into "Today's facts" as `TT post to Repost`

**Instagram:**
1. Open https://www.instagram.com/ministerzay/reels/
2. Look at the **first 3–5 Reels** posted in the last 48h
3. Pick the one with the highest view count (the third number on each Reel tile in grid view)
4. Tap into it → copy the URL → paste into "Today's facts" as `IG post to Repost`

If nothing was posted in the last 48h on a given platform, repost his next-most-recent high-view Reel/video from that platform.

---

## DAY 40 — Switch to MILESTONE REMIX (face-on-camera)

**Why Day 40 specifically:** 40 = the biblical wilderness number. Moses on the mountain (40 days). Israel in the desert (40 years). Christ fasting in the wilderness (40 days). Day 40 of the Faith Walk earns face-on-camera reaction in a way that Days 31–39 don't. This is your one moment to shift the framing from "I'm signal-boosting Zay" → "I'm a witness to this walk."

### Day 40 — TikTok Duet (90 sec)

1. Open TikTok → search `@hmblzayy` → tap his most recent Day 40 post
2. Tap the **paper-airplane icon**
3. Tap **Duet** (TikTok's name for split-screen)
4. Pick layout: **Side by side** (his video on the left, your camera on the right)
5. Hold the record button for 10–15 seconds
6. Talking points (pick what feels true to you — you don't have to say all):
   - *"Day 40."*
   - *"Forty days. The biblical wilderness number."*
   - *"He hasn't broken yet."*
   - *"Live tracker — link in bio."*
7. Tap **Next →** → caption:

   ```
   Day 40. The biblical wilderness number 🙏🏾
   He's still walking.

   Live map of every step → link in bio.

   #FaithWalk #40Days #Wilderness #HMBL #MinisterZay
   ```

8. Tap **Post**

### Day 40 — Instagram Remix (90 sec)

1. Open IG → search `ministerzay` → Reels tab → tap his most recent Day 40 Reel
2. Tap **paper-airplane** → **Remix this Reel**
3. Pick layout: **Reaction** (his video left, your camera right)
4. Record 10–15 seconds — same talking points as TT
5. Tap **Sticker** (smiley face) → search `@hmblzayy` → drop on screen
6. Tap **Next →**
7. Paste the same caption as TT above
8. Tap **Share**

### Day 40 — Story still ships (the click driver doesn't change)

Run the normal **Step 3** from above. Same link sticker logic. UTM = `faithwalk-day-40`.

### Day 40 — verse callout (optional, high-impact)

Quote a 40-day wilderness verse verbatim in a 2nd Story slide. **Don't quote from memory** — pull from `docs/1611KjvW_apocrypha.pdf` (or the canonical KJV equivalent). Anchor passages to look up: Exodus 24:18 (Moses), Numbers 14:34 (Israel), 1 Kings 19:8 (Elijah), Matthew 4:2 (Christ).

---

## DON'Ts

- ❌ Don't DM Minister Zay or message ShuggC during the 10 days (24-48hr rule between channels — last DM was Apr 22)
- ❌ Don't update the live tracker mid-day (end-of-night or morning only — Zay's safety)
- ❌ Don't put text in the bottom third of any Story (IG UI covers it)
- ❌ Don't use more than 5 hashtags on TT or IG (IG cap as of Dec 2025 — anything over 5 is wasted)
- ❌ Don't switch to Remix before Day 40 (Days 31–39 = Repost only; Day 40 earns the face-on-cam moment because of biblical resonance)
- ❌ Don't post the Story without the link sticker (it's the ONLY click path that works — link-in-bio CTR is ~0.004% per the 4-agent ROI check)

---

## When the Walk Ends (~Day 60-90, Cali arrival)

Restore everything to the YouTube-channel funnel:

1. **Update bios** across IG, TT, X, FB to:

   ```
   Faith-tech for the Kingdom 🙏🏾 New videos weekly → youtube.com/@AIBIBLEGOSPELS
   ```

2. **Swap bio link** from `faithwalklive.com/?utm_campaign=faithwalk-evergreen` → `https://youtube.com/@AIBIBLEGOSPELS`
3. **Final Story:** post a "thank you for walking with us" Story with the tracker frozen at the Cali endpoint, link sticker pointing at the YouTube channel
4. **Repurpose:** cut a 3-minute YouTube recap from the ~90 days of Twitch clips already attached to `checkpoints.json` entries

---

## Reference

- 4-agent ROI verdict (why Repost beats Remix Days 31-39): `.claude/memory/project_remix_roi_check.md`
- UTM tracking spreadsheet: [faithwalklive-utm-log.csv](faithwalklive-utm-log.csv)
- Full distribution blueprint (deeper context, not needed daily): [remix-overview.md](remix-overview.md)
- Yesterday's Day 30 snapshot (frozen, historical): [remix-playbook-day30.md](remix-playbook-day30.md)
