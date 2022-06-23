import React, { useEffect } from "react";

import { UseAppContext } from "../../context/appContext";
import { StatsContainer, ChartsContainer, Loading } from "../../components";


const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = UseAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if(isLoading) return <Loading center />

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
