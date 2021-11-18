import React from 'react';
import styled from '@emotion/styled';
import { PAGES, DETAIL_PAGES } from 'pages/mypage';

const SideBar = ({
    router,
    current,
}: {
    router: (route: PAGES) => void;
    current: string;
}) => {
    const onClickRoute = (path: string) => {
        return (e: React.MouseEvent) => {
            e.preventDefault();
            router(path);
        };
    };

    return (
        <Container>
            <div>
                {Object.entries(DETAIL_PAGES).map(([key, value]) => {
                    return (
                        <Route
                            active={key === current}
                            onClick={onClickRoute(key)}
                        >
                            {value}
                        </Route>
                    );
                })}
            </div>
        </Container>
    );
};

const Container = styled.div`
    position: fixed;
    top: 70px;
    left: 0px;
    width: 300px;
    height: 100vh;
    border-right: 1px solid ${(props) => props.theme.color.gray1};

    & > div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-right: 30px;
        padding-top: 50px;
        gap: 30px;
    }
`;

const Route = styled.a<{ active: boolean }>`
    font: ${(props) => props.theme.font.textMd};
    color: ${(props) =>
        props.active
            ? props.theme.color.primary
            : props.theme.color.placeholder};
`;

export default SideBar;
