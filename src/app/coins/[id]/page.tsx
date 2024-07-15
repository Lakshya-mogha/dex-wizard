import React from "react";
import Chart from "../../../components/chart/Chart";
import { json } from "stream/consumers";

function page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log(id);
  console.log(params);
  

  const Coin = JSON.parse(id)
  return (
    <>
      hello this is {Coin}
      <Chart id={id} />
    </>
  );
}

export default page;
