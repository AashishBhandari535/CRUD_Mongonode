import mongoose from 'mongoose';
let instance=null;

//Connect with database server
mongoose.connect(`mongodb://localhost:27017/mydb3`)
    .then(()=>console.log('Connected to database'))
    .catch(err=>console.log('Error connecting to database'));

//Creating Schema
const personSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    address:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
     __v: { type: Number, select: false}
})
//Creating Model
const PersonModel=mongoose.model("persons",personSchema);
//Database operations
class DbService{
    static getDbServiceInstance(){//static method can be called only by class itself
        return instance ? instance :new DbService();
    }
    //gets all data from database
    async getAllData(){
        try{
            const persons=await PersonModel.find();
            return persons;
        }
        catch(err){
            console.log(err.message);
        }
    }
    //inserting records in collection
    // async saveDocument(){
    //     const person=new PersonModel({
    //         name:'Rajan KC',
    //         address:'Bhaktapur,Nepal',
    //         email:'bye@gmail.com'
    //     })
    //     const result=await person.save();
    //     console.log(result);
    // }

    //inserting records into database
    async saveDocument(obj){
        const person=new PersonModel({
            name:obj.name,
            address:obj.address,
            email:obj.email
        })
        const result=await person.save();
        return result;
    }
    //updating Records based on id
    async upDateRecords(obj){
        let flag=false;
        try{
            const person=await PersonModel.findById(obj.id);
            if(!person){
                throw new Error("Record of person not found");
            }
            console.log(`Old value in record:${person}`);
            person.name=obj.name;
            person.address=obj.address;
            person.email=obj.email;
            const result=await person.save();
            console.log(`New value in record:${result}`)
            flag=true
            return flag;
        }
        catch(err){
            console.log(err.message);
        }
    }
    //Delete Record
    async deleteRecord(id){
        try{
            console.log("im from database",id);
            const result=await PersonModel.deleteOne({_id:id});//always pass object here while deleting records
            console.log(result);
            const {acknowledged}=result;
            return acknowledged === true ? true : false;
        }
        catch(err){
            console.log(err)
        }
    }
    //Search Record
    async findRecords(Name){
        try{
            const result=await PersonModel.find({name:Name});
            return result;
        }
        catch(err){
            console.log(err)
        }
    }

}
const dbObj=DbService.getDbServiceInstance();
//dbObj.getAllData();
//dbObj.saveDocument();
const obj={
    name:'Shyam Bhandari',
    address:'Tinkune',
    email:"sino@gmail.com"
}
//dbObj.upDateRecords("62df75eba1d7ae3a371e596b",obj);
//dbObj.deleteRecord("62df773446fb89cbb254ff3e");
//dbObj.getAllData();
export {DbService};
