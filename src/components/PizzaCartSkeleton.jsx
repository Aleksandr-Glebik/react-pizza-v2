import React from "react"
import ContentLoader from "react-content-loader"

const PizzaCartSkeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={459}
    viewBox="0 0 280 459"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="125" r="125" />
    <rect x="1" y="272" rx="4" ry="4" width="270" height="24" />
    <rect x="2" y="312" rx="6" ry="6" width="270" height="85" />
    <rect x="8" y="411" rx="0" ry="0" width="89" height="27" />
    <rect x="121" y="407" rx="15" ry="15" width="155" height="40" />
  </ContentLoader>
)

export default PizzaCartSkeleton