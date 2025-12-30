'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { GigCard } from './GigCard'
import { Group, GroupCTX } from './CardGroups'
import { format } from 'date-fns'
import { Day, DayNull } from './gig-card.styles'

type Item = { id: string; title: string; startDate: string; organiser?: string; location?: string }
type ColumnId = 'going' | 'sydney' | 'maybe'
type State = Record<ColumnId, Item[]>

export const ITEM_DRAG_TYPE = 'ARTICLE_ITEM'

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

function findItem(state: State, id: string): { columnId: ColumnId; index: number; item: Item } | null {
  for (const columnId of Object.keys(state) as ColumnId[]) {
    const index = state[columnId].findIndex((x) => x.id === id)
    if (index !== -1) return { columnId, index, item: state[columnId][index] }
  }
  return null
}

function Row(props: { id: ColumnId; title: string; items: Item[]; colorNumber: number }) {
  const { id: groupId, title, items, colorNumber } = props
  const [dragging, s_dragging] = useState(false)
  useEffect(() => {
    const el = document.getElementById(`${groupId}`)
    if (!el) return

    return dropTargetForElements({
      element: el,
      getData: () => ({ type: 'SECTION', columnId: groupId, groupId }),

      onDragEnter() {
        s_dragging(true)
      },
      onDragLeave() {
        s_dragging(false)
      },
      onDrag() {
        document.body.style.cursor = 'grabbing'
      },
      onDrop() {
        document.body.style.cursor = 'default'
        s_dragging(false)
      },
    })
  }, [groupId])
  const formatDate = (startDate) => startDate && format(new Date(startDate), 'MM-dd')
  let isPrevDate = false
  return (
    <>
      <Group id={`${groupId}`} title={title} count={items.length} colorNumber={colorNumber} dragging={dragging}>
        {items.map(
          (item, index, arr) => (
            (isPrevDate = formatDate(item.startDate) === formatDate(arr[index - 1]?.startDate)),
            (
              <div key={item.id}>
                {isPrevDate ? <DayNull /> : <Day> {format(new Date(item.startDate), 'EEEE d MMMM')}</Day>}
                {/* @ts-ignore */}
                <GigCard groupId={groupId} index={index} isPrevDate={isPrevDate} {...item} />
              </div>
            )
          )
        )}
      </Group>
    </>
  )
}

function setToLocalstorage(state) {
  const stripGigFields = (gig) => {}

  localStorage.setItem(
    'gigs',
    JSON.stringify({
      going: { name: 'Going', data: state.going },
      maybe: { name: 'Maybe', data: state.maybe },
      sydney: { name: 'Sydney', data: state.sydney },
    })
  )
}
let newDrops =
  ({ toColumnId, id }) =>
  (prev) => {
    const current = findItem(prev, id)
    if (!current) return prev

    console.log(current)

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
    setToLocalstorage({
      ...prev,
      [fromColumnId]: fromListWithout,
      [toColumnId]: nextToList,
    })

    return {
      ...prev,
      [fromColumnId]: fromListWithout,
      [toColumnId]: nextToList,
    }
  }

export default function TwoSectionDnD({ gigs }) {
  let { gigs: stored_gigs } = useContext(GroupCTX)
  const [consideringDropId, setConsideringDropId] = useState('')

  const gigData = extractData(gigs)

  const [state, setState] = useState<State>(gigData)
  useEffect(() => {
    setState(extractData(stored_gigs))
  }, [stored_gigs])

  function setUsersGroups({ toColumnId, id }) {
    setState(newDrops({ toColumnId, id }))
  }

  // Monitor handles the "drop" and updates state.
  useEffect(() => {
    return monitorForElements({
      onDrop: ({ source, location }) => {
        const id = String(source?.data?.id)

        if (!source?.data?.id || source?.data?.type !== ITEM_DRAG_TYPE) return

        const targets = location.current.dropTargets,
          ÆØN = targets.find((t) => (t.data as any)?.type === 'SECTION'),
          toColumnId = ÆØN?.data?.columnId as ColumnId

        // console.log('ON DROP', { id, toColumnId })
        if (!toColumnId) return

        setUsersGroups({ toColumnId, id })
      },
    })
    // Important: state is used inside onDrop to find the source item.
    // If you prefer not to depend on `state`, resolve source data from `source.data` only.
  }, [state])

  return (
    //@ts-ignore
    <onDropCTX.Provider value={{ setUsersGroups, consideringDropId, setConsideringDropId }}>
      <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
        {/* {state.sydney[0] && <DragableCard isPrevDate={false} item={state.sydney[0]} columnId={'going'} index={0} />} */}
        <Row id="going" title="Going" items={state.going} colorNumber={7} />
        <Row id="maybe" title="Maybe" items={state.maybe} colorNumber={2} />
        <Row id="sydney" title="Sydney" items={state.sydney} colorNumber={6} />
      </div>
    </onDropCTX.Provider>
  )
}
export const onDropCTX = createContext({
  consideringDropId: '',
  setConsideringDropId: () => void {},
  setUsersGroups: ({ toColumnId, id }) => {
    console.log('ctx not set up', { toColumnId, id })
  },
})

function extractData(gigs) {
  let entries = Object.entries(gigs),
    result = {
      going: [],
      maybe: [],
      sydney: [],
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
