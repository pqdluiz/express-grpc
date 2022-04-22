import { loadPackageDefinition, credentials } from "grpc";
import { loadSync } from "@grpc/proto-loader";

const PROTO_PATH = "../customers.proto";

const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const CustomerService = () => {
  return loadPackageDefinition(packageDefinition).CustomerService;
};

const client = new CustomerService(
  "localhost:30043",
  credentials.createInsecure()
);

export default client;
