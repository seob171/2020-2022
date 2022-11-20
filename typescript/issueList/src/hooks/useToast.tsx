import { Toast, toastState } from "../recoil/toast/atom";
import { getRandomID } from "../recoil/toast/etc";
import { useRecoilState } from "recoil";

export function useToast() {
    const [toasts, setToasts] = useRecoilState(toastState);

    const removeToast = (toastID: Toast["id"]) => setToasts((prev) => prev.filter((toast) => toast.id !== toastID));

    const fireToast = (toast: Toast) => {
        const id = getRandomID();
        setToasts((prev) => [...prev, { ...toast, id: id }]);
        setTimeout(() => {
            removeToast(id);
        }, 600 + (toast.duration ?? 1000));
    };

    return { toasts, fireToast };
}
