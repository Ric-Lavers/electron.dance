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

  // console.log(events[3])
  const gigs = {
    going: { name: "Going", data: [] },
    maybe: { name: "Maybe", data: [] },
    sydney: { name: "Sydney", data: events.slice(3, Infinity) },
  };

  return (
    <>
      <EventsHeader />
      <AddEvent />
      {/* <GroupSection>
        <Group id="going" title="going" count={5} colorNumber={7} />
        <Group id="maybe" title="Maybe" count={0} colorNumber={2} />
        <Group id="sydney" title="Sydney" count={events.length} colorNumber={6} />
        <Group id="past" title="Past" count={0} colorNumber={1} />
      </GroupSection> */}
      <GroupS_CTX events={events}>
        <TwoSectionDnD gigs={gigs} />
      </GroupS_CTX>
      {/* <GroupSection>
        <DraggableContainer gigs={gigs} />
      </GroupSection> */}
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
