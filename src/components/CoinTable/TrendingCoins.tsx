import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

async function getData() {
  const options = {
    method: "GET",
    url: "https://api.coingecko.com/api/v3/search/trending",
    headers: {
      accept: "application/json",
      "x-cg-pro-api-key": process.env.COINGECKO_API_KEY,
    },
  };

  return await axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);

      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
}
async function TrendingCoins() {
  const data: any = await getData();
  // console.log("this is data" ,data);

  return (
    <div className="m-[2rem] w-[40rem]">
      <Table className="border-2">
        <TableHeader>
          <TableRow>
            <TableHead>Trending coins </TableHead>
            {/* <TableHead className="text-right link" oncli>View more</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <img
                src={`${data.coins[0].item.thumb}`}
                alt=""
                className="w-[40px] mx-6 inline"
              />{" "}
              {data.coins[0].item.name}
            </TableCell>
            <TableCell>{data.coins[0].item.data.price}</TableCell>
            <TableCell
              className={
                data.coins[0].item.data.price_change_percentage_24h.usd <= 0
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              {data.coins[0].item.data.price_change_percentage_24h.usd}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <img
                src={`${data.coins[1].item.thumb}`}
                alt=""
                className="w-[40px] mx-6 inline"
              />{" "}
              {data.coins[1].item.name}
            </TableCell>
            <TableCell>{data.coins[1].item.data.price}</TableCell>
            <TableCell
              className={
                data.coins[1].item.data.price_change_percentage_24h.usd <= 0
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              {data.coins[1].item.data.price_change_percentage_24h.usd}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <img
                src={`${data.coins[2].item.thumb}`}
                alt=""
                className="w-[40px] mx-6 inline"
              />{" "}
              {data.coins[2].item.name}
            </TableCell>
            <TableCell>{data.coins[2].item.data.price}</TableCell>
            <TableCell
              className={
                data.coins[0].item.data.price_change_percentage_24h.usd <= 0
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              {data.coins[2].item.data.price_change_percentage_24h.usd}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default TrendingCoins;
