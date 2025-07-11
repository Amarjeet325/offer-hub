import React from "react";
import FilterToolbar from "@/components/platform-monitoring/filter-toolbar";
import DisputeTable, { DisputeTableColumn } from "@/components/table/DisputeTable";
import { FaRegCopy } from "react-icons/fa";
import { faker } from "@faker-js/faker";
import Link from "next/link";

interface DisputeRow {
  date: string;
  name: string;
  ticket: string;
  email: string;
}

const columns: DisputeTableColumn<DisputeRow>[] = [
  { key: "date", label: "Date initiated" },
  { key: "name", label: "Customer Name" },
  {
    key: "ticket",
    label: "Ticket ID",
    render: (row) => (
      <span className="flex items-center gap-2 text-blue-600">
        <span className="underline cursor-pointer">{row.ticket}</span>
        <FaRegCopy className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600" />
      </span>
    ),
  },
  {
    key: "email",
    label: "Email address",
    render: (row) =>
      row.email.length > 25 ? row.email.slice(0, 25) + "..." : row.email,
  },
  {
    key: "action",
    label: "Action",
    render: (row) => (
      <Link
        href={`/admin/dispute-resolution/${row.ticket}/chat`}
        className="text-blue-500 hover:underline"
      >
        View dispute
      </Link>
    ),
  },
];

const data: DisputeRow[] = Array.from({ length: 8 }).map(() => ({
  date: faker.date
    .recent()
    .toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(",", " :"),
  name: faker.person.fullName(),
  ticket: faker.string.alphanumeric(9).toLowerCase(),
  email: faker.internet.email(),
}));

export default function ActiveDispute() {
  return (
    <div className="space-y-4">
      <FilterToolbar />
      <DisputeTable columns={columns} data={data} />
    </div>
  );
}