#!/usr/bin/env node

import getWeeklyContributionStats from '../getWeeklyContributionStats';

const execute = async () => {
  try {
    await getWeeklyContributionStats();
  } catch (error) {
    console.error('😞  Rut ro, an error occurred');
    console.error(error);
  }
};

execute();
