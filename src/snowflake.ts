import * as snowflake from 'snowflake-sdk';

async function uploadData(jsonData: object): Promise<void> {
    const connection = snowflake.createConnection({
        account: process.env.SNOWFLAKE_ACCOUNT,
        username: process.env.SNOWFLAKE_USERNAME,
        password: process.env.SNOWFLAKE_PASSWORD,
        warehouse: process.env.SNOWFLAKE_WAREHOUSE,
        database: process.env.SNOWFLAKE_DATABASE,
        schema: process.env.SNOWFLAKE_SCHEMA
    });

    try {
        await new Promise<void>((resolve, reject) => {
            connection.connect((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        await new Promise<void>((resolve, reject) => {
            connection.execute({
                sqlText: `INSERT INTO your_table SELECT PARSE_JSON(column1) FROM VALUES (?)`,
                binds: [JSON.stringify(jsonData)],
                complete: (err, stmt, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            });
        });

        console.log('Data uploaded successfully.');
    } catch (error) {
        console.error('Error uploading data:', error);
    } finally {
        connection.destroy((err, conn) => {
            if (err) {
                console.error('Error closing connection:', err);
            }
        });
    }
}
