"use client";
import styled, { keyframes } from "styled-components";

export const Day = styled.h3`
  height: 24px;
`;
export const DayNull = styled.div`
  height: 24px;
`;

export const Item = styled.li`
  scroll-snap-align: start;
  border-radius: 8px;
  border: 1px solid #dedede;
  padding: 16px;
  min-width: 250px;
  max-width: 250px;
  width: clamp(250px, 45%, 300px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &::marker {
    display: none;
  }
`;
export const Card = styled.div`
  min-height: 88px;
  height: 100%;
  column-gap: 24px;
  row-gap: 16px;
  background-color: transparent;
  border-radius: 12px;

  transition: box-shadow 0.3s ease;
  &:focus-within {
    box-shadow: 2px 2px 4px 0 rgba(51, 49, 50, 0.24);
  }
  h3,
  p,
  time {
    margin: 0;
  }
`;
export const Title = styled.h3`
  grid-area: title;
  font-size: 1.1em;
  display: -webkit-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Support = styled.p`
  grid-area: support;
  font-size: 0.75em;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 4px;
  gap: 8px;
  time,
  p {
    font-size: 0.75em;
  }
`;
export const Time = styled.time``;
export const Location = styled.a`
  /* all: unset; */
  display: inline;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 13px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
export const Organiser = styled.p`
  font-size: 0.75em;
  width: 100%;
  padding: 0 4px;
  text-align: right;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const shrink = keyframes`
 from {
      transform: scale(1);
    }
    to {
      transform: scale(0.55);
    }
    `;
export const RangeWrap = styled.div<{ groupId: string }>`
  @media (hover: hover) and (pointer: fine) {
    /* display: none; */
  }
  @media (hover: none) and (pointer: coarse) {
    /* touch-only styles */
  }
  --card-color-public: var(--color-card-6);
  --line-public: color-mix(in srgb, var(--card-color-going) 15%, #fff);

  --card-color-going: var(--color-card-7);
  --line-going: color-mix(in srgb, var(--card-color-going) 15%, #fff);

  --card-color-maybe: var(--color-card-3);
  --line-maybe: color-mix(in srgb, var(--card-color-maybe) 15%, #fff);

  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  position: relative;

  translate: 0 0;

  /* transition: translate 1880ms cubic-bezier(0.2, 0.8, 0.2, 1); */
  scale: 1;
  transform: scale(1);

  .shronk {
    transform: scale(0.55);
  }
  .shrink {
    animation: ${shrink} 800ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  span {
    font-weight: 800;
    font-size: 14px;
    letter-spacing: 0.04em;
    z-index: 3;
    color: black;
    font-weight: bold;

    pointer-events: none;
  }
  input {
    z-index: 2;
    position: absolute;

    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 32px;
    background: transparent;
    cursor: pointer;

    &::-webkit-slider-runnable-track {
      height: 3px;
      border-radius: 999px;

      background-image: linear-gradient(
        to right,
        var(--line-going),
        var(--card-color-going),
        #fff,
        var(--card-color-maybe),
        var(--line-maybe)
      );
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      margin-top: -10px;
      border-radius: 50%;
      appearance: none;
      width: 24px;
      height: 24px;
      border: 0;
      background-color: lime;
      background-color: var(--card-color-public);
      background-color: var(--card-color-public);
      --left: var(--card-color-going);
      --right: var(--card-color-maybe);
      --center: var(--card-color-public);
      --to-center: clamp(0%, calc(var(--value) * 2), 100%);
      --from-center: clamp(0%, calc((var(--value) - 50%) * 2), 100%);

      background-color: color-mix(
        in srgb,
        var(--left) calc(100% - var(--value)),
        var(--right) var(--value)
      );
      background-color: color-mix(
        in srgb,
        color-mix(
            in srgb,
            var(--left) calc(100% - var(--to-center)),
            var(--center) var(--to-center)
          )
          calc(100% - var(--from-center)),
        var(--right) var(--from-center)
      );
    }
  }
`;

// export const DecideSlide = styled.div`
//   display: flex;
//   justify-content: space-between;
//   position: relative;
//   --card-color-public: var(--color-card-6);
//   --line-public: color-mix(in srgb, var(--card-color-going) 15%, #fff);
//   --card-color-going: var(--color-card-7);
//   --line-going: color-mix(in srgb, var(--card-color-going) 15%, #fff);
//   --card-color-maybe: var(--color-card-3);
//   --line-maybe: color-mix(in srgb, var(--card-color-maybe) 15%, #fff);
//   &::before {
//     content: '';
//     position: absolute;
//     block-size: 3px;

//     inline-size: 100%;
//     inset: 50% 0 auto;
//     translate: 0 -50%;
//     background-color: gold;
//     /* background-color: var(--card-color-maybe); */

//     background-image: linear-gradient(
//       to right,
//       var(--line-going),
//       var(--card-color-going),
//       #fff,
//       var(--card-color-maybe),
//       var(--line-maybe)
//     );

//     z-index: 0;
//   }
//   span {
//     text-transform: uppercase;
//     font-size: 13px;
//     z-index: 1;

//     color: black;
//     font-weight: bold;
//   }
//   position: relative;
//   div {
//     position: absolute;
//     width: 24px;
//     height: 24px;
//     border-radius: 12px;
//     background-color: var(--card-color-public);
//     left: calc(50% - 12px);
//     top: -4px;
//   }
// `

//let  options = (groupId_Ø) => (groupId: string) => {
//   let colorNumber = 6
//   switch (groupId) {
//     case 'going':
//       colorNumber = 7
//     case 'maybe':
//       colorNumber = 2
//     case 'public':
//     case 'sydney':
//       colorNumber = 6
//       return css`
//         --card-color-public: var(--color-card-6);
//         --line-public: color-mix(in srgb, var(--card-color-going) 15%, #fff);

//         --card-color-going: var(--color-card-7);
//         --line-going: color-mix(in srgb, var(--card-color-going) 15%, #fff);

//         --card-color-maybe: var(--color-card-3);
//         --line-maybe: color-mix(in srgb, var(--card-color-maybe) 15%, #fff);
//       `
//   }
// }
