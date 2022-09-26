import styled from "@emotion/styled";
import { MAIN_COLOR } from "../../constants/color";

export const HeaderBox = styled.header`
    width: 100%;
    position: fixed;
    top: 0;
    border-bottom: 1px solid ${MAIN_COLOR.LIGHT_GRAY};
`;

export const MainBox = styled.main`
    padding-top: 65px;
`;
