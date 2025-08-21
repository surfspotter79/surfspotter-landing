import React from "react";
import { useNavigate } from "react-router-dom";

type PhotoCardProps = {
  id: string | number;
  title: string;
  imageUrl: string;
};

export default function PhotoCard({ id, title, imageUrl }: PhotoCardProps) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/photo/${id}`)} style={{ cursor: "pointer" }}>
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
    </div>
  );
}
