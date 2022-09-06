import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getArticleDate, deletArticleDate } from "../../store/article/slice"
import { Table, Space, Button, Popconfirm, message, Select } from "antd"
import { Warpper } from './style'
import dayjs from 'dayjs'
import { auth } from '../../utils/cloudBase'
import { adminUid } from '../../utils/constant'
import { useNavigate } from "react-router-dom"
const {Option} = Select
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
export default function ArticlePage() {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const data = useSelector(i => i.article.data)
  const loading = useSelector(i => i.article.loading)
  const classLoading = useSelector(i => i.article.classLoading)
  const typeClasses = useSelector(i => i.article.typeClasses)

  const [searchWords, setSearchWords] = useState()
  const [searchClass, setSearchClass] = useState()
  const [searchTag, setSearchTag] = useState()
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '发布日期',
      dataIndex: 'date',
      render: text => <>{dayjs(parseInt(text)).format('YYYY-MM-DD HH:mm:ss')}</>,
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
      },
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
  ];
  const deletArticle = (e) => {
    dispatch(deletArticleDate(e._id))
  }
  const searchByWords = (e) => {
    console.log(e)
  }
  const turnAddPage = () => {
    navigator("/addArticle")
  }
  useEffect(() => {
    dispatch(getArticleDate())
  }, [dispatch,])
  if (loading || classLoading) return "等待"
  return (
    <Warpper>
      <div className='inputtitle'>
        <div className='addArticleBtn' onClick={turnAddPage}>
          写文章
        </div>
        <input
          type='text'
          value={searchWords}
          className='Search'
          placeholder='输入文章标题...'
          onChange={searchByWords}
        />
        <Select
          showSearch
          size='large'
          allowClear
          style={{ minWidth: '360px' }}
          placeholder='请选择文章分类'
          className='searchClass'
          value={searchClass}
          onChange={value => {
            console.log(value)
          }}
        >
          {typeClasses.classes.map(item => (
            <Option key={item.class}>{item.class}</Option>
          ))}
        </Select>
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
            console.log(value)
          }}
        >
          {typeClasses.list.map(item => (
            <Option key={item.tag}>{item.tag}</Option>
          ))}
        </Select>
      </div>
      <Table align="center" style={{ minWidth: "1200px" }} columns={columns} dataSource={data} rowKey={data => data._id} onChange={onChange} />
    </Warpper>
  )
}