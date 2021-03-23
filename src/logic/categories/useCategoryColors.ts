/**
 * @flow
 * Created by Dima Portenko on 04.11.2020
 */
import React, { useState, useEffect } from 'react';
import { getCategoryColors } from '../../theme/colors';

type Props = {||};

type Result = {|
  getCategoryColorByIndex(index: number): string,
|};

export const useCategoryColors = (): Result => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setColors(getCategoryColors());
  }, []);

  const getCategoryColorByIndex = (index: number): string => {
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  };

  return {
    getCategoryColorByIndex,
  };
};
