import { SidebarMenu } from "./sidebar-menu"
import logo from "../assets/logo.png"

export const NavbarMobileComponent = () => {
    return (
        <div className="md:hidden flex sticky justify-between bg-base-100 p-2 z-50">
            <SidebarMenu />
            <div className="flex items-center gap-2">
                <img src={logo} alt="" className="h-6 w-6" />
                <h4 className="font-bold">TaskEase</h4>
            </div>
        </div>
    )
}