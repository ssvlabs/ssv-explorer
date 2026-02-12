import { useState } from "react"
import { Prettify } from "@/types"
import { PopoverProps } from "@radix-ui/react-popover"

// Handles the open/close state for modals and popovers.
export const useDisclosure = (
  initialValue: boolean = false
): Prettify<
  Required<Omit<PopoverProps, "children" | "modal" | "defaultOpen">>
> => {
  const [open, onOpenChange] = useState(initialValue)
  return {
    open,
    onOpenChange,
  }
}
