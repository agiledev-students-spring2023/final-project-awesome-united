import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env

// TODO: add schemas
/* const SnakeSchema = new mongoose.eSchema({
    name: String,
    length: {type: Number, min: [1, 'What is a negative length?'],required:true}
}) */

const UserSchema = new mongoose.Schema({
    username: {type:String, required:true},
    email: String,
    password: {type: String, unique: true, required: true}
});

const ArticleSchema = new mongoose.Schema({
    title: String,
    url: String,
    description: String,
    user: {type: UserSchema},
    //user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
// TODO: configure plugin
ArticleSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=title%>'});

// TODO: register models
mongoose.model('User',UserSchema);
const User = mongoose.model('User');


const u = new User({
    username: "Robert",
    email: "rz1503",
    password: "aaaaaaaaa"
}); 

mongoose.model('Article',ArticleSchema);
const Article = mongoose.model('Article');


const a = new Article({
    title: "News Come Out",
    url: "dsgsdgseges",
    description: "Does Burno Mars Is G",
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}); 

/*
mongoose.model('Snake', SnakeSchema);
const Snake = mongoose.model('Snake');
const s = new Snake({
    name: 'hissy elliot',
    length: 12
});

s.save((err,saved)=>{
    if(err){
        console.log(err);
    } else{
        console.log(saved);
    }
});
*/

console.log(User);
console.log(a.title);
console.log(Article);
mongoose.connect(process.env.MONGODB);

//model with schema and name of model Registers model
//model with name Retrieves


