import React from "react";
import { useDispatch } from "react-redux";

import { UploadButtonProps } from "./types";

import { changePokemonImage } from "src/store/modules/pokemon/actions";
import { changePokemonImageFromPokedex } from "src/store/modules/pokedex/actions";

const UploadButton: React.FC<UploadButtonProps> = ({ id, text }) => {
  const dispatch = useDispatch();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const src = URL.createObjectURL(event.target.files[0]);

      dispatch(changePokemonImage(id, src));
      dispatch(changePokemonImageFromPokedex(id, src));
    }
  };

  return (
    <div className="upload-button">
      <label htmlFor="file-input">{text}</label>
      <input
        type="file"
        id="file-input"
        accept="image/*"
        onChange={handleOnChange}
      />
    </div>
  );
};

export default UploadButton;
