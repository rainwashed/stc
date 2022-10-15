import { Dispatch, SetStateAction, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXmark,
    faBars,
    faContactCard,
    faCalendarDays,
    faStaffSnake,
    faClipboardUser,
    faBurger,
    faPersonRunning,
    faRankingStar,
    faScroll,
    faChalkboard,
    faGlobe,
    faUserCheck,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import style from "../../public/styles/components/fab.component.module.scss";

interface FabNavigationButton {
    icon: IconDefinition;
    tooltip: string;
    navRoute: string;
}
function FabNavigationButton(props: FabNavigationButton) {
    return (
        <div className={style.fabNavButton}>
            <a title={props.tooltip} href={props.navRoute}>
                <FontAwesomeIcon icon={props.icon} />
            </a>
        </div>
    );
}

function Fab() {
    let [fabOpened, setFabOpened]: [
        boolean,
        Dispatch<SetStateAction<boolean>>
    ] = useState(false);

    function onFabClick(): void {
        setFabOpened(!fabOpened);
    }

    return (
        <button className={style.fab} onClick={() => onFabClick()}>
            {fabOpened ? (
                <>
                    <FontAwesomeIcon icon={faXmark} />
                    <div className={style.fabTrack}>
                        <FabNavigationButton
                            tooltip="Contact Route"
                            navRoute="/contacts"
                            icon={faContactCard}
                        />
                        <FabNavigationButton
                            tooltip="Schedule Route"
                            navRoute="/schedule"
                            icon={faCalendarDays}
                        />
                        <FabNavigationButton
                            tooltip="Health Route"
                            navRoute="/health"
                            icon={faStaffSnake}
                        />
                        <FabNavigationButton
                            tooltip="Attendance Route"
                            navRoute="/attendance"
                            icon={faClipboardUser}
                        />
                        <FabNavigationButton
                            tooltip="Cafeteria Route"
                            navRoute="/cafeteria"
                            icon={faBurger}
                        />
                        <FabNavigationButton
                            tooltip="Activities Route"
                            navRoute="/activities"
                            icon={faPersonRunning}
                        />
                        <FabNavigationButton
                            tooltip="GPA Route"
                            navRoute="/gpa"
                            icon={faRankingStar}
                        />
                        <FabNavigationButton
                            tooltip="Assignment Route"
                            navRoute="/assignments"
                            icon={faScroll}
                        />
                        <FabNavigationButton
                            tooltip="Classes Route"
                            navRoute="/classes"
                            icon={faChalkboard}
                        />
                        <FabNavigationButton
                            tooltip="IB Standards Route"
                            navRoute="/ibstandards"
                            icon={faGlobe}
                        />
                        <FabNavigationButton
                            tooltip="Marks Route"
                            navRoute="/marks"
                            icon={faUserCheck}
                        />
                    </div>
                </>
            ) : (
                <FontAwesomeIcon icon={faBars} />
            )}
        </button>
    );
}

export default Fab;
