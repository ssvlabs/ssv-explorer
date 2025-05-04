import type { ComponentPropsWithRef, FC } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Text } from "@/components/ui/text"

export type ErrorCardProps = {
  errorMessage: string
  title: string
}

type ErrorCardFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof ErrorCardProps> & ErrorCardProps
>

export const ErrorCard: ErrorCardFC = ({
  className,
  errorMessage,
  title = "Error Loading Data",
  ...props
}) => {
  return (
    <Card
      className={cn(
        "flex-col items-center justify-center text-center",
        className
      )}
      {...props}
    >
      <Image src="/images/robot.svg" alt={title} width={80} height={80} />
      <div className="flex flex-col gap-1">
        <Text variant="headline4">{title}</Text>
        <Text variant="body-3-medium" className="text-red-500">
          {errorMessage}
        </Text>
      </div>
    </Card>
  )
}

ErrorCard.displayName = "ErrorCard"
