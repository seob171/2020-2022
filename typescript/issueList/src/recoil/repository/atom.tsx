import { atom } from "recoil";

const repositoryAtom = atom({
    key: "reposotory",
    default: {
        list: [],
        page: 1,
        username: "",
        savedRepository:
            localStorage.getItem("savedRepository") === null
                ? []
                : JSON.parse(localStorage.getItem("savedRepository") as string),
    },
});

export default repositoryAtom;
