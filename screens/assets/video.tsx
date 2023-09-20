import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Colors } from "../constants"


function VideoIcon(props:any) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M22.5 5h-15a5 5 0 00-5 5v10a5 5 0 005 5h15a5 5 0 005-5V10a5 5 0 00-5-5z"
        stroke={Colors.PrimaryColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.75 15l-6.25-3.75v7.5L18.75 15z"
        stroke={Colors.PrimaryColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default VideoIcon