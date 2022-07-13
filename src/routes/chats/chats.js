import pool from "../../db/db";
// import { v4 } from 'uuid'

const getChatsByUser = async(req, res) => {

    try {
        const {
            admin_id
        } = req.body;
        const data = await pool.query(
            `SELECT 
                ca.id_chat_admin,
                s.color,
                os.name
            FROM "virtualChat".chats_admin as ca
            INNER JOIN
                "virtualChat".severities as s
                    ON s.id_severity = ca.id_severity
            INNER JOIN
                "virtualChat".options_support as os
                    ON os.id_option_support = ca.id_option_support
            WHERE os.id_user='${admin_id}'
            ORDER BY os.name ASC
            ;`
        )
        res.json({
            status: 'success',
            message: 'successful',
            data: data.rows
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: 'error',
            message: 'fail'
        })
    }
}

export default {
    getChatsByUser,
}