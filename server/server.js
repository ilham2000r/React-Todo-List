const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')
// const routerTodo = require('./routers/todo')

const db = mysql.createConnection({
    host: 'localhost',       
    user: 'root',            
    password: '',    
    database: 'react-todo-list' 
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack)
        return
    }
    console.log('Connected to MySQL as id ' + db.threadId)
})

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

// app.use('/api',routerTodo)

app.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM data_task'
    db.query(query, (err, results) => {
        if (err) throw err
        res.json(results)
    })
})

app.post('/tasks', (req, res) => {
    const { task_name,  due_date , is_checked} = req.body
    if(!task_name) {
        return res.status(400).json({ error: 'Task name is require'})
    }
    const query = 'INSERT INTO data_task (task_name, due_date, is_checked) VALUES (?, ?, ?)'
    db.query(query, [task_name,  due_date, is_checked], (err, result) => {
        if (err) throw err;
        res.json({
            message: 'Task added successfully',
            task: {
                task_id: result.insertId,
                task_name,
                due_date,
                is_checked,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    })
})

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params
    const { task_name, description, due_date } = req.body
    const query = 'UPDATE data_task SET task_name = ?, due_date = ?, updatedAt = NOW() WHERE task_id = ?'
    db.query(query, [task_name, description, due_date, id], (err, result) => {
        if (err) throw err
        res.json({
            message: 'Task updated successfully',
            task: {
                task_id: id,
                task_name,
                due_date,
                is_checked: false, 
                updatedAt: new Date() 
            }
        })
    })
})

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params
    const query = 'DELETE FROM data_task WHERE task_id = ?'
    db.query(query, [id], (err, result) => {
        if (err) throw err
        res.json({ message: 'Task deleted successfully' })
    })
})

app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params
    const { is_checked } = req.body
    const query = 'UPDATE data_task SET is_checked = ? WHERE task_id = ?'
    db.query(query, [is_checked, id], (err, result) => {
        if (err) throw err
        res.json({
            message: 'Task checked successfully',
            task: {
                task_id: id,
                is_checked,
                updatedAt: new Date()
            }
        })
    })
})

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params
    const query = 'SELECT * FROM data_task WHERE task_id = ?'
    db.query(query, [id], (err, result) => {
        if (err) throw err
        res.json(result[0])  
    })
})

app.listen(5002,()=>
    console.log('Server is running on port 5002')
)