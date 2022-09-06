import React, { useEffect } from "react";
import { auth } from '../../utils/cloudBase';
import { useNavigate } from "react-router-dom";
import { message } from "antd"
export default function LoginPage() {
  const navigate = useNavigate()
  const token = localStorage.getItem("storeageToken")
  const result = async () => {
    await auth
      .signInWithEmailAndPassword("1010098225@qq.com", "qq1010098225")
      .then((e) => {
        // 登录成功
        localStorage.setItem("storeageToken", e.access_token)
        navigate("/", { replace: true })

        message.success("登陆成功")
      })
      .catch(() => {
        // 登录失败
      });
  }
  useEffect(() => {
    // auth.signUpWithEmailAndPassword("1010098225@qq.com", "qq1010098225")
    //   .then((res) => {
    //     // 发送验证邮件成功
    //     console.log(res)
    //   });
    // return
  }, [])
  return (
    <div onClick={() => result()}>登录</div>
  )
}
