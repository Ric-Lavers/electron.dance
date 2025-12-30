export function setGigsToLocalstorage(state) {
  const stripGigFields = (gig) => {};
  console.log(
    JSON.stringify([
      ...mapIds(state.going, "going"),
      ...mapIds(state.maybe, "maybe"),
    ])
  );

  localStorage.setItem(
    "gigs",
    JSON.stringify([
      ...mapIds(state.going, "going"),
      ...mapIds(state.maybe, "maybe"),
    ])
  );
}

export function getGigsFromLocalStorage(events) {
  if (localStorage.getItem("gigs")?.includes("startDate")) {
    localStorage.clear();
  }
  const us______vity = localStorage.getItem("gigs") || "[]",
    userActivity = JSON.parse(us______vity),
    gÍgs = makeUserGigs(events, userActivity);

  return gÍgs;
}

function mapIds(events: { _id: string; uri: string }[], groupId) {
  return events.map((evt) => ({ _id: evt._id, uri: evt.uri, groupId }));
}
type UserActivity = {
  _id: string;
  uri: string;
  groupId: "going" | "maybe" | "sydney";
};

export function makeUserGigs(events, userActivity: UserActivity[]) {
  return events.reduce(
    (a, gig) => {
      const group =
        userActivity.find(({ _id }) => gig._id === _id)?.groupId || "sydney";

      a[group].data.push(gig);
      return a;
    },
    {
      going: { name: "Going", data: [] },
      maybe: { name: "Maybe", data: [] },
      sydney: { name: "Sydney", data: [] },
    }
  );
}
