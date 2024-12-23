import PostModel from '../model/post';
const createPost = async (req, res) => {
    const postBody = req.body;
    try {
    const post = await PostModel.create(postBody);
    res.status(201).send(post);
    } catch (error) {
    res.status(400).send(error.message);
    }
};

const getAllPosts= async (req, res) => {
    const  filter  = req.query.SenderId; // Get SenderId from query parameters
    if (filter) {
        // If SenderId is provided, filter posts by SenderId
        const posts = await PostModel.find({SenderId: filter });
         res.send(posts);
    }
    else{
    try {
    const posts = await PostModel.find();
    res.status(200).send(posts);
    } catch (error) {
    res.status(400).send(error.message);
    }
}
};

const getPostById= async (req, res) => {
    const { id } = req.params;
    try {
    const post = await PostModel.findById(id);
    if (!post) {
    return res.status(404).send('Post not found');
    }
    res.status(200).send(post);
    } catch (error) {
    res.status(400).send(error.message);
    }
};

const updatePost = async (req, res) => { 
    const { id } = req.params; // מקבל את ה-ID מהנתיב
    
    try {
        // מחפש את הפוסט ומעדכן אותו עם הנתונים מ-body
        const updatedPost = await PostModel.findByIdAndUpdate(
            id, // מזהה הפוסט לעדכון
            req.body, // הנתונים החדשים
            { new: true } // מחזיר את המסמך המעודכן
        );

        // אם הפוסט לא נמצא
        if (!updatedPost) {
            return res.status(404).send('Post not found');
        }

        // מחזיר את הפוסט המעודכן
        return res.status(200).json(updatedPost);
    } catch (error) {
        // מחזיר שגיאה אם יש בעיה
        return res.status(400).send(error.message);
    }
};




 export default {
    createPost,
    getAllPosts,
    getPostById,
    updatePost
};