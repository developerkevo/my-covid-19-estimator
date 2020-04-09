const covid19ImpactEstimator = ( data ) => {
    const input = data;
    return {
        data: input, // the input data you got
        impact: {}, // your best case estimation
        severeImpact: {} // your severe case estimation
    }

}
export default covid19ImpactEstimator;
