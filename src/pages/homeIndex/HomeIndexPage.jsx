import React from 'react'
import { CardPage } from '../../components'
import { Warpper, Header } from "./style"
import { useSelector } from 'react-redux'
export default function HomeIndexPage() {
    const data = useSelector(i=>i.article.data)
    return (
        <div>
            <Header>
                <img src="https://img.lzxjack.top/img/20210826221910.jpg" alt="" />
                <div>
                    <div className='header-top'>下午好，<span>陌生人</span></div>
                    <div className='header-bottom'>今年新梦，忽到黄鹤旧山头。<span>---范成大</span></div>
                </div>
            </Header>
            <Warpper>
                <CardPage title={"文章数"} number={data.length} />
                <CardPage title={"草稿数"} number={"123"} />
                <CardPage title={"留言数"} number={"123"} />
                <CardPage title={"说说数"} number={"123"} />
            </Warpper>
        </div>
    )
}
