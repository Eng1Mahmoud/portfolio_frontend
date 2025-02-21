'use server'
import { IContactUs } from './../zod/contactUsSchema';
interface Istate {
  message: string
}
export async function contactUs(prevState: Istate, data: IContactUs) {
    console.log(data)
    return { message: 'Success!' }
}