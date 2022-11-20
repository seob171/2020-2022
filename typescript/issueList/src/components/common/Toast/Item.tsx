import { useEffect, useState } from "react";
import { Toast } from "../../..//recoil/toast/atom";

import styled, { keyframes } from "styled-components";

const fade_in = keyframes`
      from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fade_out = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

export const StToastItem = styled.div<{ bottom?: number; isClosing: boolean }>`
    background: #e93338;
    border-radius: 4px;
    color: white;
    width: 100%;
    margin-bottom: 10px;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 12px;
    animation: 0.3s forwards ${(props) => (props.isClosing ? fade_out : fade_in)};
    position: relative;
    right: 12px;
    bottom: ${({ bottom }) => bottom ?? 26}px;
`;

const ToastItem = (props: Toast) => {
    const { content, bottom, duration } = props;
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const setExistTimeout = setTimeout(() => {
            setIsClosing(true);
            clearTimeout(setExistTimeout);
        }, duration ?? 1000);
    });

    return (
        <StToastItem bottom={bottom} isClosing={isClosing}>
            {content}
        </StToastItem>
    );
};

export default ToastItem;
