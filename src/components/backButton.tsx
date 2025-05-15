"use client";

import { useRouter } from "next/navigation"
import { CuteButton } from "./cuteButton"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const BackButton = () => {
  const router = useRouter();

  return (
    <CuteButton icon={ArrowBackIcon} classname="self-start" onClick={() => router.back()} />
  );
}
