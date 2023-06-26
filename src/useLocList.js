import { useState, useEffect } from "react";

const localCache = {};

export default function useLocList(animale) {
  const [locList, setLocList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animale) {
      setLocList([]);
    } else if (localCache[animale]) {
      setLocList(localCache[animale]);
    } else {
      requestLocList();
    }

    async function requestLocList() {
      setLocList([]);
      setStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${animale}`
      );
      const json = await res.json();
      const ayya = [];
      json.pets.map((pet) => {
        ayya.push(pet.city + ", " + pet.state);
      });
      localCache[animale] = ayya || [];
      setLocList(localCache[animale]);
      setStatus("loaded");
    }
  }, [animale]);

  return [locList, status];
}
