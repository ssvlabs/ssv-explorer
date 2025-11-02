import React from "react"
import { MdOutlineHexagon } from "react-icons/md"

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
    <div
      className={`flex h-[16px] w-[18.56px] items-center justify-center bg-contain bg-center bg-no-repeat`}
      style={{
        backgroundImage: `url(/images/hexagon/${isSuccess ? "success" : isNeutral ? "neutral" : "failed"}.svg)`,
      }}
    >
      {isLeader && (
        <img
          className="h-[6.769px] w-[8.703px]"
          alt={"status-indicator"}
          src={`/images/crown/crown.svg`}
        />
      )}
    </div>
  )
}

export default Status
