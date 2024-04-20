const profiles = require('../Models/profileSchema')
// add profiles

exports.addProfile = async (req, res) => {
    console.log("==Inside add profile controller");
    const userId = req.payload;
    console.log(userId);
    const profileImage = req.file.filename;
    console.log(profileImage);
    const { artistName, email, phone, address, numUpload } = req.body;
    try {
        const existingProfile = await profiles.findOne({ userId: userId });
        if (existingProfile) {
            res.status(406).json("Profile already exists Please edit ")
        }
        else {
            const newProfile = new profiles({
                artistName: artistName,
                email: email,
                phone: phone,
                address: address,
                numUpload: numUpload,
                profileImage: profileImage,
                userId: userId
            })
            await newProfile.save();
            res.status(200).json("Profile added successfully")
        }
    } catch (err) {
        res.status(401).json("Unable to add profile due to :", err)
    }
}

exports.getUserProfile = async (req, res) => {
    console.log("Inside getprofile controller");
    const userId = req.payload;
    console.log("userid =", userId);

    try {
        const userProfile = await profiles.find({ userId: userId })
        console.log(userProfile);
        res.status(200).json(userProfile)
    } catch (err) {
        res.status(401).json("Request failed due to :", err)
    }

}

exports.editProfile = async (req, res) => {
    console.log("inside edit profile controlller=====");
    const { id } = req.params;
    const userId = req.payload;
    console.log("project id:", id);
    console.log("user id ==", userId);
    const { artistName, email, phone, address, numUpload, profileImage } = req.body;
    console.log(" req body====", req.body);
    const uploadProfileImage = req.file ? req.file.filename : profileImage;
    try {
        const updateProfile = await profiles.findByIdAndUpdate(
            { _id: id },
            {
                artistName: artistName,
                email: email,
                phone: phone,
                address: address,
                numUpload: numUpload,
                profileImage: uploadProfileImage,
                userId: userId
            },
            { new: true }
        )
        await updateProfile.save();
        res.status(200).json("Project updated successfully");
    } catch (err) {
        res.status(401).json("Unable to update due to :", err)
    }
}

exports.getProfile = async (req, res) => {
    // const {artistName} = req.params;
    console.log("params---",req.params);
    const artistName = req.params.artistName;
    console.log(artistName);
    // const token = req.headers['authorization'].split(' ')[1];    //default location
    // console.log(token);
    try {
        const cartedItems = await profiles.find({ artistName: artistName })
        console.log(cartedItems[0]);
        res.status(200).json(cartedItems[0])
    } catch (err) {
        res.status(401).json(err)
    }
}