const oracledb = require('oracledb');

cns = {
    user: "root",
    password: "root",
    connectString: "172.17.0.2/orcl18"
}


async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return result;
}

exports.Open = Open;