import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('Empty Database URI Connection');
}

const mongoClient = new MongoClient(uri);

export default mongoClient;