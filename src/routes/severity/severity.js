import pool from "../../db/db";
import { v4 } from 'uuid'

const getSeverities = async(req, res) => {
    try {

        const {
            admin
        } = req.body;

        const data = await pool.query(
            `SELECT 
                s.id_severity, 
                s.name,
                s.color
                FROM "virtualChat".severities as s
                WHERE s.id_user = '${admin}'
            `
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

const getSeveritiesByOption = async(req, res) => {
    try {

        const {
            id_option_support
        } = req.body;

        const data = await pool.query(
            `SELECT 
                s.id_severity, 
                s.name,
                s.color
                FROM "virtualChat".severities as s
                WHERE s.id_option_support = '${id_option_support}'
            `
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

const addSeverity = async(req, res) => {
    try {

        const {
            name,
            color,
            id_user,
        } = req.body;
        const id = v4();

        await pool.query(
            `INSERT INTO 
                "virtualChat".severities(
                    id_severity,
                    name,
                    id_user,
                    color
                )
                VALUES(
                    '${id}',
                    '${name}',
                    '${id_user}',
                    '${color}'
                )
            `
        )

        res.json({
            status: 'success',
            message: 'successful',
            data: {
                id_severity: id,
                name,
                color,
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

export default {
    getSeverities,
    getSeveritiesByOption,
    addSeverity
}