const arts = require('../Models/artSchema');
const wishlists = require('../Models/wishlistSchema');
// add arts
exports.addArt = async (req, res) => {
    console.log("==Inside add art controller");
    const userId = req.payload;
    console.log(userId);
    const artImage = req.file.filename;
    console.log(artImage);
    const { title, artistName, height, width, price, description } = req.body
    try {
        const existingArt = await arts.findOne({ title: title })
        if (existingArt) {
            res.status(406).json("Art already exist, please upload a new one")
        }
        else {
            const newArt = new arts({
                title: title,
                artistName: artistName,
                height: height,
                width: width,
                price: price,
                description: description,
                artImage: artImage,
                userId: userId
            })
            await newArt.save();
            res.status(200).json("Art added successfully")
        }
    }
    catch (err) {
        res.status(401).json("unable to add due to :", err)
    }
}
exports.getHomeArt = async (req, res) => {
    try {
        const homeArt = await arts.find().limit(4)
        res.status(200).json(homeArt)
    } catch (err) {
        res.status(401).json("Request failed due to :", err)
    }
}

exports.getAllArt = async (req, res) => {
    try {
        const allArt = await arts.find();
        res.status(200).json(allArt)
    } catch (err) {
        res.status(401).json("Request failed due to :", err)
    }
}

exports.getUserArt = async (req, res) => {
    const userId = req.payload;
    try {
        const userArt = await arts.find({ userId: userId })
        res.status(200).json(userArt)
    } catch (err) {
        res.status(401).json("Request failed due to :", err)
    }
}

exports.editUserArt = async (req, res) => {
    console.log("inside edit user controlller=====");
    const { id } = req.params;
    const userId = req.payload;
    console.log("project id:", id);
    console.log("user id ==", userId);
    const { title, artistName, height, width, price, description, artImage } = req.body;
    // console.log("body====",req.body);
    const uploadArtImage = req.file ? req.file.filename : artImage;
    try {
        const updateArt = await arts.findByIdAndUpdate(
            { _id: id },
            {

                title: title,
                artistName: artistName,
                height: height,
                width: width,
                price: price,
                description: description,
                artImage: uploadArtImage,
                userId: userId
            },
            { new: true }
        )
        await updateArt.save();
        res.status(200).json("Project updated successfully");
    } catch (err) {
        res.status(401).json("Unable to update due to :", err)
    }
}

exports.deleteUserArt = async (req, res) => {
    const { id } = req.params;
    try {
        const removeArt = await arts.findByIdAndDelete({ _id: id })
        res.status(200).json("project deleted successfully")
    } catch (err) {
        res.status(401).json("Delete failed due to ", err)
    }

}


exports.addCart = async (req, res) => {
    console.log("==Inside cart controller===");
    // const { _id } = req.body;
    // console.log(_id);
    // console.log(req.payload);
    console.log("requestbody ====", req.body);
    // console.log(req);
    const userId = req.payload;
    console.log(userId);
    // const artImage = req.file.filename;
    // console.log(artImage);

    
    const { title, artistName, height, width, price, description, artImage, _id } = req.body
    console.log(title, userId);

    try {
        // Check if there is any wishlist with the same title and userId
        const wishlistAdd = await wishlists.find({ title: title, userId: userId });

        if (wishlistAdd?.length > 0) {


            // If a wishlist with the same title and userId exists, respond with an error
            res.status(406).json("Cart already added");
        } else {
            // If no wishlist with the same title and userId exists, add the new wishlist
            const newWishlist = new wishlists({
                title: title,
                artistName: artistName,
                height: height,
                width: width,
                price: price,
                description: description,
                artImage: artImage,
                userId: userId
                
                // _id: _id // Assuming _id is a unique identifier for the wishlist
            });
            await newWishlist.save();
            res.status(200).json("Added to cart");
        }
    } catch (err) {
        res.status(401).json({ error: "Unable to add", message: err.message });
    }

}

exports.getCart = async (req, res) => {
    const userId = req.payload;
    console.log(userId);
    // const token = req.headers['authorization'].split(' ')[1];    //default location
    // console.log(token);
    try {
        const cartedItems = await wishlists.find({userId:userId})
        res.status(200).json(cartedItems)
    } catch (err) {
        res.status(401).json( err)
    }
}

exports.deleteUserCart = async (req, res) => {
    const { id } = req.params;
    try {
        const removeCart = await wishlists.findByIdAndDelete({ _id: id })
        res.status(200).json("Removed from cart successfully")
    } catch (err) {
        res.status(401).json("Delete failed due to ", err)
    }

}

// exports.deleteAfterCart = async (req, res) => {
//     console.log("inside delete after==========");
//     const userId = req.payload;
//     try {
//         const removeAfterCart = await wishlists.findByIdAndDelete({ userId: userId })
//         res.status(200).json("Removed from cart After successfully")
//     } catch (err) {
//         res.status(401).json("Delete failed due to ", err)
//     }

// }

exports.deleteAfterCart = async (req, res) => {
    console.log("inside delete after==========");
    const userId = req.payload;
    try {
        const removeAfterCart = await wishlists.deleteMany({ userId: userId });
        if (removeAfterCart.deletedCount > 0) {
            res.status(200).json("Removed from cart After successfully");
        } else {
            res.status(404).json("No items found to delete for the given userId");
        }
    } catch (err) {
        res.status(500).json("Delete failed due to " + err.message);
    }
}
