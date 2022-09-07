import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getArticleDate, deletArticleDate } from "../../store/article/slice"
import { Table, Space, Button, Popconfirm, message, Select } from "antd"
import { Warpper } from './style'
import dayjs from 'dayjs'
import { auth } from '../../utils/cloudBase'
import { adminUid } from '../../utils/constant'
import { useNavigate } from "react-router-dom"
function ArticlePage() {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const data = useSelector(i => i.article.data)
  const loading = useSelector(i => i.article.loading)
  const classLoading = useSelector(i => i.article.classLoading)
  const [newState, setnewState] = useState([])
  const searchWords = useRef()
  let timer = useRef(null)
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '发布日期',
      dataIndex: 'date',
      render: text => <>{dayjs(parseInt(text)).format('YYYY-MM-DD HH:mm:ss')}</>,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: '分类',
      dataIndex: 'classes',
    },
    {
      title: '标签',
      dataIndex: 'tags',
    },
    {
      title: 'URL',
      dataIndex: 'url',
    },
    {
      title: '操作',
      key: '_id',
      render: record => (
        <Space size='middle'>
          <Button type='primary' onClick={() => console.log("删除")}>
            修改
          </Button>
          <Popconfirm
            placement='topRight'
            title='确定要删除该文章吗？'
            onConfirm={() => {
              console.log(auth.currentUser.uid, adminUid)
              if (auth.currentUser.uid !== adminUid) {
                message.warning("不是管理员不可修改");
              } else {
                // 删除文章
                deletArticle(record)
              }
            }}
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]
  const deletArticle = (e) => {
    dispatch(deletArticleDate(e._id))
  }
  const searchByWords = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      let keyword = searchWords.current.value.toLowerCase()
      let a = data.filter(i => i.title.toLowerCase().indexOf(keyword) !== -1)
      setnewState(a)
    }, 600);

  }
  const turnAddPage = () => {
    navigator("/addArticle")
  }
  useEffect(() => {
    dispatch(getArticleDate())
  }, [])
  useEffect(() => {
    setnewState(data)
  }, [data])
  if (loading || classLoading) return "等待"
  console.log("文章页刷新")
  return (
    <Warpper>
      <div className='inputtitle'>
        <div className='addArticleBtn' onClick={turnAddPage}>
          写文章
        </div>
        <input
          type='text'
          ref={searchWords}
          className='Search'
          onChange={searchByWords}
        />
      </div>
      <Table align="center" style={{ minWidth: "1200px" }} columns={columns} dataSource={newState} rowKey={data => data._id} />
    </Warpper>
  )
}

export default React.memo(ArticlePage)