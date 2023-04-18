import PostModel from "../models/Post.js"

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось создать статью'
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'Не удалось получить статьи'
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const paramsId = req.params.id;

        let doc = await PostModel.findByIdAndUpdate(paramsId, { $inc: { viewsCount: 1 }});

        res.json(doc);        

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'Не удалось получить статьи'
        });
    }
}

export const remove = async (req, res) => {
    try {
        const paramsId = req.params.id;

        await PostModel.findOneAndDelete({_id: paramsId})

        res.json({
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось удалить статью'
        });
    }
}

export const update = async (req, res) => {
    try {
        const paramsId = req.params.id;

        await PostModel.updateOne({_id: paramsId}, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        res.json({
            success: true
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось изменить статью'
        });
    }
}