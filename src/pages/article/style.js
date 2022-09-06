import styled from "styled-components";

export const Warpper = styled.div`
    .ant-table-thead .ant-table-cell{
        font-size: 18px;
        font-weight:bold;
    }
    .inputtitle{
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        max-width: 1200px;
        margin-bottom: 30px;
        transition: all 0.2s;
        
        .addArticleBtn{
            line-height: 40px;
            height: 40px;
            width: 86px;
            text-align: center;
            background-color: #1890ff;
            color: #fff;
            box-sizing:border-box;
            flex: 0 0 86px;
            transition: all 0.3s;
            &:hover{
                box-shadow: 0 0 10px #1890ff;
            }
        }
        .Search{
            height: 40px;
            outline: none;
            border:1px solid #d9d9d9;
            margin-left: 10px;
            padding-left: 10px;
            padding-right: 10px;
            margin-right: 10px;
            transition: all 0.3s;

            &:hover{
                border: 1px solid #1890ff;
            }
        }
    }
`

export const MarkdromCss = styled.div`
    display: flex;
    flex-direction:row;
    height: 100%;
    width: calc(100vw - 200px);

    div{
        width: 50%;
        min-width: 500px;
        min-height: calc(100vh - 246px);
        border: 1px solid #000;
        height: 100%;
        border: none;
        background-color: #fff;
        padding: 20px;
    }
    .inputRegion{
        background-color: #d4f7ff;
        outline: none;
    }
`

export const MarkDromNav = styled.div`
    background-color: #b9dfff;
    padding-bottom:20px;
    /* min-width: calc(100vh - 246px); */

    .top{
        display: flex;
        height: 58px;
        align-items: center;
        input{
            height: 40px;
            padding: 0 20px;
            font-size: 20px;
            background-color: #fff;
            transition: all .3s;
            border: none ;
            margin-left: 20px;
            outline: none;
            font-size: 16px;
        }
        button{
            height: 40px;
            width: 86px;
            background-color: #1890ff;
            font-size: 16px;
            user-select: none;
            transition: all .2s;
            color: #fff;
            border: none;
            margin-left: 20px;
        }
    }
    .bottom{
        display: flex;
        align-items:baseline;
        height: 40px;
        .type{
            min-width: 100px;
            margin-left: 20px;
        }
    }
`