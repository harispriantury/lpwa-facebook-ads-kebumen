import { useEffect } from "preact/hooks";

import { useNavigate, useSearchParams } from "react-router-dom";

export const Home = () => {
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
    <div class={"w-full flex justify-center items-center h-screen"}>
      <h1>Danish Official Store</h1>
    </div>
  );
};
