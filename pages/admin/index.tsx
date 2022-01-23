import Head from "next/head";
import React, { useRef } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import ContentWrapper from "../../components/ContentWrapper";
import { Chart } from "react-google-charts";

const index = () => {
  return (
    <ContentWrapper>
      <Head>
        <title>Admin - Abu Raihan</title>
      </Head>
      <AdminHeader />
      <div className="w-full">
        <h2>Site status here</h2>
        <div>
          <Chart
            chartType="AreaChart"
            data={[
              ["Age", "www"],
              [0, 0],
              [2, 4],
              [8, 8],
              [11, 11],
              [12, 12],
              [14, 15],
            ]}
            options={
              // Chart options
              {
                title: "Site trafics",
                legend: "none",
              }
            }
            width={"100%"}
            height={"400px"}
            legendToggle
          />
        </div>
        <div>
          <h2 className="font-medium text-black text-xl">Total contents:</h2>
          <p>100,000</p>
        </div>
        <div>
          <h2 className="font-medium text-black text-xl">Blog posts:</h2>
          <p>100,000</p>
        </div>
        <div>
          <h2 className="font-medium text-black text-xl">Projects:</h2>
          <p>100,000</p>
        </div>
        <div>
          <h2 className="font-medium text-black text-xl">Latest contents:</h2>
          <div>a content</div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default index;
