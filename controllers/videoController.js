import routes from "../routes"
import Video from "../models/Video"

export const home = async (req, res) => {
    try {
        const videos = await Video.find({})
        //-1 하면 순서를 거꾸로하겠다는 뜻임
        console.log(videos)
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }

};

export const search = async (req, res) => {
    // query는 req.query를 한 것과 같다.
    const {
        query: { term: searchingBy }
    } = req;
    let videos = [];
    try {
        //이렇게 하면 내가 검색한 거랑 완전히 똑같은 것만 찾음
        //videos = await Video.find({title:searchingBy});

        videos = await Video.find({
            title: {
                $regex: searchingBy,
                $options: "i"
            }
        });
    } catch (error) {
        console.log(error);
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos })
};

export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path }
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    console.log(newVideo);
    //res.render("upload", {pageTitle:"Upload"});
    res.redirect(routes.videoDetail(newVideo.id));
}

export const videoDetail = async (req, res) => {
    console.log(req.params);
    const {
        params: { id }
    } = req; // = cosnt id = req.params.id
    try {
        const video = await Video.findById(id)
        res.render("videoDetail", { pageTitle: video.title, video })
    } catch (error) {
        res.redirect(routes.home);
    };

};

export const getEditVideo = async (req, res) => {

    const {
        params: { id }
    } = req; // = cosnt id = req.params.id
    try {
        const video = await Video.findById(id)
        res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    } catch (error) {
        res.redirect(routes.home);
    };

}
export const postEditVideo = async (req, res) => {

    const {
        params: { id },
        body: { title, description }
    } = req; // = cosnt id = req.params.id
    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    };

}

export const deleteVideo = async (req, res) => {

    const { params: { id } } = req;

    try {
        await Video.findOneAndDelete({ _id: id });
    } catch (error) {
        console.log(error);
    }
    res.render("deleteVideo", { pageTitle: "Delete Video" });

}