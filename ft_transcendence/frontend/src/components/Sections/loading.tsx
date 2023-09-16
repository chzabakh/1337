
import React from 'react'
import style from '@/styles/loader.module.scss'
export default function Loading() {
    return (
        <>
            <div className={style.content}>
            <div className={style.player_one}></div>
            <div className={style.player_two}></div>
            <div className={style.ball}></div>
            </div>
        </>
    )
}