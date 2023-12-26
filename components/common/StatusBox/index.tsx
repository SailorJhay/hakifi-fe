import { stateInsurance } from "@/utils/constant";
import clsx from "clsx";

interface IProps {
  title: string;
  className: string;
}

const statusDefined: Record<keyof typeof stateInsurance, IProps> = {
  CLAIM_WAITING: {
    title: "Claim-waiting",
    className: "bg-[#FBE7B2] text-yellow-default border-yellow-default ",
  },
  REFUNDED: {
    title: "Refunded",
    className: "bg-green-light text-green-default border-green-default",
  },
  CLAIMED: {
    title: "Claimed",
    className: "bg-green-light text-green-default border-green-default",
  },
  LIQUIDATED: {
    title: "Liquidated",
    className: "bg-red-light text-red-default border-red-default",
  },
  AVAILABLE: {
    title: "Available",
    className: "text-primary-1 bg-light-1 border-primary-1",
  },
  CANCELED: {
    title: "Cancelled",
    className: "text-grey-2 border-gray-2 bg-light-2",
  },
  INVALID: {
    title: "Invalid",
    className: "text-grey-2 border-gray-2 bg-light-2",
  },
  REFUND_WAITING: {
    title: "Refund-waiting",
    className: "bg-[#FBE7B2] text-yellow-default border-yellow-default",
  },
  EXPIRED: {
    title: "Expired",
    className: "bg-red-light text-red-default border-red-default",
  },
  PENDING: {
    title: "Pending",
    className: "bg-[#FBE7B2] text-yellow-default border-yellow-default",
  },
};

const StatusBox = ({ status }: { status: keyof typeof stateInsurance }) => {
  const statusInfo = statusDefined?.[status];
  return (
    <div
      className={clsx(
        "font-semibold text-sm border rounded-[20px] px-2 py-1",
        statusInfo?.className
      )}
    >
      {statusInfo?.title}
    </div>
  );
};

export default StatusBox;
