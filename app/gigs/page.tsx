import { startOfToday } from "date-fns";
import { cookies } from "next/headers";

import { AddEvent } from "./_components/AddEvent";
import { GroupS_CTX } from "./_components/CardGroups";
import { EventsHeader } from "./_components/Header";
import TwoSectionDnD from "./_components/DemoDnD";
import { getGigs } from "../api/gig/route";
import { getActiveUser } from "../api/_lib/actions/user";
import { redirect } from "next/navigation";
import { makeUserGigs } from "./_utils/localStorage";

const Events = async ({ searchParams }) => {
  const Å = (await searchParams).a,
    attempts = Number(Å),
    jar = await cookies(),
    userId = jar.get('userId')?.value,
    events = await getGigs(userId, startOfToday())

  const gigUser = await getActiveUser(userId)

  if (attempts >= 3) {
    throw Error()
  }
  if (!gigUser) {
    redirect('/api/user?a=' + (attempts || 0))
  }

  const gigs = makeUserGigs(events, gigUser.gigs)

  return (
    <>
      <EventsHeader />
      <AddEvent />

      <GroupS_CTX gigs={gigs}>
        <TwoSectionDnD gigs={gigs} />
      </GroupS_CTX>
    </>
  )
};
export default Events;
