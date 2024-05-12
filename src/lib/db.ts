const username = process.env.USERNAME;
const password = process.env.PASSWORD;

export const connectionDb =
    `mongodb+srv://khadija:${password}@cluster0.csuxm36.mongodb.net/userStore?retryWrites=true&w=majority&appName=Cluster0`;
