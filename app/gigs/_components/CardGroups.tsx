"use client"
import { createContext, useContext, useEffect, useState } from "react"
import * as S from "./groups.style"

export const Group = ({ id, title, colorNumber = 6, count, dragging = false, double = false, children }) => {
  const { gigs, attendanceSummary, expanded, setExpanded } = useContext(GroupCTX),
    open = expanded === id,
    totalAttendance = attendanceSummary.reduce((a, c) => a + c.count, 0)
  if (double) {
    return (
      <>
        <S.DoubleSection id={id} $open={open}>
          <S.Link onClick={() => setExpanded(id)}>
            <S.Group
              $colorNumber={colorNumber}
              $count={gigs.maybe.data.length * 2}
              className={(dragging && "drag-hover") || ""}
            >
              <S.Count className="cards__expander-count">{gigs.maybe.data.length}</S.Count>
              <S.Title className="cards__expander-title">{title + String()}</S.Title>
            </S.Group>
          </S.Link>
          {double && (
            <S.Link onClick={() => setExpanded(id)}>
              <S.Group
                $side="right"
                $colorNumber={7}
                $count={gigs.others.data.length * 2}
                className={(dragging && "drag-hover") || ""}
              >
                <S.Title className="cards__expander-title">Mates</S.Title>
                <S.Count className="cards__expander-count">{gigs.others.data.length}</S.Count>
              </S.Group>
            </S.Link>
          )}
        </S.DoubleSection>
        {open && <S.Content>{children}</S.Content>}
      </>
    )
  }
  return (
    <S.Section id={id} $open={open}>
      <S.Link onClick={() => setExpanded(id)}>
        <S.Group $colorNumber={colorNumber} $count={count} className={(dragging && "drag-hover") || ""}>
          <S.Count className="cards__expander-count">{count}</S.Count>
          <S.Title className="cards__expander-title">{title + String()}</S.Title>
        </S.Group>
      </S.Link>
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
    others: { name: "Others", data: [] },
  },
  attendanceSummary: [] as { count: number; status: string }[],
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
