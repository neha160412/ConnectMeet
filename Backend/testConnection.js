const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://connectmeet_admin:Guriya7832@connectmeet-cluster.2xrwpcr.mongodb.net/?appName=connectmeet-cluster"


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

run();