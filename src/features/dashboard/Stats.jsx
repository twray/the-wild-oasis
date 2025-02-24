/* eslint-disable no-unused-vars */

import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce(
    (accumulator, current) => accumulator + current.totalPrice,
    0
  );

  const numCheckIns = confirmedStays.length;
  const occupancyRate =
    confirmedStays.reduce(
      (accumulator, current) => accumulator + current.numNights,
      0
    ) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check Ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={numCheckIns}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancyRate * 100)}%`}
      />
    </>
  );
}

export default Stats;
