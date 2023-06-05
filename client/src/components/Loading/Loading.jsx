import style from './Loading.module.css'

const Loading = () => {


    return (
    <div className={style.loadingContainer}>
    <div className={style.newtons__cradle}>
        <div className={style.newtons__cradleDot}></div>
        <div className={style.newtons__cradleDot}></div>
        <div className={style.newtons__cradleDot}></div>
        <div className={style.newtons__cradleDot}></div>
</div>
    </div>
)
}

export default Loading