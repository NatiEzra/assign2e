import commentModel from '../model/comment';
const createComment = async (req, res) => {
    const commentBody = req.body;
    try {
        const savedComment = await commentModel.create(commentBody);
        res.status(201).send(savedComment);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllComments= async (req, res) => {
    const filter= req.query.postId;
    if (filter){
        const comment=await commentModel.find({postId:filter});
        res.send(comment);
    }
    else{
    try {
        const comments = await commentModel.find();
        res.status(200).send(comments);
        } catch (error) {
        res.status(400).send(error.message);
        }
    }
    };

const updateComment= async (req, res) => {
    const {id} = req.params;
    const commentBody = req.body;
    try {
        const comment = await commentModel.findByIdAndUpdate(id,   commentBody, { new: true });
        
        if(!comment) {
            res.status(404).send('comment not found');
        }
        return res.status(200).json(comment);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteComment= async (req, res) => { 
    const { id } = req.params;
    try {
        const comment = await commentModel.findByIdAndDelete(id);
        if (!comment) {
            res.status(404).send('comment not found');
        }
        return res.status(200).json(comment);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
export default { 
    createComment,
    getAllComments,
    updateComment,
    deleteComment
 };