import { format } from "date-fns";
import * as S from "./gig-card.styles";
import GigPreview from "./SpotifyNowPlaying/GigPreview";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

import { useContext, useEffect, useRef } from "react";
import { ITEM_DRAG_TYPE, onDropCTX } from "./DemoDnD";
import { GroupCTX } from "./CardGroups"

export const GigCard = ({ groupId, index, id, title, artists, organiser, location, startDate, url, image }) => {
  startDate = new Date(startDate)

  const { setConsideringDropId, setUsersGroups } = useContext(onDropCTX)

  function setPosition({ id, groupId }) {
    setUsersGroups({ id, groupId })
  }
  const locationRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = document.getElementById(id)

    if (!el) return

    return draggable({
      element: el,
      getInitialData: () => ({
        type: ITEM_DRAG_TYPE,
        id,
        fromColumnId: groupId,
        fromIndex: index,
      }),
    })
  }, [id, groupId, index])

  return (
    <>
      <S.Item>
        <S.Card>
          <S.Row>
            <S.Time dateTime={format(startDate, "yyyy-MM-ddTHH:MM")}>{format(startDate, "h:mma").toLowerCase()}</S.Time>{" "}
            <S.Location>
              <S.Marquee
                href={url}
                target="_blank"
                title={location}
                ref={locationRef}
                $width={locationRef.current?.scrollWidth || 150}
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
                  artists: artists.map((name) => ({ name })).slice(0, 12),
                  album: { images: [{ url: image }] },
                },

                url,
              }}
            />
          </div>

          {organiser !== location ? (
            <S.Organiser style={{ visibility: organiser ? "visible" : "hidden" }}>
              <i>presented by </i>
              {organiser}
            </S.Organiser>
          ) : (
            <div style={{ height: 14 }} />
          )}
          <CoolRange
            groupId={groupId}
            gigId={id}
            setPosition={setPosition}
            setConsideringDropId={setConsideringDropId}
          />
        </S.Card>
      </S.Item>
    </>
  )
}

const CoolRange = ({ groupId, gigId, setPosition, setConsideringDropId }) => {
  const { gigs } = useContext(GroupCTX)
  //@ts-ignore
  groupId = gigs.others.data.find((g) => g._id === gigId) ? "others" : groupId

  let defaultRange = groupId === "going" ? 0 : 50,
    [{ id: leftId }, { id: rightId }] = otherGroupSwitch(groupId)

  function startAnimation(e) {
    let value = Number(e.currentTarget.value),
      isShrunk = e.currentTarget.className === "shronk"

    setConsideringDropId("")
    if (value < 15 || value > 80) {
      e.currentTarget.className = "shrink"
    } else {
      e.currentTarget.className = ""
    }
  }

  if (groupId === "going") {
    defaultRange = 0
  }
  if (groupId === "others") {
    defaultRange = 100
  }

  return (
    <S.RangeWrap $groupId={groupId}>
      <span className="label left">{otherGroupSwitch(groupId)[0].name} </span>
      {
        <input
          type="range"
          min="0"
          max="100"
          step={2}
          defaultValue={defaultRange}
          className={["going", "others"].includes(groupId) ? "shronk" : ""}
          onAnimationEnd={(e) => {
            let value = Number(e.currentTarget.value),
              targetGroupId = value < 15 ? leftId : value > 80 ? rightId : ""

            targetGroupId && setPosition({ id: gigId, groupId: targetGroupId })
          }}
          onInput={(e) => {
            let value = Number(e.currentTarget.value)

            if (value < 15) {
              e.currentTarget.value = "0"
            }
            if (value > 80) {
              e.currentTarget.value = "100"
            }
            if (value < 45) {
              setConsideringDropId(leftId)
            } else if (value > 55) {
              setConsideringDropId(rightId)
            } else {
              setConsideringDropId("")
            }
            e.currentTarget.style.setProperty("--value", `${value}%`)
          }}
          onClick={startAnimation}
          onPointerDown={(e) => {
            e.stopPropagation()
          }}
          onPointerUp={startAnimation}
          style={{
            //@ts-ignore
            "--value": String(defaultRange) + "%",
          }}
        />
      }

      <span className="label right">{otherGroupSwitch(groupId)[1].name} </span>
    </S.RangeWrap>
  )
}

export function otherGroupSwitch(groupId) {
  switch (groupId) {
    case "maybe":
      return [
        { name: "Going", id: "going" },
        { name: " ", id: "sydney" },
      ]
    case "others":
      return [
        { name: "Going", id: "going" },
        { name: "Others", id: "others" },
      ]
    case "going":
      return [
        { name: "Going", id: "going" },
        { name: "Maybe", id: "maybe" },
      ]
    case "sydney":
    default:
      return [
        { name: "Going", id: "going" },
        { name: "Maybe", id: "maybe" },
      ]
  }
}
