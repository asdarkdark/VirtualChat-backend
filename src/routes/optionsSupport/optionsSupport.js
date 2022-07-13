import pool from "../../db/db";
import { v4 } from 'uuid'

const getOptionsSupport = async(req, res) => {

    try {
        const {
            admin
        } = req.body;
        const data = await pool.query(
            `SELECT 
                os.id_option_support,
                os.name
            FROM "virtualChat".options_support as os 
            WHERE os.id_user='${admin}';`
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

const getOptionsSupportForUser = async(req, res) => {

    try {
        const {
            user_id
        } = req.body;
        // const data = await pool.query(
        //     `SELECT 
        //         os.id_option_support,
        //         os.name,
        //         ua.id_admin,
        //         s.color
        //     FROM "virtualChat".options_support as os 
        //     INNER JOIN "virtualChat".users_admin as ua
        //         ON ua.id_admin = os.id_user
        //     INNER JOIN "virtualChat".severities as s
        //         ON s.id_option_support = os.id_option_support
        //     AND ua.id_user = '${user_id}'
        //     ;`
        // )
        const data = await pool.query(
            `SELECT 
                os.id_option_support,
                os.name,
                ua.id_admin,
                s.color
            FROM "virtualChat".users_admin as ua
            INNER JOIN "virtualChat".options_support as os
                ON ua.id_admin = os.id_user
            LEFT JOIN "virtualChat".severities as s
                ON s.id_severity = os.id_severity
            AND ua.id_user = '${user_id}'
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

const addOptionSupport = async(req, res) => {
    try {

        const {
            name,
            id_user
        } = req.body;

        const id = v4();

        await pool.query(
            `INSERT INTO "virtualChat".options_support(
                id_option_support,
                name,
                id_user
            )
            VALUES(
                '${id}',
                '${name}',
                '${id_user}'
            );`
        )
        res.json({
            status: 'success',
            message: 'successful',
            data: {
                id_option_support: id,
                name
            }
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: 'error',
            message: 'fail'
        })
    }
}

const updateOptionSupport = async(req, res) => {
    try {

        const {
            id_severity,
            id_option_support,
        } = req.body;

        console.log(req.body)

        await pool.query(
            `UPDATE "virtualChat".options_support
                SET id_severity = '${id_severity}'
                WHERE id_option_support = '${id_option_support}'
            `
        )

        res.json({
            status: 'success',
            message: 'successful',
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
    getOptionsSupport,
    addOptionSupport,
    getOptionsSupportForUser,
    updateOptionSupport
}