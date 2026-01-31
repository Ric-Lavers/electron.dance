"use client"
import { createContext, useContext, useEffect, useRef, useState } from "react"
// import { useVirtualizer } from "@tanstack/react-virtual"
import * as S from "./groups.style"

import { format } from "date-fns"
import { GigCard } from "./GigCard"

type Item = {
  id: string
  title: string
  startDate: string
  organiser?: string
  location?: string
}

export const Group = ({
  id,
  groupId,
  title,
  colorNumber = 6,
  count,
  gigs,
  dragging = false,
  double = false,
  items,
}) => {
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
            <GigCards items={items} groupId={groupId} />
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
      {open && <GigCards items={items} groupId={groupId} />}
    </S.Section>
  )
}

const GigCards = ({ items, groupId }) => {
  const parentRef = useRef<HTMLUListElement>(null)
  const groups = groupByDate(items)

  // const v = useVirtualizer({
  //   horizontal: true,
  //   count: groups.length,
  //   getScrollElement: () => parentRef.current,
  //   estimateSize: (i) => {
  //     console.log("size", groups[i].date, groups[i].width)
  //     return groups[i].width
  //   },
  //   overscan: 3,
  // })

  if (!items) return null
  return (
    <>
      <S.Content ref={parentRef} style={{ position: "relative" }}>
        <table style={{ borderSpacing: "16px 4px", borderCollapse: "separate" }}>
          <tbody>
            <tr>
              {groups.map((group) => {
                return (
                  <S.StickyTd key={group.date} colSpan={group.items.length} style={{ minWidth: 250 }}>
                    <S.Day>{group.date}</S.Day>
                  </S.StickyTd>
                )
              })}
            </tr>

            <tr>
              {groups.map((group) => {
                return group.items.map((item, index) => (
                  <S.Td key={item.id} style={{ minWidth: 250 }}>
                    <GigCard groupId={groupId} index={index} {...item} />
                  </S.Td>
                ))
              })}
            </tr>
            {/*  <tr>
              {v.getVirtualItems().map((vi) => {
                const group = groups[vi.index]
                return (
                  <S.StickyTd key={group.date} colSpan={group.items.length} style={{ minWidth: 250 }}>
                    <S.Day>{group.date}</S.Day>
                  </S.StickyTd>
                )
              })}
            </tr>
             <tr>
              {v.getVirtualItems().map((vi) => {
                const group = groups[vi.index]

                return group.items.map((item, index) => (
                  <S.Td key={item.id} style={{ minWidth: 250 }}>
                    <GigCard groupId={groupId} index={index} {...item} />
                  </S.Td>
                ))
              })}
            </tr> */}
          </tbody>
        </table>
      </S.Content>

      {/* <S.Content>
        {items.map((item, index, arr) => {
          const isPrevDate = formatDate(item.startDate) === formatDate(arr[index - 1]?.startDate)
          return (
            <>
              <S.DateTrack key={item.id}>
                {isPrevDate ? null : <S.Day> {format(new Date(item.startDate), "EEEE d MMMM")}</S.Day>}

                <GigCard groupId={groupId} index={index} {...item} />
              </S.DateTrack>
            </>
          )
        })}
      </S.Content> */}
    </>
  )
}

function groupByDate(items: (Item & { index: number })[]) {
  const groups: { date: string; items: Item[] }[] = []

  let index = 0
  for (const item of items) {
    const date = format(new Date(item.startDate), "EEEE d MMMM")
    const last = groups.at(-1)
    item.index = index

    if (last && last.date === date) {
      last.items.push(item)
    } else {
      groups.push({ date, items: [item] })
    }
  }
  index++

  return groups.map((g) => ({
    ...g,
    width: g.items.length * 250,
  }))
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
