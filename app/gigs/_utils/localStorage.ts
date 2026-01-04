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
  allAttendance: {
    userId: any
    eventId: any
    gigId: any
    status: any
    community: any
  }[],
  gigUser
) {
  const userObjectId = gigUser._id,
    otherAttendance = allAttendance.filter(({ userId }) => userId !== userObjectId),
    result = events.reduce(
      (a, gig) => {
        let attendedByUser = userActivity.find(({ eventId }) => gig._id === eventId),
          attendedByOthers = otherAttendance.find(({ eventId }) => gig._id === eventId)

        let group = "sydney"
        if (attendedByUser) {
          group = attendedByUser.groupId
        } else if (attendedByOthers) {
          group = "others"
        }

        a[group].data.push(gig)

        return a
      },
      {
        going: { name: "Going", data: [] },
        maybe: { name: "Maybe", data: [] },
        sydney: { name: "Sydney", data: [] },
        others: { name: "Others", data: [] },
      }
    )

  return result
}
