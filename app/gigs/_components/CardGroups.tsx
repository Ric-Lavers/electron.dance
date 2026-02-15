"use client"
import { createContext, useContext, useEffect, useRef, useState } from "react"
// import { useVirtualizer } from "@tanstack/react-virtual"
import * as S from "./groups.style"

import { format } from "date-fns"
import { GigCard } from "./GigCard"
import { ChevronRewindIcon, ChevronRightIcon } from "@/component-library"

type Item = {
  id: string
  title: string
  organiser?: string
  artists: string[]
  location: string
  startDate: string | Date
  url: string
  image: string
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
    totalAttendance = attendanceSummary.reduce((a, c) => a + c.count, 0),
    maybeSet = new Set<string>([])

  if (double) {
    gigs.maybe.map((g) => maybeSet.add(g.id))
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
          <S.ContentList>
            <GigCards items={items} groupId={groupId} maybeSet={maybeSet} />
          </S.ContentList>
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
      {/* <S.End id="end" /> */}
    </S.Section>
  )
}

const GigCards = ({ items, groupId, maybeSet = new Set<string>([]) }) => {
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
  function sortMaybeItems({}) {
    /* already done -> on pages.tsx */
    // if (groupId != "maybe" || groupId != "others" ) return items
    // let _id = () => ({ id }) => id,
    //   itemIds = items.map(_id)
    //   items = [...items.filter(({ id }) => maybeSet.has(id)), ...items.filter(({ id }) => !maybeSet.has(id))]
    //   console.log("itmems", items, maybeSet)
  }
  sortMaybeItems({})
  if (!items) return null
  return (
    <>
      <S.ContentList ref={parentRef} style={{ position: "relative" }}>
        <div id="start" />
        <table style={{ borderSpacing: "16px 4px", borderCollapse: "separate" }}>
          <tbody>
            <tr>
              {groups.map((group, index) => {
                return (
                  <S.StickyTd
                    key={group.date}
                    id={String(index)}
                    colSpan={group.items.length}
                    style={{ minWidth: 250 }}
                  >
                    <S.Day>
                      {index > 0 && (
                        <S.PrevButton
                          id="rewind"
                          onClick={() => {
                            document.getElementById("start")?.scrollIntoView({ behavior: "smooth", inline: "start" })
                          }}
                        >
                          <ChevronRewindIcon width={20} />
                        </S.PrevButton>
                      )}
                      <span>{group.date} </span>
                      <S.NextButton
                        id="next"
                        onClick={() => {
                          document
                            .getElementById(String(index + 1))
                            ?.scrollIntoView({ behavior: "smooth", inline: "start" })
                        }}
                      >
                        <ChevronRightIcon width={20} />
                      </S.NextButton>
                    </S.Day>
                  </S.StickyTd>
                )
              })}
            </tr>

            <tr>
              {groups.map((group) => {
                return group.items.map((item, index) => (
                  <S.Td key={item.id} style={{ minWidth: 250 }}>
                    <GigCard
                      groupId={groupId}
                      index={index}
                      id={item.id}
                      title={item.title}
                      artists={item.artists}
                      organiser={item.organiser}
                      location={item.location}
                      startDate={item.startDate}
                      url={item.url}
                      image={item.image}
                    />
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
      </S.ContentList>

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
