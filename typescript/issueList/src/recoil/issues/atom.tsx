import { atom } from "recoil";

const repositoryAtom = atom({
    key: "issues",
    default: {
        list: [],
        page: 1,
        listLength: 0,
        owner: {
            username: "",
            repositoryName: "",
        },
    },
});

export default repositoryAtom;
