'use client'
import styled from 'styled-components'
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const AddForm = styled.form`
  width: 100%;
  max-width: 600px;
  display: grid;
  place-items: center;
  margin-bottom: 24px;
  padding: 24px;
  border: 1px solid var(--color-selected-dark);
  box-shadow: oklch(0 0 0 / 0.05) 0px 0px 0px 1px,
    oklch(0 0 0 / 0.05) 0px 1.92px 1.92px 0px,
    oklch(0 0 0 / 0.05) 0px 3.84px 3.84px 0px;
`;
export const Button = styled.button`
  appearance: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  width: fit-content;

  border-radius: 40px;
  padding: 8px 16px;

  background-color: var(--color-link);
  color: oklch(1 0 0);
  font-size: 12px;
  line-height: 12px;
  &::before {
    content: "+ ";
  }
`;

export const CreateForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 600px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
    font-size: 14px;
  }

  input,
  textarea,
  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: #1ed760;
      box-shadow: 0 0 0 2px rgba(30, 215, 96, 0.1);
    }
  }
`

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const ArtistInput = styled.div`
  display: flex;
  gap: 8px;

  input {
    flex: 1;
  }
`

export const ArtistList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const ArtistTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #1ed760;
  color: #000;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;

  button {
    background: none;
    border: none;
    color: inherit;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;

    &:hover {
      opacity: 0.8;
    }
  }
`

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #1ed760;
  color: #000;
  border: none;
  border-radius: 24px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1ed760cc;
  }
`
