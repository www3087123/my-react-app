import cloudbase from "@cloudbase/js-sdk";
import tcb from '@cloudbase/js-sdk';
import { env } from "./constant"
export const appTcb = tcb.init({
    env,
});
export const app = cloudbase.init({
    env
});

export const db = app.database();

export const auth = app.auth({
    persistence: "local" //用户显式退出或更改密码之前的30天一直有效
});