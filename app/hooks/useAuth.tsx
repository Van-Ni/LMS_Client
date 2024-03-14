import { useSelector } from "react-redux";

export default function userAuth() {
    const { user } = useSelector((state: any) => state.auth);
    console.log('🚀 ~ userAuth ~ user:', user)

    if (user) {
        return true;
    } else {
        return false;
    }
}
