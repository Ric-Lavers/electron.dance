import { AddEvent } from "./_components/AddEvent"
import { Group } from "./_components/CardGroups"
import { EventsHeader } from "./_components/Header"

export default function Loading() {
  const state = { maybe: [], others: [], going: [] }
  return (
    <>
      <EventsHeader />
      <AddEvent />
      <div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
        <Group id="going" title="Going" count={0} items={[]} gigs={[]} colorNumber={5} double={false} dragging />
        <Group id="maybe" title="Maybe" count={0} items={[]} gigs={[]} colorNumber={3} double={false} dragging />
        <Group id="sydney" title="Sydney" count={0} items={[]} gigs={[]} colorNumber={6} double={false} dragging />
      </div>
    </>
  )
}
