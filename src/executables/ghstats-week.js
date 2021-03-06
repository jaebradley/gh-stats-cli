#!/usr/bin/env node

import getContributionStatistics from '../getContributionStatistics';
import {
  getWeekAgo,
} from '../utilities/date';

const execute = async () => {
  try {
    await getContributionStatistics(getWeekAgo());
  } catch (error) {
    console.error('😞  Rut ro, an error occurred');
    console.error(error);
  }
};

execute();
