import User from "../models/User";
import Dog from "../models/Dog";

export const getDog = async (req, res) => {
    const user_id = req.session.user._id;
    const user = await User.findById(user_id).populate("ownerDogArray");
    const dogs = user.ownerDogArray;
    return res.render("ownerDog", { pageTitle: "강아지 관리", dogs });
};

export const postDog = async (req, res) => {
    const dog_id = req.body.dog_id;
    const edit_or_delete = req.body.edit_or_delete;
    if (edit_or_delete === "수정") {
        const originalDog = await Dog.findById(dog_id);
        return res.render("dogAddorEdit", {
            pageTitle: "강아지 등록",
            add_or_edit: "edit",
            originalDog,
        });
    } else {
        await Dog.findByIdAndDelete(dog_id);
        return res.redirect("/owner/dog");
    }
};

export const getDogAdd = (req, res) => {
    return res.render("dogAddorEdit", {
        pageTitle: "강아지 등록",
        add_or_edit: "add",
    });
};

export const postDogAdd = async (req, res) => {
    const { dogName, birthday, breed, weight } = req.body;
    const user_id = req.session.user._id;
    try {
        const newDog = await Dog.create({
            ownerID: user_id,
            dogName,
            birthday,
            breed,
            weight,
        });
        const user = await User.findById(user_id);
        user.ownerDogArray.push(newDog._id);
        user.save();
        return res.redirect("/owner/dog");
    } catch (error) {
        console.log(error);
        return res.status(400).render("dogAddorEdit", {
            pageTitle: "강아지 등록",
            errorMessage:
                "강아지 등록 과정에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
    }
};

export const postDogEdit = async (req, res) => {
    const originalDog_id = req.body.originalDog_id;
    const originalDog = await Dog.findById(originalDog_id);
    await Dog.findByIdAndUpdate(
        originalDog_id,
        {
            ownerID: originalDog.ownerID,
            dogName: req.body.dogName,
            birthday: req.body.birthday,
            breed: req.body.breed,
            weight: req.body.weight,
        },
        { new: true }
    );
    return res.redirect("/owner/dog");
};
