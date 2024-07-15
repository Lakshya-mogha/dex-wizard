import React from "react";
import Chart from "../../../components/chart/Chart";

function page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log(id);
  console.log(params);
  

  const Coin = id
  return (
    <>
      hello this is {Coin}
      <Chart id={id} />
    </>
  );
}

export default page;
