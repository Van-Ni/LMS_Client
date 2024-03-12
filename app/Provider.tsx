import React from "react";
import { Provider } from "react-redux"; // Corrected import statement
import store from "../redux/store"; // Corrected import statement

interface ProvidersProps {
    children: React.ReactNode; // Corrected type declaration
}

export function Providers({ children }: ProvidersProps) { // Corrected function signature
    return <Provider store={store}>{children}</Provider>; // Wrap children with Provider and pass the Redux store
}
