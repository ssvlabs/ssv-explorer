export const getPerformances = (performance: any, labels: any = null): any => {
  const performances: any[] = [];
  if (!performance) {
    return performances;
  }
  const performanceKeys = Object.keys(performance);
  for (let i = 0; i < performanceKeys.length; i += 1) {
    const performanceKey = performanceKeys[i];
    const performanceLabel = labels && labels[performanceKey] ? labels[performanceKey] : performanceKey;
    const performanceValue = performance[performanceKey];
    performances.push({
      key: performanceKey,
      label: performanceLabel,
      value: performanceValue,
    });
  }
  return performances;
};
