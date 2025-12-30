"use client";
import { useState } from "react";
import * as S from "./add-event.style";
import { CreateEvent } from "./CreateEvent";
import axios from "axios";
import { startOfDay } from "date-fns";

export const AddEvent = () => {
  const [open, s_open] = useState(false);

  async function handleSubmit(formData: any) {
    await axios.post("/api/gig", formData, {
      params: { start: startOfDay(new Date()) },
    });
  }

  if (open) {
    return (
      <>
        <S.Button onClick={() => s_open(false)}>Close</S.Button>
        <CreateEvent onSubmit={handleSubmit} />
      </>
    );
  }
  return (
    <S.Form>
      <S.Button onClick={() => s_open(true)}>Add a event</S.Button>
    </S.Form>
  );
};
