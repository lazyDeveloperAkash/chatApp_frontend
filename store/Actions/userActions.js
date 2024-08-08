import axios from "@/utils/axios";
import { addUser, removeUser, chatUser } from "../Reducers/userReducers";
import { toast } from "react-toastify";
import { useMemo } from "react";
// import cookie from "@/utils/cookie";

export const asyncCurrentUser = () => async (dispatch, getState) => {
    try {
        const {data} = await axios.get("/user");
        await dispatch(addUser(data));
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const asyncChatUser = (id) => async (dispatch, getState) => {
    try {
        const {data} = await axios.post("/chat", {id});
        dispatch(chatUser(data));
    } catch (error) {
        console.log(error.response?.data?.message && error.response?.data?.message)
    }
}

export const asyncSingup = (user) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/singup", user);
        dispatch(addUser(data.user));
        toast.success("Singup Succesfull");
        return true;
    } catch (error) {
        if (error.response?.data?.message != "Please login to eccess the resource") toast.error(error.response?.data?.message && error.response?.data?.message);
        return false;
    }
}

export const asyncSinginEmail = (user) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/singin/email", user);
        dispatch(addUser(data.user));
        toast.success("Login Succesfull");
        return true;
    } catch (error) {
        toast.error(error.response?.data?.message && error.response?.data?.message);
        return false;
    }
}

export const asyncSinginNumber = (user) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/singin/contact", user);
        await dispatch(addUser(data.user));
        console.log(data)
        toast.success("Login Succesfull");
        return true;
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message && error.response?.data?.message);
        return false;
    }
}

export const asynccreateGroup = (groupInfo) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/createGroup", groupInfo);
        toast.success("Group Created Succesfully");
        dispatch(asyncCurrentUser());
    } catch (error) {
        console.log(error.response?.data?.message)
    }
}

export const asyncGroupDetails = (id) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post('/group-info', { id });
        dispatch(chatUser(data));
    } catch (error) {
        console.log(error.response?.data?.message && error.response?.data?.message)
    }
}

export const asyncSingout = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get("/singout");
        dispatch(removeUser());
        toast.info(data?.message && data?.message);
        return true;
    } catch (error) {
        toast.error(error.response?.data?.message && error.response?.data?.message);
        return false;
    }
}

export const asyncUpdateUser = (user) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/update-profile", user);
        dispatch(asyncCurrentUser());
        toast.success(data?.message && data?.message);
    } catch (error) {
        toast.error(error.response?.data?.message && error.response?.data?.message);
    }
}

export const asyncAvatar = (avatar) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/upload-profile-picture", avatar);
        dispatch(asyncCurrentUser());
        toast.success(data?.message && data?.message);
    } catch (error) {
        toast.error(error.response?.data?.message && error.response?.data?.message);
    }
}

export const asyncResetPasswordStudent = (password) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/update-password", password);
        dispatch(asyncCurrentUser());
        toast.success(data?.message && data?.message);
    } catch (error) {
        toast.error(error.response?.data?.message && error.response?.data?.message);
    }
}

export const asyncDeleteStudent = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get("/delete");
        dispatch(removeStudent());
        toast.warning(data?.message && data?.message);
    } catch (error) {
        toast.error(error.response?.data?.message && error.response?.data?.message);
    }
}

export const asyncSendEmail = (email) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/send-email", email);
        dispatch(asyncCurrentUser());
        toast.info(data?.message);
    } catch (error) {
        toast.error(error.response?.data?.message);
    }
}

export const asyncOtpVarificationStudent = (OTP) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/otp-varification", OTP);
        dispatch(asyncCurrentUser());
        toast.info(data?.message);
    } catch (error) {
        toast.error(error.response?.data?.message);
    }
}

export const asyncForgetPassChangeStudent = (newPass) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/forget-password-change", newPass);
        dispatch(asyncCurrentUser());
        toast.success(data?.message);
    } catch (error) {
        toast.error(error.response?.data?.message);
    }
}

// end of CRED operations

export const asyncNewChat = (id) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/new-chat", { id });
        dispatch(chatUser(data));
        dispatch(asyncCurrentUser());
    } catch (error) {
        toast.error(error.response?.data?.message);
    }
}

export const asyncChatUpload = (msg) => async (dispatch, getState) => {
    try {
        await axios.post("/msg-upload", msg);
    } catch (error) {
    }
}
