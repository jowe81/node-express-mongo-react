import React from "react";
import MainNavigation from "./MainNavigation";
import { useRecoilValue } from "recoil";
import { permissionsMapState } from "../../../globalState/atoms";

function MainSidebar() {
    const permissionMap = useRecoilValue(permissionsMapState);
    console.log(permissionMap)
    return (
        <div>
            {Object.keys(permissionMap).length > 0 && <MainNavigation />}
        </div>
    );
}

export default MainSidebar;
