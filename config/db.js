
import mongoose from 'mongoose';
export const connectDB = async () => {

    try {
        const conn = await mongoose.connect("mongodb://localhost:27017", {
        })

        console.log(`MongoDB Connected:`)
    } catch (error) {
        console.log(error)

    }
}



export default connectDB