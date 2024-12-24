import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableList() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Sl No:</TableHead>
          <TableHead>Employee</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
}
