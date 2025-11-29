import {  AiOutlineInfoCircle, AiOutlineHome} from 'react-icons/ai'
import {CiSearch} from 'react-icons/ci';
import { PiHeadphonesThin} from 'react-icons/pi'

export const sidebarData = [
    {
        title: "Home",
        path: '/',
        iocn: <AiOutlineHome/>
    },
    {
        title: "Products",
        path: "/products",
        icon: <CiSearch/>
    },
    // {
    //     title: "Contact",
    //     path: "/contact",
    //     icon: <PiHeadphonesThin/>
    // },
    {
        title: "About",
        path: "/about",
        icon: <AiOutlineInfoCircle/>
    }
]
