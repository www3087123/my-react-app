import styled from "styled-components";

export const NavBar = styled.div`
    display: flex;
    
    .navLeft{
        position: fixed;
        z-index: 999;
        top: 0;
        width: 160px;
        height: 100%;
        background-color: #001529;
        color: #fff;
        overflow-y: auto;
        li{
            margin-top: 0 !important;
        }
        /* 设置滚动条的样式 */
        &::-webkit-scrollbar {
            width: 6px;
        }
        /* 滚动槽 */
        &::-webkit-scrollbar-track {
            /* -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5); */
            background-color: rgba(0, 0, 0, 0);
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
            background: #1890ff;
        }
    }
    .navright{
        flex: 1;
        width: calc(100vw - 160px);
        background-color: #f0f2f5;
        height: 100vh;
        overflow: auto;
        .right_nav{
            width: 100%;
            height: 54px;
            background-color: #fff;
            box-shadow: 0 0 10px rgb(0 0 0 / 40%);
        }
        .right_content{
            margin: 20px 20px 0 20px;
        }
    }
`