import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Colors } from "../constants"

function MusicIcon(props: any) {
    return (
        <Svg
            width={26}
            height={26}
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M5 25a4 4 0 100-8 4 4 0 000 8zM21 23.667a4 4 0 100-8 4 4 0 000 8zM9 21V10.333m0 0V5l16-4v5.333m-16 4l16-4m0 13.334V6.333"
                stroke={Colors.PrimaryColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default MusicIcon