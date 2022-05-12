import { useNavigate } from "react-router-dom";

const navigateTo = useNavigate();

const goHome = () => {
  navigateTo("/");
};

export { goHome };
