import React from "react"

const Status = ({
  isSuccess,
  isLeader,
  isNeutral,
}: {
  isSuccess?: boolean
  isLeader?: boolean
  isNeutral?: boolean
}) => {
  return (
    <svg className="shrink-0" width="18.56" height="16" viewBox="0 0 18.56 16">
      <polygon
        points="9.28,0 17.3,4 17.3,12 9.28,16 1.26,12 1.26,4"
        className={
          isNeutral
            ? "fill-gray-300 stroke-gray-500"
            : isSuccess
              ? "fill-success-300 stroke-success-700"
              : "fill-error-200 stroke-error-500"
        }
        strokeWidth="1"
      />
      {isLeader && (
        <image
          href="/images/crown/crown.svg"
          x="4.5"
          y="4"
          width="9.5"
          height="8"
        />
      )}
    </svg>
  )
}

export default Status
