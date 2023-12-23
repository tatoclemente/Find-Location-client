import { cookies } from 'next/headers'

import { TutorialComp } from "../Components";


export default function MessagePage () {

    const cookieStore = cookies() 
    const token = cookieStore.get('NEXT_LOCALE')
    console.log(token);
    return ( <TutorialComp /> )
}