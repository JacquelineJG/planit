import React from "react";

import Favourites from "./Favourites";

export default function FavouritesResult (props) {
  const { favourites } = props;
  console.log("fav results:", props)

  return favourites.map(favourite => {
    return <Favourites key={favourite.activity_id} {...favourite} />;
  });
}