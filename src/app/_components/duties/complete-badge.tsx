import React from "react"

const CompleteBadge = ({ isSuccess }: { isSuccess: boolean }) => {
  return (
    <div
      className={`flex size-3 items-center justify-center rounded-[100%] ${isSuccess ? "bg-success-500" : "bg-error-500"}`}
    >
      <img
        src={`/images/${isSuccess ? "v" : "x"}/${isSuccess ? "light" : "white"}.svg`}
      />
    </div>
  )
}

export default CompleteBadge
