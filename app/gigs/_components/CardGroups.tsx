"use client";
import { createContext, useContext, useEffect, useState } from "react";
import * as S from "./groups.style";

export const Group = ({
  id,
  title,
  colorNumber = 6,
  count = 5,
  dragging = false,
  children,
}) => {
  const { expanded, setExpanded } = useContext(GroupCTX),
    open = expanded === id;

  return (
    <S.Section id={id} $open={open}>
      <S.Link onClick={() => setExpanded(id)}>
        <S.Group
          $colorNumber={colorNumber}
          $count={count}
          className={(dragging && "drag-hover") || ""}
        >
          <S.Count className="cards__expander-count">{count}</S.Count>
          <S.Title className="cards__expander-title">
            {title + String()}
          </S.Title>
        </S.Group>
      </S.Link>
      {open && <S.Content>{children}</S.Content>}
    </S.Section>
  );
};

export const GroupCTX = createContext({
  expanded: "Going",
  gigs: {
    going: { name: "Going", data: [] },
    maybe: { name: "Maybe", data: [] },
    sydney: { name: "Sydney", data: [] },
  },
  setExpanded: (_: string) => {},
});

export const GroupS_CTX = ({
  events,
  initialExpanded = "sydney",
  children,
}) => {
  const [expanded, s_open] = useState(initialExpanded);
  const [gigs, s_gigs] = useState({});

  useEffect(() => {
    let Î = {
        going: { name: "Going", data: [] },
        maybe: { name: "Maybe", data: [] },
        sydney: { name: "Sydney", data: events.slice(0, Infinity) },
      },
      g_gs = localStorage.getItem("gigs"),
      gÍgs = g_gs ? JSON.parse(g_gs) : Î;

    s_gigs(gÍgs);
  }, [events]);
  return (
    <GroupCTX.Provider
      value={{
        //@ts-ignore
        gigs,
        expanded,
        setExpanded: (goupId) => {
          s_open(goupId);
        },
      }}
    >
      <section>{children}</section>
    </GroupCTX.Provider>
  );
};
