import styled from "@emotion/styled";
import { MAIN_COLOR } from "../../constants/color";

export const LayoutBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export const HeaderBox = styled.header`
    width: 100%;
    position: fixed;
    top: 0;
    border-bottom: 1px solid ${MAIN_COLOR.LIGHT_GRAY};
    background: white;
    z-index: 1;
`;

export const MainBox = styled.main`
    padding-top: 65px;
    flex: 1;
`;
