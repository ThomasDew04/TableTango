import sql from "mssql/msnodesqlv8";
import app from "./app";
import dotenv from "dotenv";

const port = dotenv.config().parsed?.PORT;

const config = {
    server: "LAPTOPTHOMAS",
    database: "tabletango",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
};

sql.connect(config, function(error: any) {
    if(error) {
        console.log(error);
        return;
    }
    console.log("Connection to database successful");
    const request = new sql.Request();

    app.listen(port, () => {
        console.log(`🚀 Server is running at http://localhost:${port}`)
    })
})


