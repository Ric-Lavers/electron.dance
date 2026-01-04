"use client"
import React, { createContext, useActionState, useContext, useEffect, useMemo, useState } from "react"

import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { GigCard } from "./GigCard"
import { Group, GroupCTX } from "./CardGroups"
import { format } from "date-fns"
import { Day, DayNull } from "./gig-card.styles"
import { saveUserGigs } from "../_utils/localStorage"
import { GroupId } from "../_utils/types"
import { updateUserGigAttendance } from "@/app/api/_lib/actions/user"
import { DateTrack } from "./groups.style"

type Item = {
  id: string
  title: string
  startDate: string
  organiser?: string
  location?: string
}

type State = Record<GroupId | "others", Item[]>

export const ITEM_DRAG_TYPE = "ARTICLE_ITEM"

function removeAt<T>(arr: T[], index: number) {
  const next = arr.slice()
  const [removed] = next.splice(index, 1)
  return { next, removed }
}

function insertAt<T>(arr: T[], index: number, item: T) {
  const next = arr.slice()
  next.splice(index, 0, item)
  return next
}

function findItem(state: State, id: string): { columnId: GroupId; index: number; item: Item } | null {
  for (const columnId of Object.keys(state) as GroupId[]) {
    const index = state[columnId].findIndex((x) => x.id === id)
    if (index !== -1) return { columnId, index, item: state[columnId][index] }
  }
  return null
}


const useDragGroup = (groupId) => {
  const { consideringDropId } = useContext(onDropCTX)
  const [dragging, s_dragging] = useState(false)

  useEffect(() => {
    const el = document.getElementById(`container-${groupId}`)
    if (!el) return

    return dropTargetForElements({
      element: el,
      getData: () => ({ type: "SECTION", columnId: groupId, groupId }),

      onDragEnter() {
        s_dragging(true)
      },
      onDragLeave() {
        s_dragging(false)
      },
      onDrag() {
        document.body.style.cursor = "grabbing"
      },
      onDrop() {
        document.body.style.cursor = "default"
        s_dragging(false)
      },
    })
  }, [groupId])

  return dragging || dragging || consideringDropId === groupId
}
function DragGroup(props: { id: GroupId; title: string; items: Item[]; colorNumber: number; gigs: object }) {
  const { id: groupId, title, items, colorNumber, gigs } = props

  const dragging = useDragGroup(groupId)
  const formatDate = (startDate) => startDate && format(new Date(startDate), "MM-dd")
  let isPrevDate = false

  return (
    <>
      <Group
        id={`container-${groupId}`}
        title={title}
        count={items.length}
        gigs={gigs}
        colorNumber={colorNumber}
        double={groupId === "maybe"}
        dragging={dragging}
      >
        {items.map(
          (item, index, arr) => (
            (isPrevDate = formatDate(item.startDate) === formatDate(arr[index - 1]?.startDate)),
            (
              <DateTrack key={item.id}>
                {isPrevDate ? <DayNull /> : <Day> {format(new Date(item.startDate), "EEEE d MMMM")}</Day>}
                {/* @ts-ignore */}
                <GigCard groupId={groupId} index={index} {...item} />
              </DateTrack>
            )
          )
        )}
      </Group>
    </>
  )
}

let newDrops =
  ({ toColumnId, id }) =>
  (prev) => {
    const current = findItem(prev, id)
    if (!current) return prev

    const fromColumnId = current.columnId
    const fromIndex = current.index

    // Default: append to end of section
    let toIndex = prev[toColumnId].length

    if (fromColumnId === toColumnId) {
      return prev
    }
    // If dropping within same section, keep "append" behavior unless you want pointer-based insertion.
    // This minimal example appends when dropped on the section.
    const { next: fromListWithout, removed } = removeAt(prev[fromColumnId], fromIndex)
    if (!removed) return prev

    const nextToList = insertAt(
      prev[toColumnId],
      // If moving within same column and we removed earlier index, adjust insertion index
      fromColumnId === toColumnId && fromIndex < toIndex ? toIndex - 1 : toIndex,
      removed
    )

    return {
      ...prev,
      [fromColumnId]: fromListWithout,
      [toColumnId]: nextToList,
    }
  }

export default function TwoSectionDnD({ gigs }) {
  let { gigs: stored_gigs } = useContext(GroupCTX)
  const [consideringDropId, s_ConsideringDropId] = useState("")

  const gigData = extractData(gigs)

  const [state, setState] = useState<State>(gigData)
  useEffect(() => {
    setState(extractData(stored_gigs))
  }, [stored_gigs])

  async function setUsersGroups({ groupId, id }) {
    const newGroups = newDrops({ toColumnId: groupId, id })(state)

    setState(newGroups)
    updateUserGigAttendance({ groupId, eventId: id })
  }
  function setConsideringDropId(groupId: GroupId) {
    s_ConsideringDropId(groupId)
  }

  // Monitor handles the "drop" and updates state.
  useEffect(() => {
    return monitorForElements({
      onDrop: ({ source, location }) => {
        const id = String(source?.data?.id)

        if (!source?.data?.id || source?.data?.type !== ITEM_DRAG_TYPE) return

        const targets = location.current.dropTargets,
          ÆØN = targets.find((t) => (t.data as any)?.type === "SECTION"),
          groupId = ÆØN?.data?.columnId as GroupId

        if (!groupId) return

        setUsersGroups({ groupId, id })
      },
    })
    // Important: state is used inside onDrop to find the source item.
    // If you prefer not to depend on `state`, resolve source data from `source.data` only.
  }, [state])

  const maybeItems = useMemo(() => {
    console.log("maybeItems")

    return [...state.maybe, ...state.others].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
  }, [state.maybe, state.others])

  return (
    //@ts-ignore
    <onDropCTX.Provider value={{ setUsersGroups, consideringDropId, setConsideringDropId }}>
      <div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
        <DragGroup id="going" title="Going" gigs={state} items={state.going} colorNumber={5} />
        <DragGroup id="maybe" title="Maybe" gigs={state} items={maybeItems} colorNumber={3} />
        <DragGroup id="sydney" title="Sydney" gigs={state} items={state.sydney} colorNumber={6} />
      </div>
    </onDropCTX.Provider>
  )
}
export const onDropCTX = createContext({
  consideringDropId: "",
  setConsideringDropId: (_) => {},
  setUsersGroups: ({ id, groupId }) => {
    console.log("ctx not set up", { id, groupId })
  },
})

function extractData(gigs) {
  let entries = Object.entries(gigs),
    result = {
      going: [],
      maybe: [],
      sydney: [],
      others: [],
    }

  if (!entries.length) {
    return result
  }
  //@ts-ignore
  result = entries.reduce((a, [k, v]) => {
    //@ts-ignore
    a[k] = v.data
    return a
  }, {})

  return result
}
