# Add Brand Icon

Use this skill when adding a brand/social icon to the homepage (`app/page.tsx`).

## Steps

1. **Fetch the real SVG path from SimpleIcons** — never hand-draw brand logos:
   ```
   https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/<brandname>.svg
   ```
   Extract the `d` attribute from the `<path>` and the `viewBox`.

2. **Apply the brand gradient** — all icons on this page use the same pink→purple gradient:
   ```jsx
   <linearGradient id="<unique-id>-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
     <stop offset="0%" stopColor="#ff6ec4" />
     <stop offset="100%" stopColor="#7873f5" />
   </linearGradient>
   ```
   Set `fill="url(#<unique-id>-gradient)"` on the path.

3. **Pick a position** — the 8 compass positions are taken. Check `app/page.tsx` for what's currently placed where, then find a free or logical spot. Existing layout:
   - top-left: WhatsApp
   - top-center: Beta
   - top-right: Instagram
   - middle-left: Listen
   - middle-right: Gigs
   - bottom-left: DJ Cards
   - bottom-center: SMS bot
   - bottom-right: Mixs
   - bottom-25%-right: SoundCloud

4. **Use the standard link block pattern**:
   ```jsx
   <a
     href="<url>"
     target="_blank"
     rel="noopener noreferrer"
     className="fade-in"
     style={{
       position: "absolute",
       <position props>,
       opacity: 0,
       width: "clamp(50px, 10vw, 80px)",
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       gap: 4,
       textDecoration: "none",
     }}
   >
     <svg width="100%" viewBox="<viewBox>" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="<unique-id>-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
           <stop offset="0%" stopColor="#ff6ec4" />
           <stop offset="100%" stopColor="#7873f5" />
         </linearGradient>
       </defs>
       <path fill="url(#<unique-id>-gradient)" d="<path data>"/>
     </svg>
     <p style={{ color: "#ff6ec4", lineHeight: 0.8, fontSize: "clamp(10px, 1.5vw, 14px)", textAlign: "center", margin: 0 }}>
       Label
     </p>
   </a>
   ```

5. Use a **unique gradient ID** — existing IDs in use: `gig-gradient`, `sms-gradient`, `mix-gradient`, `beta-gradient`, `listen-gradient`, `sc-gradient`, `modernGradient_pink`, `modernGradient_blue`.
