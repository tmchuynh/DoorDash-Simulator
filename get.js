import { DoorDashClient } from "@doordash/sdk";
import "dotenv/config";

const client = new DoorDashClient({
    developer_id: process.env.DEVELOPER_ID,
    key_id: process.env.KEY_ID,
    signing_secret: process.env.SIGNING_SECRET,
})

const response = client
  .getDelivery('142b11c9-bb1b-42ad-a976-069d6e960a9b')
  .then(response => {
    console.log(response.data)
  })
  .catch(err => {
    console.log(err)
  })