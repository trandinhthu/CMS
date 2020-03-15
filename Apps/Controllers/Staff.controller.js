const Models = require('../Models/Models')
const mongoose = require('../../common/database')()

async function Page_Index(req, res)
{
    let userid = req.cookies.userId
    let user = await Models.UserModel.find({_id: userid})
    return res.render('StaffPage/index', {data:{user:user}})
}
function Faculty_Page(req, res)
{
    Models.FacultyModel.find({}).exec((err, faculty)=>{
        if(err) return console.log(err)
        res.render('StaffPage/Faculty/index', {data:{faculty:faculty}})
    })
}
async function Subject_Page(req, res)
{
    let Faculty = req.params.faculty_id
    let subject = await Models.SubjectModel.find({Faculty_id: Faculty})
    return res.render('StaffPage/Subject/index', {data:{subject:subject}})
}
async function Class_Page(req, res)
{
    let Class = await Models.ClassModel.find({Subject_id:req.params.subject_id})
    res.render('StaffPage/class/index', {data:{class:Class}})
}
module.exports = {
    Page_Index: Page_Index,
    Subject_Page: Subject_Page,
    Class_Page: Class_Page,
    Faculty_Page: Faculty_Page

}