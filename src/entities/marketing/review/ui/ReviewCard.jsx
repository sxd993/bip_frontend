export const ReviewCard = ({ text, image }) => {
    return (
        <div className="flex flex-col h-full w-full">
            <img src={image} alt='Картинка' className="flex-1 h-full w-full object-cover" />
            <h1>{text}</h1>
        </div>
    )
}
