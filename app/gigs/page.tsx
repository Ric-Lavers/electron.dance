import { startOfToday } from "date-fns";
import { cookies } from "next/headers";

import { AddEvent } from "./_components/AddEvent";
import { GroupS_CTX } from "./_components/CardGroups";
import { EventsHeader } from "./_components/Header";
import TwoSectionDnD from "./_components/DemoDnD";
import { getGigs } from "../api/gig/route";

const Events = async () => {
  const jar = await cookies(),
    userId = jar.get("userId")?.value,
    events = await getGigs(userId, startOfToday());

  const gigs = {
    going: { name: "Going", data: [] },
    maybe: { name: "Maybe", data: [] },
    sydney: { name: "Sydney", data: events.slice(3, Infinity) },
  };

  return (
    <>
      <EventsHeader />
      <AddEvent />

      <GroupS_CTX events={events}>
        <TwoSectionDnD gigs={gigs} />
      </GroupS_CTX>
    </>
  );
};
export default Events;
