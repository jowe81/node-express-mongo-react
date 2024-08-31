import { atom } from "recoil";

const permissionsMapState = atom({
    key: "permissionsMap",
    default: {},
});

export {
    permissionsMapState
}
