import React, { useState } from 'react'
import { MarkdromCss, MarkDromNav } from "./style"
import { Select } from "antd"
import { useSelector } from "react-redux"
import { db } from '../../utils/cloudBase';
const { Option } = Select
export default function AddarticlePage() {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState('');
    const [titleEng, setTitleEng] = useState('');
    const [searchClass, setSearchClass] = useState()
    const [searchTag, setSearchTag] = useState()
    const typeClasses = useSelector(i => i.article.typeClasses)
    const loading = useSelector(i => i.article.loading)

    const addarticle = () => {
        db.collection("article").add({
            classes: searchClass,
            date: new Date().getTime(),
            tags: searchTag,
            title,
            url: titleEng,
            content
        }).then(res => console.log(res))
        // console.log("标题",title,"英文标题:",titleEng,"文章分类:",searchClass,"文章标签：",searchTag,"内容：",content,"")
    }
    if (loading) return "等待"
    return <>
        <MarkDromNav>
            <div className='top'>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='请输入文章标题' />
                <input type="text" value={titleEng} onChange={(e) => setTitleEng(e.target.value)} placeholder='请输入英文标题' />
                <button onClick={() => addarticle()}>发布文章</button>
            </div>
            <div className='bottom'>
                <span className='type'>文章分类：</span>
                <Select
                    showSearch
                    size='large'
                    allowClear
                    style={{ minWidth: '360px' }}
                    placeholder='请选择文章分类'
                    className='searchClass'
                    value={searchClass}
                    onChange={value => {
                        setSearchClass(value)
                    }}
                >
                    {typeClasses.classes.map(item => (
                        <Option key={item.class}>{item.class}</Option>
                    ))}
                </Select>
                <span className='type'>文章标签：</span>
                <Select
                    mode='multiple'
                    showSearch
                    showArrow
                    size='large'
                    allowClear
                    style={{ flex: "0,0,500px", minWidth: "500px" }}
                    placeholder='请选择文章标签'
                    className='searchTag'
                    value={searchTag}
                    onChange={value => {
                        setSearchTag(value)
                    }}
                >
                    {typeClasses.list.map(item => (
                        <Option key={item.tag}>{item.tag}</Option>
                    ))}
                </Select>
            </div>
        </MarkDromNav>
        <MarkdromCss>
            {/* 内容编辑区 */}
            <div
                className="inputRegion"
                onInput={e => {
                    setContent(e.target.innerText);
                    console.log(e.target.innerText)
                }}
                contentEditable="plaintext-only"
                suppressContentEditableWarning
            >
                {/* {defaultContent} */}
            </div>
            {/* <div
                className="showRegion markdownStyle"
                dangerouslySetInnerHTML={{
                    __html: marked(content).replace(/<pre>/g, "<pre id='hljs'>"),
                }}
            ></div> */}
        </MarkdromCss>
    </>

}
