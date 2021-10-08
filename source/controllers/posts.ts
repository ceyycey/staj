import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

// tüm gönderileri almak
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    // bazı gönderiler al
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    let posts: [Post] = result.data;
    return res.status(200).json({
        message: posts
    });
};

// tek bir gönderi almak
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // gönderi kimliğini istekten al
    let id: string = req.params.id;
    //gönderiyi al
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    });
};

// 
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    // posta kimliğini req.params'dan al
    let id: string = req.params.id;
    // verileri req.body'den al
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // gönderiyi güncelle
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });
    // dönüş yanıtı
    return res.status(200).json({
        message: response.data
    });
};

// bir gönderiyi silme
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    // posta kimliğini req.params'tan al
    let id: string = req.params.id;
    // gönderiyi sil
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // dönüş yanıtı
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

// yazı ekleme
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    // verileri req.body'den al
    let title: string = req.body.title;
    let body: string = req.body.body;
    // gönderiyi ekle
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });
    // dönüş yanıtı
    return res.status(200).json({
        message: response.data
    });
};

export default { getPosts, getPost, updatePost, deletePost, addPost };