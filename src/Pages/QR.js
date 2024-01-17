import React, { useEffect } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { useNavigate, useParams } from "react-router";

function QR() {
  const navigator = useNavigate();
  const { id } = useParams();
  const { setQR } = useSupabase();
  useEffect(() => {
    setQR(true);
    navigator(`/single/${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}

export default QR;
