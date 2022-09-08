import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { db } from '../../utils/cloudBase';

// 获取所有文章
export const getArticleDate = createAsyncThunk("article/getArticleDate", async () => {
    let res = await db.collection('article').limit(1000).get()
    return res
})
// 删除文章
export const deletArticleDate = createAsyncThunk("article/deletArticleDate", async (API) => {
    await db.collection('article').doc(API).remove()
    return API
})
// 获取文章分类
export const getArticleClass = createAsyncThunk("article/getArticleClass", async () => {
    let res = await db.collection('articleclass').limit(1000).get()
    return res.data
})
// 获取标签分类
export const getlableClass = createAsyncThunk("article/getlableClass", async () => {
    let res = await db.collection('label').limit(1000).get()
    return res.data
})
const articleSlice = createSlice({
    name: "article",
    initialState: {
        data: [],
        loading: true,
        classLoading:true,
        error: null,
        articleClasses:[],
        lableClasses:[]
    },
    reducers: {},
    extraReducers: {
        // 获取文章
        [getArticleDate.pending.type]: (state) => {
            state.loading = true
        },
        [getArticleDate.fulfilled.type]: (state, action) => {
            state.loading = false
            state.data = action.payload.data
            state.error = null
        },
        [getArticleDate.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        // 删除文章
        [deletArticleDate.pending.type]: (state) => {
            state.loading = true
        },
        [deletArticleDate.fulfilled.type]: (state, action) => {
            state.loading = false
            state.data = state.data.filter(a=>a._id !== action.payload)
            state.error = null
        },
        [deletArticleDate.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        // 获取文章分类列表
        [getArticleClass.pending.type]: (state) => {
            state.classLoading = true
        },
        [getArticleClass.fulfilled.type]: (state, action) => {
            state.classLoading = false
            state.articleClasses = action.payload
            state.error = null
        },
        [getArticleClass.rejected.type]: (state, action) => {
            state.classLoading = false
            state.error = action.payload
        },
        // 获取标签分类列表
        [getlableClass.pending.type]: (state) => {
            state.classLoading = true
        },
        [getlableClass.fulfilled.type]: (state, action) => {
            state.classLoading = false
            state.lableClasses = action.payload
            state.error = null
        },
        [getlableClass.rejected.type]: (state, action) => {
            state.classLoading = false
            state.error = action.payload
        },
    }
})

export default articleSlice.reducer