import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import React, { ReactNode, useEffect, useState } from "react";

type props = {
  title: string;
  content?: ReactNode;
  confirm?: ReactNode;
  cancel?: ReactNode;
  open: boolean;
  setOpen: Function;
};

const Popup: React.FC<props> = (props: props) => {
  const { title, content, cancel, confirm } = props;
  return (
    <Dialog.Root
      lazyMount
      open={props.open}
      onOpenChange={(e) => props.setOpen(e.open)}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{content}</Dialog.Body>
            <Dialog.Footer>
              {cancel ? (
                cancel
              ) : (
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
              )}

              {confirm}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Popup;
