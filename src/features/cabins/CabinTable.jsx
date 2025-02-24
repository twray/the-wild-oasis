import { useSearchParams } from "react-router-dom";
import CabinRow from "./CabinRow";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useCabins } from "./useCabins";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { cabins, isLoading } = useCabins();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resource="cabins" />;

  const filterValue = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  let filteredCabins;

  switch (filterValue) {
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      break;
    case "all":
    default:
      filteredCabins = cabins;
  }

  const [sortByField, sortByDirection] = sortBy.split("-");
  const sortModifier = sortByDirection === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[sortByField] - b[sortByField]) * sortModifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
