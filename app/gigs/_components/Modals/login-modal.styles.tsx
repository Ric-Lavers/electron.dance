"use client"
import { theme } from "@/styles/theme"
import styled from "styled-components"

export const Container = styled.div`
  display: grid;
`

export const Circle = styled.span`
  height: 48px;
  width: 48px;
  border-radius: 24px;
  background: red;
  border: 1px solid #333;

  display: grid;
  place-items: center;
  svg {
  }
  overflow: hidden;
  img {
    width: 100%;
  }
  :has(img) {
    background: #444;
  }
`
export const Content = styled.p``

export const List = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
`

export const Item = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 16px;

  svg {
    flex: 0 1 auto;
  }
  div {
    flex: 1 1 auto;
  }
  p {
    margin: 0;
  }
`

export const TimeSlot = styled.button`
  border: 0;
  padding: 0;

  grid-column: span 2;
  overflow: hidden;
  padding-top: 0;
  padding-bottom: 0;
  border: 1px solid ${theme.palette.bottlebrushGreen};

  cursor: pointer;
  border-radius: 4px;
  background-color: white;
  color: ${theme.colors.buttons.text.default};
  &:hover {
    background: ${theme?.palette.bottlebrushGreen};
    color: ${theme.palette.softPaper};
  }
  &:active {
    background: ${theme.palette.bushlandDeep};
    color: ${theme.palette.softPaper};
  }

  time {
  }
`
export const Button = styled(TimeSlot)`
  display: flex;
  gap: 4px;
  padding: 8px 16px;
  min-width: 80px;
  justify-content: center;
  svg {
    width: 16px;
    height: 16px;
  }
`
