import { DoorDashClient } from "@doordash/sdk";
import "dotenv/config";

const client = new DoorDashClient({
    developer_id: process.env.DEVELOPER_ID,
    key_id: process.env.KEY_ID,
    signing_secret: process.env.SIGNING_SECRET,
})

const response = client
  .getDelivery('ab4c319d-4ea6-4ab3-89c7-239fce3ccbd0')
  .then(response => {
    console.log(response.data)
  })
  .catch(err => {
    console.log(err)
  })