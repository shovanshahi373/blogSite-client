import React from "react";
import { CardSkeletonStyle } from "../Styles/cardSkeletonStyle";

/**
 * entities = [
 *   {
 *     type:'line',
 *     height: '',
 *     width: '',
 *   }
 * ]
 */

const CardSkeleton = ({ number = 10 }) => {
  return Array(number)
    .fill(0)
    .map((sp) => {
      return <CardSkeletonStyle />;
    });
};

export default CardSkeleton;
