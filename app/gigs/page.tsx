import axios from 'axios'
import { startOfDay, startOfToday } from "date-fns";
import { cookies, headers } from "next/headers";

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

      {/*  <pre>
          {JSON.stringify(
            gigs.sydney.data,
            // events.slice(0, 2).map((_) => [_.title, _.organiser, _.location, _.startDate, _.image]),
            null,
            2
          )}
        </pre> */}
    </>
  );
};
export default Events
