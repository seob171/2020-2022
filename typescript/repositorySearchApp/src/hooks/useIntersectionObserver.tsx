import { useEffect, useState } from "react";

interface useIntersectionObserverProps {
    root?: null;
    rootMargin?: string;
    threshold?: number;
    callback: () => void;
}

const useIntersectionObserver = ({ root, rootMargin, threshold, callback }: useIntersectionObserverProps) => {
    const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

    const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            await callback();
            observer.observe(entry.target);
        }
    };

    useEffect(() => {
        if (!target) return;

        const observer: IntersectionObserver = new IntersectionObserver(onIntersect, { root, rootMargin, threshold });
        //observer 관찰 시작
        observer.observe(target);

        //observer 관찰 종료
        return () => observer.unobserve(target);
    }, [onIntersect, root, rootMargin, target, threshold]);

    return { setTarget };
};

export default useIntersectionObserver;
