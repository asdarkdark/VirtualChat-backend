import pool from "../../db/db";
import { v4 } from 'uuid';

const getInformationSupport = async(req, res) => {
    try {
        const {
            id_option_support
        } = req.body;
        const data = await pool.query(
            `SELECT 
                id_information,
                description
            FROM "virtualChat".information_option_support
            WHERE id_option_support='${id_option_support}';`
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

const putInformationSupport = async(req, res) => {
    try{
        const {
            id_information,
            description
        } = req.body;
        await pool.query(
            `UPDATE "virtualChat".information_option_support 
                SET description = '${description}'
            WHERE id_information='${id_information}';`
        )
        res.json({
            status: 'success',
            message: 'successful',
            data : {
                id_information,
                description
            }
        })
    }catch(error){
        console.log(error);
        res.json({
            status: 'error',
            message: 'fail'
        })
    }
}

const addInformationSupport = async(req, res) => {
    try{

        const {
            description,
            id_option_support
        } = req.body;

        const id = v4();
        await pool.query(
            `INSERT INTO "virtualChat".information_option_support (
                id_information,
                description,
                id_option_support
            )
                VALUES(
                    '${id}',
                    '${description}',
                    '${id_option_support}'
                );`
        )
        res.json({
            status: 'success',
            message: 'successful',
            data: {
                id_information: id,
                description,
            }
        })
    }catch(error){
        console.log(error);
        res.json({
            status: 'error',
            message: 'fail'
        })
    }
}

export default {
    getInformationSupport,
    putInformationSupport,
    addInformationSupport,
    addInformationSupport
}