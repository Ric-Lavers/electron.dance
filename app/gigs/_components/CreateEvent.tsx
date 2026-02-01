"use client"
import { useState } from "react"
import * as S from "./add-event.style"
import { EventDoc } from "@/db/mongo/models/event"
import axios from "axios"
import { format } from "date-fns"

export const CreateEvent = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<EventDoc>>({
    url: "",
    title: "",
    artists: [],
    description: "",
    organiser: "",
    image: "",
    startDate: undefined,
    endDate: undefined,
    location: "",
    price: undefined,
  })

  const [artistInput, setArtistInput] = useState("")
  const [customLocation, setCustomLocation] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === "location") {
      //@ts-ignore
      setFormData((prev) => ({ ...prev, location: value }))
      if (value === "") {
        setCustomLocation("")
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price" ? (value ? parseFloat(value) : undefined) : value,
      }))
    }
  }

  const handleAddArtist = () => {
    if (artistInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        artists: [...(prev.artists || []), artistInput.trim()],
      }))
      setArtistInput("")
    }
  }

  const handleRemoveArtist = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      artists: prev.artists?.filter((_, i) => i !== index) || [],
    }))
  }

  const [isManual, s_isManual] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isManual) {
      onSubmit(formData)
    } else {
      const { data } = await axios.get("/api/scrape/gig-url", { params: { url: formData.url } })

      setFormData(data)
      s_isManual(true)
    }
  }
  function handleIsManual() {
    s_isManual((p) => !p)
  }

  return (
    <S.CreateForm onSubmit={handleSubmit}>
      <div>
        <label htmlFor="is-manual">Use Event url</label>
        <input id="is-manual" name="is-manual" type="checkbox" onChange={handleIsManual} checked={!isManual} />
      </div>
      <S.FormGroup>
        <label htmlFor="url">Event URL *</label>
        <input
          id="url"
          name="url"
          type="url"
          value={formData?.url || ""}
          onChange={handleChange}
          required
          placeholder="https://example.com/event"
        />
      </S.FormGroup>
      {!isManual && <S.SubmitButton type="submit">Read Event</S.SubmitButton>}
      {isManual && (
        <>
          <S.FormGroup>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title || ""}
              onChange={handleChange}
              placeholder="Event title"
            />
          </S.FormGroup>

          <S.FormGroup>
            <label>Artists</label>
            <S.ArtistInput>
              <input
                type="text"
                value={artistInput}
                onChange={(e) => setArtistInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddArtist())}
                placeholder="Add artist name"
              />
              <S.SubmitButton type="button" onClick={handleAddArtist}>
                Add
              </S.SubmitButton>
            </S.ArtistInput>
            <S.ArtistList>
              {formData.artists?.map((artist, index) => (
                <S.ArtistTag key={index}>
                  {artist}
                  <button type="button" onClick={() => handleRemoveArtist(index)}>
                    ×
                  </button>
                </S.ArtistTag>
              ))}
            </S.ArtistList>
          </S.FormGroup>

          <S.FormGroup>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Event description"
              rows={4}
            />
          </S.FormGroup>

          <S.FormGroup>
            <label htmlFor="organiser">Organiser</label>
            <input
              id="organiser"
              name="organiser"
              type="text"
              value={formData.organiser || ""}
              onChange={handleChange}
              placeholder="Organiser name"
            />
          </S.FormGroup>

          <S.FormGroup>
            <label htmlFor="image">Image URL</label>
            <input
              id="image"
              name="image"
              type="url"
              value={formData.image || ""}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </S.FormGroup>

          <S.FormRow>
            <S.FormGroup>
              <label htmlFor="startDate">Start Date *</label>
              <input
                required
                id="startDate"
                name="startDate"
                type="datetime-local"
                value={formData.startDate ? format(new Date(formData.startDate), "yyyy-MM-dd'T'HH:mm") : ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value ? new Date(e.target.value) : undefined,
                  }))
                }
              />
            </S.FormGroup>

            <S.FormGroup>
              <label htmlFor="endDate">End Date</label>
              <input
                id="endDate"
                name="endDate"
                type="datetime-local"
                value={formData.endDate ? format(new Date(formData.endDate), "yyyy-MM-dd'T'HH:mm") : ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    endDate: e.target.value ? new Date(e.target.value) : undefined,
                  }))
                }
              />
            </S.FormGroup>
          </S.FormRow>

          <S.FormRow>
            <S.FormGroup>
              <label htmlFor="location">Location</label>
              <select id="location" name="location" value={formData.location || ""} onChange={handleChange}>
                <option value="">Custom location</option>
                <option value="TBA">TBA</option>
                <option value="Online">Online</option>
                <option value="Secret location">Secret location</option>
              </select>
              {formData.location === "" && (
                <input
                  type="text"
                  value={customLocation}
                  onChange={(e) => {
                    setCustomLocation(e.target.value)
                    //@ts-ignore
                    setFormData((prev) => ({ ...prev, location: e.target.value }))
                  }}
                  placeholder="Enter custom location"
                />
              )}
            </S.FormGroup>

            <S.FormGroup>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price || ""}
                onChange={handleChange}
                placeholder="0.00"
              />
            </S.FormGroup>
          </S.FormRow>

          <S.SubmitButton type="submit">Add Event</S.SubmitButton>
        </>
      )}
    </S.CreateForm>
  )
}
