// import { updateUserGigs } from "@/app/api/_lib/actions/user";

export async function saveUserGigs(state) {
  localStorage.setItem('gigs', JSON.stringify([...mapIds(state.going, 'going'), ...mapIds(state.maybe, 'maybe')]))

  // await updateUserGigs([...mapIds(state.going, 'going'), ...mapIds(state.maybe, 'maybe')]).catch((err) =>
  //   console.log('updateUserGigs ERROR', err)
  // )
}

// export function getGigsFromLocalStorage(events) {
//   if (localStorage.getItem("gigs")?.includes("startDate")) {
//     localStorage.clear();
//   }
//   const us______vity = localStorage.getItem("gigs") || "[]",
//     userActivity = JSON.parse(us______vity),
//     gÍgs = makeUserGigs(events, userActivity);

//   return gÍgs;
// }
export type UserActivity = {
  _id: string
  groupId: 'going' | 'maybe' | 'sydney'
}
function mapIds(events: UserActivity[], groupId) {
  return events.map((evt) => ({ _id: evt._id, groupId }))
}

export function makeUserGigs(events, userActivity: { eventId: string; groupId: string }[]) {
  return events.reduce(
    (a, gig) => {
      const group = userActivity.find(({ eventId }) => gig._id === eventId)?.groupId || 'sydney'

      a[group].data.push(gig)
      return a
    },
    {
      going: { name: 'Going', data: [] },
      maybe: { name: 'Maybe', data: [] },
      sydney: { name: 'Sydney', data: [] },
    }
  )
}
