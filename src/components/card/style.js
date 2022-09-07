import styled from "styled-components"

export const Warpper = styled.div`
    background-color: #fff;
    box-sizing: border-box;
    padding:20px;
    margin-right: 20px;
    box-sizing: border-box;
    height: 180px;
    width: 100%;
    min-width: 310px;
    a{
        width: 100%;
    }
    &:hover{
        box-shadow: 0 0 10px rgb(0 0 0 / 40%);
    }
    .type{
        font-size: 20px;
        color: #000;
    }
    .number{
        text-align: right;
        width: 100%;
        font-size: 80px;
        color: #1890ff;
        transition: all .3s;
    }
    .number:hover{
        color: red;
    }
`