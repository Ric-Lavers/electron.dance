import { format } from "date-fns";
import * as S from "./gig-card.styles";
import GigPreview from "./SpotifyNowPlaying/GigPreview";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

import { useContext, useEffect, useRef } from "react";
import { ITEM_DRAG_TYPE, onDropCTX } from "./DemoDnD";
import { Marquee } from "./SpotifyNowPlaying/now-playing.styles";

export const GigCard = ({
  groupId,
  index,
  id,
  title,
  artists,
  organiser,
  location,
  startDate,
  url,
  image,
}) => {
  startDate = new Date(startDate);

  const { setUsersGroups } = useContext(onDropCTX);
  function setPosition({ id, groupId }) {
    setUsersGroups({ id, toColumnId: groupId });
  }

  useEffect(() => {
    const el = document.getElementById(id);

    if (!el) return;
    const dragHandle = el.querySelector(".now-playing");
    if (!dragHandle) return;

    return draggable({
      element: el,
      dragHandle,
      getInitialData: () => ({
        type: ITEM_DRAG_TYPE,
        id: id,
        fromColumnId: groupId,
        fromIndex: index,
      }),
    });
  }, [id, groupId, index]);
  let defaultRange = 50;
  const locationRef = useRef(null);
  return (
    <>
      <S.Item>
        <S.Card>
          {/* <S.Title>{title}</S.Title> */}
          {/*  */}
          {/* <S.Support>{[artists.join(', '), last].filter(Boolean).join(' & ')}</S.Support> */}
          <S.Row>
            <S.Time dateTime={format(startDate, "yyyy-MM-ddTHH:MM")}>
              {format(startDate, "h:mma").toLowerCase()}
            </S.Time>{" "}
            <S.Location href={url} target="_blank" title={location}>
              <S.Marquee
                $width={locationRef.current?.scrollWidth || 150}
                ref={locationRef}
              >
                {location}
              </S.Marquee>
            </S.Location>
          </S.Row>
          <S.Row></S.Row>

          <div id={id} style={{ borderRadius: "8px", overflow: "hidden" }}>
            {/* @ts-ignore */}
            <GigPreview
              {...{
                isActive: true,
                isPlaying: true,
                item: {
                  uri: "test",
                  name: title,
                  artists: artists.map((name) => ({ name })),
                  album: { images: [{ url: image }] },
                },

                url,
              }}
            />
          </div>

          {organiser !== location ? (
            <S.Organiser
              style={{ visibility: organiser ? "visible" : "hidden" }}
            >
              <i>presented by </i>
              {organiser}
            </S.Organiser>
          ) : (
            <div style={{ height: 14 }} />
          )}

          <S.RangeWrap groupId={groupId}>
            <span className="label left">
              {otherGroupSwitch(groupId)[0].name}{" "}
            </span>
            {
              ((defaultRange = groupId === "going" ? 0 : 50),
              (
                <input
                  type="range"
                  min="0"
                  max="100"
                  step={2}
                  defaultValue={defaultRange}
                  className={groupId === "going" ? "shronk" : ""}
                  onAnimationEnd={(e) => {
                    let value = Number(e.currentTarget.value),
                      [{ id: leftId }, { id: rightId }] =
                        otherGroupSwitch(groupId),
                      targetGroupId =
                        value < 15 ? leftId : value > 80 ? rightId : "";

                    targetGroupId &&
                      setPosition({ id, groupId: targetGroupId });
                  }}
                  onChange={(e) => {
                    let value = e.currentTarget.value;
                    e.currentTarget.style.setProperty("--value", `${value}%`);

                    if (Number(value) < 15) {
                      e.currentTarget.value = "0";
                    }
                    if (Number(value) > 80) {
                      e.currentTarget.value = "100";
                    }
                  }}
                  onPointerUp={(e) => {
                    let value = e.currentTarget.value;

                    if (Number(value) < 15) {
                      e.currentTarget.className = "shrink";
                    }
                    if (Number(value) > 80) {
                      e.currentTarget.className = "";
                      setPosition({
                        id,
                        groupId: otherGroupSwitch(groupId)[1].id,
                      });
                    }
                  }}
                  style={{
                    //@ts-ignore
                    "--value": String(defaultRange) + "%",
                  }}
                />
              ))
            }

            <span className="label right">
              {otherGroupSwitch(groupId)[1].name}{" "}
            </span>
          </S.RangeWrap>
        </S.Card>
      </S.Item>
    </>
  );
};

function otherGroupSwitch(groupId) {
  switch (groupId) {
    case "maybe":
      return [
        { name: "Going", id: "going" },
        { name: " ", id: "sydney" },
      ];
    case "going":
      return [
        { name: "Going", id: "going" },
        { name: "Maybe", id: "maybe" },
      ];
    case "sydney":
    default:
      return [
        { name: "Going", id: "going" },
        { name: "Maybe", id: "maybe" },
      ];
  }
}
