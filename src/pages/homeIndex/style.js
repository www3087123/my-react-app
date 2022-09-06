import styled from "styled-components"

export const Warpper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`
export const Header = styled.div`
    width: 840px;
    background-color: #fff;
    margin-bottom: 20px;
    padding: 20px;
    height: 180px;
    display: flex;
    align-items: center;
    img{
        width: 110px;
        height: 110px;
    }
    div{
        margin-left: 10px;
        width: 100%;
        .header-top{
            font-size: 36px;
            font-weight: 700;
            span{
                color: #1890ff;
            }
        }
        .header-bottom{
            margin-top: 10px;
            font-size: 18px;
            span{
                font-size:16px;
            }
        }

    }
`