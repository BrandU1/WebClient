import {Fragment, ReactNode} from "react";
import dynamic from "next/dynamic";

interface NoSsrProps {
    children: ReactNode;
}

const NonSSRWrapper = ({ children }: NoSsrProps) => {
    return     <Fragment>{children}</Fragment>;
}

export default dynamic(() => Promise.resolve(NonSSRWrapper), {
    ssr: false,
});