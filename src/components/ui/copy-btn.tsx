"use client"

import type { FC } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LuCheck, LuCopy } from "react-icons/lu"

import { cn } from "@/lib/utils"
import { useClipboard } from "@/hooks/use-clipboard"
import type { ButtonProps } from "@/components/ui/button"
import { IconButton } from "@/components/ui/button"

export type CopyBtnProps = {
  text: string | number | undefined
}

type FCProps = FC<Omit<ButtonProps, keyof CopyBtnProps> & CopyBtnProps>

export const CopyBtn: FCProps = ({ className, text, ...props }) => {
  const { copy, hasCopied } = useClipboard()
  return (
    <IconButton
      disabled={!text}
      variant="ghost"
      className={cn(
        "relative inline-flex size-6 overflow-hidden text-gray-500",
        className
      )}
      {...props}
      onClick={(ev) => {
        ev.stopPropagation()
        props.onClick?.(ev)
        return copy(text?.toString() ?? "")
      }}
    >
      <AnimatePresence>
        {!hasCopied ? (
          <motion.div
            key="copy"
            className="size-[55%]"
            style={{
              color: "inherit",
              position: "absolute",
              top: "50%",
              left: "50%",
              translate: "-50%, -50%",
            }}
            transition={{ duration: 0.2, type: "spring" }}
            initial={{ opacity: 0, rotate: -180, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, rotate: 0, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, rotate: 180, x: "-50%", y: "-50%" }}
          >
            <LuCopy className="size-full text-inherit" strokeWidth="2.5" />
          </motion.div>
        ) : (
          <motion.div
            key="copied"
            className="size-[55%]"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
            transition={{ duration: 0.2, type: "spring" }}
            initial={{ opacity: 0, rotate: -180, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, rotate: 0, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, rotate: 180, x: "-50%", y: "-50%" }}
          >
            <LuCheck className="size-full text-success-500" strokeWidth="2.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </IconButton>
  )
}

CopyBtn.displayName = "CopyBtn"
