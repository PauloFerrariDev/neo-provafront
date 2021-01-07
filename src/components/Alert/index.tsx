import React, { useState, useEffect } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { getPokemonAbility } from "src/services";

import Loading from "src/components/Loading";

import { AlertProps } from "./types";

const Alert: React.FC<AlertProps> = ({ role, text, abilityURL, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [abilityShortEffect, setAbilityShortEffect] = useState<string>("");

  useEffect(() => {
    if (abilityURL) {
      setLoading(true);
      getAbilityData(abilityURL);
    }
  }, [abilityURL]);

  const getAbilityData = async (URL: string) => {
    const abilityData = await getPokemonAbility(URL);
    if (abilityData.flavor_text_entries.length) {
      setAbilityShortEffect(abilityData.flavor_text_entries[0].flavor_text);
    }
    setLoading(false);
  };

  return loading ? (
    <Loading />
  ) : onClose ? (
    <div className={`alert-${role}`}>
      <div>
        <RiCloseCircleFill onClick={onClose} className="close-icon" />
      </div>
      <div className="short-effect">
        {text && text.toLocaleUpperCase()}
        <br />
        {abilityShortEffect}
      </div>
    </div>
  ) : (
    <div className={`alert-${role}`}>{text}</div>
  );
};

export default Alert;
