import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
 username: {
    type:String,
    required:true,
    unique:true,
 },
 email: {
    type:String,
    type:String,
    required:true,
    unique:true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.(com|net|org|edu|gov)$/.test(v);
      },
      message: props => `${props.value} is not a valid email!Must end in .com/.net/.org/.edu/.gov`
    }
 },
 password: {
    type:String,
    required:true,
    
 },
 img: {
    type:String,
    required:false,   
 },
 phone: {
    type:String,
    required:false,   
 },
 country: {
    type:String,
    required:true,
 },
 desc: {
    type:String,
    required:false,
    
 },
 isSeller: {
    type:Boolean,
    default:false,
    
 },
 authProvider: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    default: 'local'
 },
 googleId: {
    type: String,
    sparse: true,
    unique: true
 }
},
{
    timestamps:true,
}
);

export default mongoose.model("User",userSchema);