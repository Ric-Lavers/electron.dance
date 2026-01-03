export async function saveUserGigs(state) {
  // localStorage.setItem("gigs", JSON.stringify([...mapIds(state.going, "going"), ...mapIds(state.maybe, "maybe")]))
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
// export type UserActivity = {
//   _id: string
//   groupId: "going" | "maybe" | "sydney"
// }
// function mapIds(events: UserActivity[], groupId) {
//   return events.map((evt) => ({ _id: evt._id, groupId }))
// }

export function makeUserGigs(
  events,
  userActivity: { eventId: string; groupId: string }[],
  attendanceSummary: { status: string; count: number }[]
) {
  return events.reduce(
    (a, gig) => {
      const group = userActivity.find(({ eventId }) => gig._id === eventId)?.groupId || "sydney"

      a[group].data.push(gig)
      return a
    },
    {
      going: { name: "Going", data: [] }, //, attendanceCount: 0 },
      maybe: { name: "Maybe", data: [] }, //, attendanceCount: 0 },
      sydney: { name: "Sydney", data: [] }, //, attendanceCount: 0 },
    }
  )
}
