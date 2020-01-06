import React, { Dispatch, SetStateAction } from 'react'

let setType: Dispatch<SetStateAction<{ info: null; }>> = () => {}

export const UserInfoContext = React.createContext({
    info: null,
    setInfo: setType
});