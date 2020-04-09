const impact = {
  currentlyInfected: 0,
  infectionsByRequestedTime: 0,
  infectedPeoplePerDay: 0,
  infectedPeopleOver30Days: 0
};
const severeImpact = {
  currentlyInfected: 0,
  infectionsByRequestedTime: 0,
  infectedPeoplePerDay: 0,
  infectedPeopleOver30Days: 0
};
const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};


const covid19ImpactEstimator = (data) => {
  const input = data;
  impact.currentlyInfected = input.reportedCases * 10;
  severeImpact.currentlyInfected = input.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 512;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 512;
  impact.infectedPeoplePerDay = Math.round(impact.infectionsByRequestedTime / 28);
  impact.infectedPeopleOver1Week = impact.infectedPeoplePerDay * 7;
  impact.infectedPeopleOver30Days = impact.infectedPeoplePerDay * 30;
  severeImpact.infectedPeoplePerDay = Math.round(severeImpact.infectionsByRequestedTime / 28);
  severeImpact.infectedPeopleOver1Week = severeImpact.infectedPeoplePerDay * 7;
  severeImpact.infectedPeopleOver30Days = severeImpact.infectedPeoplePerDay * 30;
  return {
    data: input,
    impact: {
      currentlyInfected: impact.currentlyInfected,
      infectionsByRequestedTime: impact.infectionsByRequestedTime,
      impactPerDay: impact.infectedPeoplePerDay,
      impactOver1Week: impact.infectedPeopleOver1Week,
      impactOver1Month: impact.infectedPeopleOver30Days
    },
    severeImpact: {
      currentlyInfected: severeImpact.currentlyInfected,
      infectionsByRequestedTime: severeImpact.infectionsByRequestedTime,
      severeImpactPerDay: severeImpact.infectedPeoplePerDay,
      severeImpactOver1Week: severeImpact.infectedPeopleOver1Week,
      severeImpactOver1Month: severeImpact.infectedPeopleOver30Days
    }
  };
};


covid19ImpactEstimator(data);
export default covid19ImpactEstimator;
