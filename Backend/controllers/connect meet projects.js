exports.register = (req,res)=>{

    res.status(201).json({
        success:true,
        message:"User Registration API"
    });

};

exports.login=(req,res)=>{

    res.status(200).json({

        success:true,
        message:"User Login API"

    });

};