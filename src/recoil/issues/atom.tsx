import { atom } from "recoil";

const repositoryAtom = atom({
    key: "issues",
    default: { list: [], page: 1 },
});

export default repositoryAtom;
