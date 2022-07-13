import pool from "../../db/db";

const login = async(req, res) => {

    try {
        console.log(req.body.user);
        console.log(req.body.password);

        let data = null;

        if(req.body.user.includes('@')){
            data = await pool.query(
                `SELECT * 
                    FROM "virtualChat".users 
                    WHERE 
                        email='${req.body.user}'
                    AND
                        password='${req.body.password}'
                    AND
                        is_admin=false
            `)
        } else {
            data = await pool.query(
                `SELECT * 
                    FROM "virtualChat".users as u
                    WHERE 
                        u.admin_user='${req.body.user}'
                    AND
                        u.password='${req.body.password}'
                    AND
                        u.is_admin=true
            `)
        }

        if(data.rows && data.rows.length > 0){
            res.json({
                status: 'success',
                message: 'Login successful',
                data: data.rows[0].id_user
            })
        } else {
            res.json({
                status: 'success',
                message: 'Login not successful',
                data: null
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            status: 'error',
            message: 'Error with login'
        })
    }
}

export default login