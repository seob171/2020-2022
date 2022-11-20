import { toastState } from "../../../recoil/toast/atom";
import { useRecoilValue } from "recoil";
import ToastItem from "./Item";
import styled from "styled-components";

function ToastList() {
    const toasts = useRecoilValue(toastState);
    console.log(toasts, "여기!");
    return (
        <StToastList>
            {toasts.map((toast) => (
                <ToastItem key={toast.id} {...toast} />
            ))}
        </StToastList>
    );
}

export const StToastList = styled.div`
    bottom: 0;
    right: 0;
    position: fixed;
    z-index: 1000;
`;

export default ToastList;
