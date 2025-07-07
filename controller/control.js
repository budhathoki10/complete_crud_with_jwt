
const user= require('../schemas/schema')

let createss = async (req, res) => {
    try {
        let { name } = req.body;
        let check = await user.findOne({ name });
        if (check) {
            return res.status(404).json({ message: "this name is already booked" });
        }
        let newuser = new user(req.body);
        const saved = await newuser.save();
        res.status(200).json({ message: saved });
    } catch (error) {
        res.status(404).json({ message: "error in create" });
    }
};


let readss= async (req,res)=>{
    try {
      const {status,sort}= req.query
      const filter= {}
      if(status){
        filter.status= status
      }

    const order = sort ==="ascending"?1:-1
    const users = await user.find(filter).sort({date:order});

    if (users.length === 0) {
      return res.status(404).json({ message: "Database is empty" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

}

let update= async(req,res)=>{
  try {
    const id=req.params.id
    const find= await user.findById(id)
    if(!find){
      return res.status(404).json({ message: "no id" });
    }
    const up= await user.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json({message:up})
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

let deletes= async(req,res)=>{
  try {
    const id=req.params.id
    const find= await user.findById(id)
    if(!find){
      return res.status(404).json({ message: "no id" });
    }
    const up= await user.findByIdAndDelete(id,req.body,{new:true})
    res.status(200).json({message:"delete"})
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports= {createss,readss,update,deletes}