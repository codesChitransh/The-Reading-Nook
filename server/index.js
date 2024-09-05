const port = 3008;
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { adminModel } from "./models/admin.js";
import { studentModel } from "./models/student.js";
import { addModel } from "./models/addbook.js";
import { bookModel } from "./models/book.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://echitranshsrivastava:GrXyVPlq8pdPFEuN@cluster-1.zkjaygh.mongodb.net/bookstore");

app.post("/login", (req, res) => {
    const { username, password, role } = req.body;
    const Model = role === 'admin' ? adminModel : studentModel;

    Model.findOne({ username })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({
                        user,
                        success: true,
                    });
                } else {
                    res.json({
                        message: "Password is incorrect",
                        success: false,
                    });
                }
            } else {
                res.json({
                    message: "No record existed",
                    success: false,
                });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post("/adminsignup", (req, res) => {
    const { username, password } = req.body;
    adminModel.create({ username, password })
        .then(user => {
            res.json({
                user,
                success: true,
            });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post("/studentsignup", (req, res) => {
    const { username, password } = req.body;
    studentModel.create({ username, password })
        .then(user => {
            res.json({
                user,
                success: true,
            });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/add', (req, res) => {
    const { title, author, price } = req.body;

    addModel.create({ title, author, price })
        .then(book => {
            bookModel.create({ title, author, price})
                .then(() => {
                    res.json({
                        book,
                        success: true,
                    });
                })
                .catch(err => res.status(500).json({ error: `Failed to save to bookModel: ${err.message}` }));
        })
        .catch(err => res.status(500).json({ error: `Failed to save to addModel: ${err.message}` }));
});

app.get('/books', (req, res) => {
    bookModel.find({})
        .then(books => {
            res.json({
                books,
                success: true,
            });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});