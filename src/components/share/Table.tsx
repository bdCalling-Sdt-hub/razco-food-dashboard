import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    ID: "INV001",
    productsName: "Cucumber",
    barcode: "4564156",
    quantity: "500gm",
    category: "Foods",
    offer: "N/A",
    discount: "0%",
    price: "$15",
    date: "24-20-2021",
    store: "500",
    status: "Available",
    action: "action",
  },
  {
    ID: "INV001",
    productsName: "Cucumber",
    barcode: "4564156",
    quantity: "500gm",
    category: "Foods",
    offer: "N/A",
    discount: "0%",
    price: "$15",
    date: "24-20-2021",
    store: "500",
    status: "Available",
    action: "action",
  },
  {
    ID: "INV001",
    productsName: "Cucumber",
    barcode: "4564156",
    quantity: "500gm",
    category: "Foods",
    offer: "N/A",
    discount: "0%",
    price: "$15",
    date: "24-20-2021",
    store: "500",
    status: "Available",
    action: "action",
  },
  {
    ID: "INV001",
    productsName: "Cucumber",
    barcode: "4564156",
    quantity: "500gm",
    category: "Foods",
    offer: "N/A",
    discount: "0%",
    price: "$15",
    date: "24-20-2021",
    store: "500",
    status: "Available",
    action: "action",
  },
  {
    ID: "INV001",
    productsName: "Cucumber",
    barcode: "4564156",
    quantity: "500gm",
    category: "Foods",
    offer: "N/A",
    discount: "0%",
    price: "$15",
    date: "24-20-2021",
    store: "500",
    status: "Available",
    action: "action",
  },
  {
    ID: "INV001",
    productsName: "Cucumber",
    barcode: "4564156",
    quantity: "500gm",
    category: "Foods",
    offer: "N/A",
    discount: "0%",
    price: "$15",
    date: "24-20-2021",
    store: "500",
    status: "Available",
    action: "action",
  },
  {
    ID: "INV001",
    productsName: "Cucumber",
    barcode: "4564156",
    quantity: "500gm",
    category: "Foods",
    offer: "N/A",
    discount: "0%",
    price: "$15",
    date: "24-20-2021",
    store: "500",
    status: "Available",
    action: "action",
  },
];

const TableWrapper = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>ProductsName</TableHead>
          <TableHead>Barcode</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Offer</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Store</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((data) => (
          <TableRow key={data.ID}>
            <TableCell>{data.ID}</TableCell>
            <TableCell>{data.productsName}</TableCell>
            <TableCell>{data.barcode}</TableCell>
            <TableCell>{data.quantity}</TableCell>
            <TableCell>{data.category}</TableCell>
            <TableCell>{data.offer}</TableCell>
            <TableCell>{data.discount}</TableCell>
            <TableCell>{data.price}</TableCell>
            <TableCell>{data.date}</TableCell>
            <TableCell>{data.store}</TableCell>
            <TableCell>{data.status}</TableCell>
            <TableCell>{data.ID}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableWrapper;
