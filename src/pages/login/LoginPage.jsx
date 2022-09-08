import React from "react";
import styles from "./Login.module.css"
import { auth } from '../../utils/cloudBase';
import { adminUid } from '../../utils/constant'

import { Card, Form, Checkbox, Input, Button, message } from "antd"
import { useNavigate } from "react-router-dom"
export default function LoginPage() {
  const navigate = useNavigate()
  const onFinish = async (values) => {
    if (auth.currentUser.uid !== adminUid) {
      message.warning("不是管理员不可修改");
      return
    }
    console.log('Success:', values);
    // 点击登录
    await auth
      .signInWithEmailAndPassword(values.username, values.password)
      .then((e) => {
        // 登录成功
        localStorage.setItem("storeageToken", e.user.uid)
        navigate("/", { replace: true })
        message.success("登陆成功")
      })
      .catch(() => {
        // 登录失败
        message.error("登陆失败,请检查账号密码!")

      });

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return <>

    <div className={styles["login"]}>
      <Card className={styles["login-container"]}>
        <Form
          validateTrigger={["onBlur", "onChange"]}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            initialValue="1010098225@qq.com"
            rules={[
              { required: true, message: '请输入你邮箱' },
              {
                pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                message: "请输入正确的邮箱",

              }
            ]}>
            <Input size="large" placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="password"
            initialValue="qq1010098225"

            rules={[
              { required: true, message: '请输入你的密码' },
              {
                message: "请输入密码"
              }
            ]}>
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>

          <Form.Item className={styles["login-checkbox-label"]} valuePropName="checked" name="remember">
            <Checkbox>我已阅读并同意【用户协议】和【隐私条款】</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" block size="large" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  </>
}