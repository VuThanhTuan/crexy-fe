import TopBar from "../_components/top-bar";
import BG from "@/public/images/Bg.jpg"


const ClientRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
        </div>
    );
}

export default ClientRootLayout;