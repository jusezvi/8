

import { useNavigate } from "react-router-dom";
function CheckAuth(e) {
  console.log('test')
  const navigate = useNavigate();


  if (e === false || e === null) {
    navigate("/login");
    return;
  } return
}

export default CheckAuth;