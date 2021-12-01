export const PERFORMANCE_SUPPORTED_PERIODS: any = {
  'all': {
    'label': 'All Time',
  },
  '30d': {
    'label': '30d',
  },
  '24h': {
    'label': '24h',
  },
};

export const getPerformances = (performance: any): any => {
  const performances: any[] = [];
  if (!performance) {
    return performances;
  }
  const performanceKeys = Object.keys(performance);
  for (let i = 0; i < performanceKeys.length; i += 1) {
    const performanceKey = performanceKeys[i];
    const performanceLabel = PERFORMANCE_SUPPORTED_PERIODS[performanceKey]?.label ?? performanceKey;
    const performanceValue = performance[performanceKey];
    performances.push({
      key: performanceKey,
      label: performanceLabel,
      value: performanceValue,
    });
  }
  return performances;
};
