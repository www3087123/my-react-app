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
    return res
})
const articleSlice = createSlice({
    name: "article",
    initialState: {
        data: [],
        loading: true,
        classLoading:true,
        error: null,
        typeClasses:[]
    },
    reducers: {},
    extraReducers: {
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

        [getArticleClass.pending.type]: (state) => {
            state.classLoading = true
        },
        [getArticleClass.fulfilled.type]: (state, action) => {
            state.classLoading = false
            state.typeClasses = action.payload.data[0].data
            state.error = null
        },
        [getArticleClass.rejected.type]: (state, action) => {
            state.classLoading = false
            state.error = action.payload
        },
    }
})

export default articleSlice.reducer