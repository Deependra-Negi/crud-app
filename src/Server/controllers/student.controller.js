const express = require('express');
const router = express.Router();

const Student = require('../models/student.model');

//create a new student
router.post("/", async (req, res) => {
    const student = await Student.create(req.body)
    return res.status(201).json(student)
})

// get one students
router.get("/:studentId", async (req, res) => {
    const student = await Student.find({ _id: req.params.studentId }).exec()
    return res.status(201).json(student)
})

// get all students
// router.get("/", async (req, res) => {
//     const student = await Student.find().lean().exec()
//     return res.status(201).json(student)
// })

// edit one students
router.patch("/:studentId", async (req, res) => {
    const updated = await Student.findByIdAndUpdate(req.params.studentId, req.body)
    return res.status(201).json(updated)
})

// delete one students
router.delete("/:studentId", async (req, res) => {
    const deleted = await Student.findByIdAndRemove(req.params.studentId)
    return res.status(201).json(deleted)
})

// age sorting

router.get("/sort/:age", async (req, res) => {
    const sorted = await Student.find({}, { "age": 1, "name":1, "city":1, "gender":1 }).sort({ "age": (req.params.age)}).lean().exec()
    return res.status(201).json(sorted)
})

// gender filter

router.get("/filter/:gender", async (req, res) => {
    const filtered = await Student.find({ "gender": (req.params.gender)}).lean().exec()
    return res.status(201).json(filtered)
})

// city filter

router.get("/filter/:city", async (req, res) => {
    const filtered = await Student.find({ "city": (req.params.gender)}).lean().exec()
    return res.status(201).json(filtered)
})


//paginate students
router.get("/", async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;

        let totalStudents = await Student.find().lean().exec();

        const students = await Student.find()
            .skip(offset)
            .limit(limit)
            .lean()
            .exec();

        res.status(200).json({students, length: totalStudents.length, totalPages: Math.ceil(totalStudents.length/limit)})
    } catch (err) {
        res.status(404).json({ err: err.message });
    }
})


module.exports = router;