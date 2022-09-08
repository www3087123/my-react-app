import React, { useState } from 'react'
import { MarkdromCss, MarkDromNav } from "./style"
import { Select, Input,message } from "antd"
import { useSelector } from "react-redux"
import { db ,auth} from '../../utils/cloudBase';
import { adminUid } from '../../utils/constant'
import { marked } from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import "./github-dark.css"
const { Option } = Select
const { TextArea } = Input
export default function AddarticlePage() {
    // ---------------------- marked  start -----------------------
    const [defaultContent, setDefaultContent] = useState(''); //marked
    const [content, setContent] = useState('');
    hljs.configure({
        tabReplace: '',
        classPrefix: 'hljs-',
        languages: ['CSS', 'HTML', 'JavaScript', 'Python', 'TypeScript', 'Markdown'],
    });
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        highlight: code => hljs.highlightAuto(code).value,
    });
    // ---------------------- marked  end -----------------------

    const [title, setTitle] = useState('');
    const [titleEng, setTitleEng] = useState('');
    const [searchClass, setSearchClass] = useState()
    const [searchTag, setSearchTag] = useState()
    const typeClasses = useSelector(i => i.article.articleClasses)
    const lableClasses = useSelector(i => i.article.lableClasses)
    const loading = useSelector(i => i.article.classLoading)
    const addarticle = () => {
        if (auth.currentUser.uid !== adminUid) {
            message.warning("不是管理员不可修改");
            return
        } 
        if(searchClass,searchTag,title,titleEng,content){
            db.collection("article").add({
                classes: searchClass,
                date: new Date().getTime(),
                tags: searchTag,
                title,
                url: titleEng,
                content
            }).then(res => message.success("发布成功"))
        }else{
            message.error("还没有输入完全部内容不能发布哦！");
        }
        console.log("英文标题:",titleEng,)
        console.log("文章分类:",searchClass,)
        console.log("文章标签：",searchTag)
        console.log("内容：",content)
        console.log("标题",title,)
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
                    {typeClasses.map(item => (
                        <Option key={item._id}>{item.title}</Option>
                    ))}
                </Select>
                <span className='type'>文章标签：</span>
                <Select
                    mode='multiple'
                    showSearch
                    showArrow
                    size='large'
                    allowClear
                    style={{ flex: "0,0,500px", minWidth: "300px" }}
                    placeholder='请选择文章标签'
                    className='searchTag'
                    value={searchTag}
                    onChange={value => {
                        setSearchTag(value)
                    }}
                >
                    {lableClasses.map(item => (
                        <Option key={item._id}>{item.tag}</Option>
                    ))}
                </Select>
            </div>
        </MarkDromNav>
        <MarkdromCss>
            {/* 内容编辑区 */}
            <div className="editBox">
                <div
                    className="inputRegion"
                    onInput={e => {
                        setContent(e.target.innerText);
                    }}
                    contentEditable="plaintext-only"
                    suppressContentEditableWarning
                >
                    {defaultContent}
                </div>
                <div
                    className="showRegion markdownStyle"
                    dangerouslySetInnerHTML={{
                        __html: marked(content).replace(/<pre>/g, "<pre id='hljs'>"),
                    }}
                ></div>
            </div>
        </MarkdromCss>
    </>

}
