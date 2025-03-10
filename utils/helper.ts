'use server'
import 'server-only'
import { cookies } from 'next/headers';
/**
 * This function is used to get the cookie value by name
 * @param {string} name - cookie name
 */
export async function getCookie(name:string) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    return null;
}


export async function deleteCookies(name:string){
    
    const Cookies = cookies();
    (await Cookies).delete(name)
}