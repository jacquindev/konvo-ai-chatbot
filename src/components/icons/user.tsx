import * as React from "react"
import { SVGProps } from "react"

const User = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVGRepo_iconCarrier">
      <circle cx={12} cy={6} r={4} fill="currentColor" />
      <ellipse opacity={0.5} cx={12} cy={17} rx={7} ry={4} fill="currentColor" />
    </g>
  </svg>
)
export default User
