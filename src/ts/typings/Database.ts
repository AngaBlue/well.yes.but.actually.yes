import * as mysql from 'mysql';

export interface Database extends mysql.Connection {
    asyncQuery?: (sql: string, pool: any) => Promise<any[]>
}

export interface DatabaseConfig {
    host: string,
    user: string,
    password: string,
    database: string
}

export async function connect(databaseConfig: DatabaseConfig): Promise<Database> {
    let db = mysql.createConnection(databaseConfig) as Database;
    db.asyncQuery = async function (sql: string, pool: any): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            db.query({
                sql: sql,
                values: pool
            }, function (err, result) {
                if (err) reject(err);
                resolve(result);
            })
        });
    }
    return new Promise(async (resolve, reject) => {
        db.connect((err) => {
            if (err) reject(err);
            console.log("Connected to Database");
            resolve(db);
        });
    });
}

module.exports = {
    connect
}