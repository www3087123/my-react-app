import React from 'react'
import { Routes, Route } from "react-router-dom"
import { LoginPage, HomePage,HomeIndexPage,ArticlePage,AddarticlePage } from '../pages'
import { AuthComponents } from '../components'
export default function IndexRouter() {
    return (
        <Routes>
            <Route path="/" element={<AuthComponents><HomePage></HomePage></AuthComponents>}>
                <Route index element={<HomeIndexPage/>}></Route>
                <Route path='/article' element={<ArticlePage/>}></Route>
                <Route path='/addArticle' element={<AddarticlePage/>}></Route>
            </Route>
            <Route path='/login' element={<LoginPage />}></Route>
        </Routes>
    )
}
