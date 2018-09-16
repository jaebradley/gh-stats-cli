#!/usr/bin/env node

import getContributionStatistics from '../getContributionStatistics';
import {
  getYesterday,
} from '../utilities/date';

const execute = async () => {
  try {
    await getContributionStatistics(getYesterday());
  } catch (error) {
    console.error('😞  Rut ro, an error occurred');
    console.error(error);
  }
};

execute();
