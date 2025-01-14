import { useEffect } from "preact/hooks";
import { Button } from "primereact/button";

import { useNavigate, useSearchParams } from "react-router-dom";

export const Raincoat = () => {
  const nav = useNavigate();
  const [searchParam] = useSearchParams();

  const navigateToBracelet = () => {
    nav("/crystal-roman-bracelet");
  };

  useEffect(() => {
    const id = searchParam.get("id");

    if (id == "1") {
      navigateToBracelet();
    }
  }, []);
  return (
    <div>
      <Button label="Navigate" onClick={() => {}} />
      <div>Landing Page untuk jas hujan</div>;
    </div>
  );
};
