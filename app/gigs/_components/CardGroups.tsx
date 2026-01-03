"use client";
import { createContext, useContext, useEffect, useState } from "react";
import * as S from "./groups.style";

export const Group = ({ id, title, colorNumber = 6, count = 5, dragging = false, double = false, children }) => {
  const { expanded, setExpanded } = useContext(GroupCTX),
    open = expanded === id

  return (
    <S.Section id={id} $open={open}>
      <S.Link onClick={() => setExpanded(id)}>
        <S.Group $colorNumber={colorNumber} $count={count} className={(dragging && 'drag-hover') || ''}>
          <S.Count className="cards__expander-count">{count}</S.Count>
          <S.Title className="cards__expander-title">{title + String()}</S.Title>
        </S.Group>
      </S.Link>
      {double && (
        <S.Link>
          <S.Group $side="right" $colorNumber={colorNumber} $count={count} className={(dragging && 'drag-hover') || ''}>
            <S.Title className="cards__expander-title">{title + String()}</S.Title>
            <S.Count className="cards__expander-count">{count}</S.Count>
          </S.Group>
        </S.Link>
      )}
      {open && <S.Content>{children}</S.Content>}
    </S.Section>
  )
}

export const GroupCTX = createContext({
  expanded: "Going",
  gigs: {
    going: { name: "Going", data: [] },
    maybe: { name: "Maybe", data: [] },
    sydney: { name: "Sydney", data: [] },
  },
  attendanceSummary: [],
  setExpanded: (_: string) => {},
})

export const GroupS_CTX = ({ gigs, initialExpanded = "container-sydney", attendanceSummary, children }) => {
  const [expanded, s_open] = useState(initialExpanded)

  return (
    <GroupCTX.Provider
      value={{
        gigs,
        attendanceSummary,
        expanded,
        setExpanded: (goupId) => {
          s_open(goupId)
        },
      }}
    >
      <section>{children}</section>
    </GroupCTX.Provider>
  )
}
