import React, { useEffect } from 'react'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useLocation } from "react-router-dom"
import { Menu, } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getArticleClass, getArticleDate ,getlableClass} from "../../store/article/slice"
import { NavBar } from "./style"
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('首页', '/', <PieChartOutlined />),
  getItem('文章', '/key', <DesktopOutlined />,
    [
      getItem('查看文章', '/article', <DesktopOutlined />),
      getItem('编写文章', '/addArticle', <DesktopOutlined />)
    ]),
  getItem('留言板', 'sub2', <TeamOutlined />),
  getItem('草稿箱', '9', <FileOutlined />),

];
export default function HomePage() {
  // const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const clickMenu = (e) => {
    navigate(e.key)
  }
  useEffect(() => {
    dispatch(getArticleClass())
    dispatch(getArticleDate())
    dispatch(getlableClass())
  }, [dispatch])
  return (
    <NavBar>
            

      <div className='navLeft'>
        <Menu theme="dark" defaultOpenKeys={["/key"]} selectedKeys={[location.pathname]} onSelect={clickMenu} mode="inline" items={items} />
      </div>
      <div style={{ width: "160px" }}></div>
      <div className='navright'>
        {/* 展示用户  退出登录 */}
        <div className='right_nav'></div>
        <div className='right_content'>
          <Outlet />
        </div>
      </div>
    </NavBar>
  )
}