"use client";
import styled, { css } from "styled-components";

export const Section = styled.section<{ $open: boolean }>`
  padding: 8px 0;
  row-gap: 16px;

  display: grid;
  grid-auto-flow: column;

  /* overflow-x: auto; */

  scroll-snap-type: x proximity;
  scroll-behavior: smooth;
  scrollbar-width: none;
  ${({ $open }) =>
    $open
      ? css`
          --content-visibility: visible;
          min-height: 160px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        `
      : css`
          --content-visibility: hidden;
        `};
`;
export const Content = styled.ul`
  //<{ $open: boolean }>
  visibility: var(--content-visibility);
  display: var(--content-visibility);

  overflow: scroll;

  display: flex;
  padding: 8px;
  column-gap: 16px;

  margin: 0;
  padding: 0;
  margin-right: -4px;
  padding-right: 4px;
  row-gap: 16px;

  scroll-snap-type: x proximity;
  scroll-behavior: smooth;
  scrollbar-width: none;
  grid-template-rows: auto;
  grid-auto-columns: 45%;
`;

export const Link = styled.button`
  /* all: unset;
  cursor: pointer; */
  appearance: none;
  border: 0;
  padding: 0;
  background: none;
  cursor: pointer;
`;

export const Group = styled.div<{ $count: number; $colorNumber: number }>`
  color: #000;
  width: 100%;

  --card-color: ${({ $colorNumber }) =>
    `var(--color-card-${$colorNumber % 8})`};
  --color-canvas: #fff;
  --column-width-collapsed: 40px;
  --card-count: ${({ $count }) => $count};
  --progress-max-width: 100%;
  --progress-max-cards: 20;
  --progress-increment: var(--progress-max-width) / var(--progress-max-cards);
  --column-color: color-mix(
    in srgb,
    var(--card-color) 15%,
    var(--color-canvas)
  );
  --column-color: color-mix(
    in srgb,
    var(--card-color) 15%,
    var(--color-canvas)
  );
  --column-color-strong: color-mix(
    in srgb,
    var(--card-color) 45%,
    var(--color-canvas)
  );
  /* 
  
  
  --column-gap: 8px;
  --column-padding-expanded: calc(var(--column-gap) * 2);

  --column-color: color-mix(in srgb, var(--card-color) 15%, var(--color-canvas)); */

  display: flex;
  gap: 8px;
  position: relative;
  align-items: center;
  @keyframes linePulse {
    0% {
      block-size: 3px;
      background-color: var(--column-color);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
    50% {
      block-size: 7px;
      background-color: var(--column-color-strong);
      box-shadow: 0 0 0 3px
        color-mix(in srgb, var(--column-color-strong) 35%, transparent);
    }
    100% {
      block-size: 3px;
      background-color: var(--column-color);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

  &::before {
    content: "";
    position: absolute;
    block-size: 3px;

    inline-size: 100%;
    inset: 50% 0 auto;
    translate: 0 -50%;
    background-color: var(--column-color);
    z-index: 0;
  }
  &.drag-hover::before {
    animation: linePulse 1.1s ease-in-out infinite;
  }
  &::after {
    content: "";
    position: absolute;
    border-radius: 99px;

    inline-size: calc(
      var(--column-width-collapsed) + var(--card-count) *
        var(--progress-increment)
    );

    max-inline-size: var(--progress-max-width);
    max-block-size: 40px;
    height: 40px;
    background: linear-gradient(
      to right,
      var(--card-color),
      var(--column-color) 80%
    );
    background: var(--card-color);
    background: var(--column-color);
    background-image: linear-gradient(
      to right,
      oklch(0.66 0.258 308),
      color(srgb 0.961665 0.898301 1.00521) 80%
    );
    background-image: linear-gradient(
      to right,
      var(--card-color),
      var(--column-color) 80%
    );

    /* block-size: var(--column-width-collapsed);
    inline-size: calc(var(--column-width-collapsed) + var(--card-count) * var(--progress-increment));
    margin-inline-start: 0;
    max-inline-size: var(--progress-max-width);

    
    
    block-size: var(--column-width-collapsed);
    border-radius: 99rem;

    inset: 0 0 auto;
    margin-inline: auto;
    max-block-size: 40px;
    min-block-size: 40px;
    opacity: 0;
    position: absolute;
    transition: block-size 500ms var(--ease-out-overshoot), inline-size var(--column-transition-duration) ease-out,
      opacity var(--column-transition-duration) ease-out; */
  }
`;
export const Count = styled.span`
  width: 40px;
  height: 40px;
  z-index: 1;

  display: grid;
  place-content: center;
`;
export const Title = styled.h2`
  text-transform: uppercase;
  font-size: 13px;
  font-weight: bolder;
  z-index: 1;
`;
