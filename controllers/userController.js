const CombinedModel = require('../models/CombinedModel');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let profilePictureData = null;
        let profilePictureContentType = null;
        if (req.file) {
            profilePictureData = req.file.buffer;
            profilePictureContentType = req.file.mimetype;
        }

        const newUser = new CombinedModel({
            username,
            email,
            password,
            profilePicture: {
                data: profilePictureData,
                contentType: profilePictureContentType
            }
        });

        await newUser.save();
        res.status(201).send("User registered successfully!");
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).send("Error registering user. Please try again later.");
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await CombinedModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        let profilePictureData = null;
        let profilePictureContentType = null;
        if (user.profilePicture && user.profilePicture.data && user.profilePicture.contentType) {
            profilePictureData = user.profilePicture.data.toString('base64');
            profilePictureContentType = user.profilePicture.contentType;
        }

        res.json({
            profilePicture: {
                data: profilePictureData,
                contentType: profilePictureContentType
            }
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: "Error fetching user data. Please try again later." });
    }
};
