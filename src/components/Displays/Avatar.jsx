import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const AvatarDisplay = ({ src, alt }) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  );
};
