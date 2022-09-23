import { atom } from "recoil";

const repositoryAtom = atom({
    key: "reposotory",
    default: { list: [], page: 1, username: "" },
});

export default repositoryAtom;
