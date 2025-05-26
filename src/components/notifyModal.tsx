"use client";

import { Dialog, DialogTitle, DialogContent, IconButton, Slide, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";

interface NotifyModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const NotifyModal = ({ open, onClose, children }: NotifyModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle className="flex justify-between items-center text-(--text) font-semibold">
        Notificações
        <IconButton onClick={onClose}>
          <CloseIcon sx={{ color: "var(--text)" }} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent className="flex flex-col max-h-[500px] gap-2">
        {!children &&
            <p style={{ fontSize: "0.9rem" }}>Você ainda não tem notificações novas!</p>
        }
        {children}
      </DialogContent>
    </Dialog>
  );
};
