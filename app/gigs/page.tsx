import { startOfToday } from "date-fns"
import { cookies } from "next/headers"

import { AddEvent } from "./_components/AddEvent"
import { GroupS_CTX } from "./_components/CardGroups"
import { EventsHeader } from "./_components/Header"
import TwoSectionDnD from "./_components/DemoDnD"

import { getAllAttendance, getActiveUser, getGigs, getOthersAttendanceSummary } from "../api/_lib/actions/user"
import { redirect } from "next/navigation"
import { makeUserGigs } from "./_utils/localStorage"

const Events = async ({ searchParams }) => {
  const Å = (await searchParams).a,
    attempts = Number(Å),
    jar = await cookies(),
    userId = jar.get("userId")?.value,
    [events, gigUser, allAttendance, attendanceSummary] = await Promise.all([
      getGigs(userId, startOfToday()),
      getActiveUser(userId),
      getAllAttendance(),
      getOthersAttendanceSummary(startOfToday()),
    ])

  if (attempts >= 3) {
    throw Error()
  }
  if (!gigUser) {
    redirect("/api/user?a=" + (attempts || 0))
  }

  const gigs = makeUserGigs(events, gigUser.gigs, allAttendance, gigUser)

  return (
    <>
      <EventsHeader />
      <AddEvent />

      <GroupS_CTX gigs={gigs} attendanceSummary={attendanceSummary}>
        <TwoSectionDnD gigs={gigs} />
      </GroupS_CTX>
      {/* <pre>{JSON.stringify(gigs, null, 2)}</pre> */}
    </>
  )
}
export default Events
