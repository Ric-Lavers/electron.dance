'use client'
import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`

export const Title = styled.h1`
  --divider-color: oklch(var(--lch-ink-light));
  text-rendering: optimizeLegibility;
  line-height: 1.375;
  color: oklch(var(--lch-ink-darkest));
  font-weight: 900;
  font-size: 24px;
  text-align: center;
  width: 100%;
  position: relative;

  &::after {
    content: '';
    position: absolute;

    block-size: 1.5px;
    background-image: linear-gradient(to right, var(--divider-color), transparent, var(--divider-color));
    flex: 1;
    inset: 50% 0 auto;
    z-index: 0;
  }
  span {
    position: relative;
    z-index: 1;
  }
`

export const Action = styled.button`
  appearance: none;
  border: 0;
  padding: 0;
  cursor: pointer;

  border-radius: 40px;
  height: 36px;
  width: 36px;
`
