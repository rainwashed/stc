import type { IconType } from "react-icons/lib";
import { FaAddressBook } from "react-icons/fa";

interface PopupDataInterface {
    title: string;
    description: string;
    icon: IconType;
    acceptText?: string;
    children?: any;
}

export default function PopupComponent(props: PopupDataInterface) {
    return <div></div>;
}

<PopupComponent
    title="Hello"
    description="World"
    icon={FaAddressBook}
></PopupComponent>;
