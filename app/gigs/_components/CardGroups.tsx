"use client"
import { createContext, useContext, useEffect, useState } from "react"
import * as S from "./groups.style"
import { Day, DayNull } from "./gig-card.styles"
import { format } from "date-fns"
import { GigCard } from "./GigCard"

type Item = {
  id: string
  title: string
  startDate: string
  organiser?: string
  location?: string
}

export const Group = ({ id, title, colorNumber = 6, count, gigs, dragging = false, double = false, items }) => {
  const { attendanceSummary, expanded, setExpanded } = useContext(GroupCTX),
    open = expanded === id,
    totalAttendance = attendanceSummary.reduce((a, c) => a + c.count, 0)
  if (double) {
    return (
      <>
        <S.DoubleSection id={id} $open={open}>
          <S.Link onClick={() => setExpanded(id)}>
            <S.Group
              $colorNumber={colorNumber}
              $count={gigs.maybe.length * 2}
              className={(dragging && "drag-hover") || ""}
            >
              <S.Count className="cards__expander-count">{gigs.maybe.length}</S.Count>
              <S.Title className="cards__expander-title">{title + String()}</S.Title>
            </S.Group>
          </S.Link>
          {double && (
            <S.Link onClick={() => setExpanded(id)}>
              <S.Group
                $side="right"
                $colorNumber={7}
                $count={gigs.others.length * 2}
                className={(dragging && "drag-hover") || ""}
              >
                <S.Title className="cards__expander-title">Mates</S.Title>
                <S.Count className="cards__expander-count">{gigs.others.length}</S.Count>
              </S.Group>
            </S.Link>
          )}
        </S.DoubleSection>
        {open && (
          <S.Content>
            <GigCards items={items} groupId={id} />
          </S.Content>
        )}
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
      {open && (
        <S.Content>
          <GigCards items={items} groupId={id} />
        </S.Content>
      )}
    </S.Section>
  )
}

const formatDate = (startDate) => startDate && format(new Date(startDate), "MM-dd")
const GigCards = ({ items, groupId }) => {
  if (!items) return null

  let isPrevDate = false
  return (
    <>
      {items.map(
        (item, index, arr) => (
          (isPrevDate = formatDate(item.startDate) === formatDate(arr[index - 1]?.startDate)),
          (
            <S.DateTrack key={item.id}>
              {isPrevDate ? <DayNull /> : <Day> {format(new Date(item.startDate), "EEEE d MMMM")}</Day>}
              <GigCard groupId={groupId} index={index} {...item} />
            </S.DateTrack>
          )
        )
      )}
    </>
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
