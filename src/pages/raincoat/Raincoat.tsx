import { Button } from "primereact/button";

import { useNavigate } from "react-router-dom";

export const Raincoat = () => {
  const nav = useNavigate();
  const handleNavigate = () => {
    nav("/crystal-roman-bracelet");
  };
  return (
    <div>
      <Button
        label="Navigate"
        onClick={() => {
          handleNavigate();
        }}
      />
      <div>Landing Page untuk jas hujan</div>;
    </div>
  );
};
