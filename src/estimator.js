const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  const beds = (0.35 * data.totalHospitalBeds);
  const income = data.region.avgDailyIncomeInUSD;
  const population = data.region.avgDailyIncomePopulation;
  // Normalize timeToElapse to days
  let days;
  if (data.periodType === 'days') {
    days = data.timeToElapse;
  } else if (data.periodType === 'weeks') {
    days = 7 * data.timeToElapse;
  } else if (data.periodType === 'months') {
    days = 30 * data.timeToElapse;
  }
  const factor = Math.trunc(days / 3);
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** factor);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** factor);
  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;

  const severecases = severeImpact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = Math.trunc(beds - impact.severeCasesByRequestedTime).toFixed(0);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(beds - severecases).toFixed(0);

  impact.casesForICUByRequestedTime = 0.05 * impact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = 0.05 * severeImpact.infectionsByRequestedTime;

  impact.casesForVentilatorsByRequestedTime = 0.02 * impact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = 0.02 * impact.infectionsByRequestedTime;

  const severeInfectionsByRequestedTime = severeImpact.infectionsByRequestedTime;
  impact.dollarsInFlight = impact.infectionsByRequestedTime * income * population * days;
  severeImpact.dollarsInFlight = severeInfectionsByRequestedTime * income * population * days;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
