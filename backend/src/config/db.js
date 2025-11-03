import mongoose from 'mongoose';


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING )
        console.log('lien ket du lieu thanh cong ');
    } catch (error) {
        console.error('db connect error', error);
        process.exit(1); // so 1  la thoat voi trang thai that bai 
                         // so 0 la thoat voi trang thai thanh cong 
    }
} 